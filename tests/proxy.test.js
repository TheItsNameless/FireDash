import { test, describe, it, before, after } from 'node:test';
import assert from 'node:assert';
import { onRequest } from '../functions/proxy/[[path]].js';

describe('Proxy HTTPS validation', () => {
  const originalFetch = globalThis.fetch;

  before(() => {
    globalThis.fetch = async () => {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    };
  });

  after(() => {
    globalThis.fetch = originalFetch;
  });

  const createMockContext = (targetBase, path = ['api', 'v1', 'accounts']) => {
    const request = new Request('https://firedash.pages.dev/proxy/' + path.join('/'), {
      headers: {
        'X-Target-Base': targetBase,
        'Authorization': 'Bearer test-token'
      }
    });
    return {
      request,
      params: { path }
    };
  };

  it('should allow HTTPS target URLs', async () => {
    const context = createMockContext('https://firefly.example.com');
    const response = await onRequest(context);
    assert.strictEqual(response.status, 200);
  });

  it('should allow http://localhost', async () => {
    const context = createMockContext('http://localhost');
    const response = await onRequest(context);
    assert.strictEqual(response.status, 200);
  });

  it('should allow http://127.0.0.1', async () => {
    const context = createMockContext('http://127.0.0.1');
    const response = await onRequest(context);
    assert.strictEqual(response.status, 200);
  });

  it('should reject non-localhost HTTP target URLs', async () => {
    const context = createMockContext('http://firefly.example.com');
    const response = await onRequest(context);
    assert.strictEqual(response.status, 400);
    const body = await response.json();
    assert.strictEqual(body.error, 'Target URL must use HTTPS');
  });

  it('should reject other protocols (e.g., ftp)', async () => {
    const context = createMockContext('ftp://firefly.example.com');
    const response = await onRequest(context);
    assert.strictEqual(response.status, 400);
    const body = await response.json();
    assert.strictEqual(body.error, 'Target URL must use HTTPS');
  });
});
