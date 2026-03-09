# FireDash Analytics Events Reference

> **35 total events** tracked via Google Analytics (`gtag`).  
> All events automatically include `session_duration_sec` via the `track()` helper.  
> All calls are wrapped in try/catch so analytics can never break the app.

---

## Session & App Lifecycle (3)

| Event            | Params                                                                                              | Purpose                                         |
| ---------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `app_init`       | `is_returning_user`, `theme`, `sidebar_collapsed`, `viewport_width`, `viewport_height`, `is_mobile` | Understand user base, device split, preferences |
| `session_end`    | `duration_sec`, `tools_used`, `last_tool`, `was_connected`                                          | Session depth, engagement                       |
| `manual_refresh` | `tool`                                                                                              | How often users force-refresh                   |

## Connection & Setup (4)

| Event                   | Params                              | Purpose                                         |
| ----------------------- | ----------------------------------- | ----------------------------------------------- |
| `setup_connect_attempt` | —                                   | Funnel: how many try to connect                 |
| `connection_success`    | `server_version`, `data_year_range` | Successful onboarding, FF3 version distribution |
| `connection_failed`     | —                                   | Onboarding friction, broken setups              |
| `api_error`             | `endpoint`, `status`, `status_text` | API-level errors to fix                         |

## Navigation & Tool Usage (5)

| Event               | Params                       | Purpose                      |
| ------------------- | ---------------------------- | ---------------------------- |
| `tool_navigate`     | `tool_name`                  | Which tools users visit most |
| `tool_loaded`       | `tool_name`, `load_time_ms`  | Performance per tool         |
| `tool_load_error`   | `tool_name`, `error_message` | Broken tools                 |
| `tool_retry`        | `tool_name`                  | User resilience after errors |
| `keyboard_shortcut` | `key`, `action`, `tool`      | Power-user adoption          |

## Feature Interactions (13)

| Event                          | Params                                                                                                             | Purpose                          |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------ | -------------------------------- |
| `monthly_report_change_period` | `month`, `year`                                                                                                    | Date range usage                 |
| `date_preset_used`             | `preset`, `tool`                                                                                                   | 1M/3M/6M/YTD/1Y popularity       |
| `category_drilldown`           | `category_id`, `tool`                                                                                              | Drill-down engagement            |
| `account_drilldown`            | `account_id`                                                                                                       | Transaction exploration          |
| `tag_explorer_load`            | `tag`                                                                                                              | Tag feature adoption             |
| `search_execute`               | `query_length`, `type_filter`, `has_date_filter`, `has_account_filter`, `has_category_filter`, `has_amount_filter` | Search feature usage depth       |
| `search_clear_filters`         | —                                                                                                                  | Filter reset behavior            |
| `trends_update`                | `mode`, `months`                                                                                                   | Spending/Income/Net preference   |
| `budget_explorer_load`         | `budget_id`                                                                                                        | Budget analysis engagement       |
| `category_explorer_load`       | `category`, `type`                                                                                                 | Category exploration             |
| `creditcard_modal_open`        | `card_name`                                                                                                        | Credit card detail views         |
| `cc_category_drilldown`        | `index`                                                                                                            | CC category breakdown engagement |
| `recurring_drilldown`          | `index`                                                                                                            | Recurring patterns exploration   |

## Exports (3)

| Event                                                                                                           | Params                           | Purpose                  |
| --------------------------------------------------------------------------------------------------------------- | -------------------------------- | ------------------------ |
| `csv_export`                                                                                                    | `file_name`, `row_count`, `tool` | Export adoption per tool |
| `tag_csv_export`                                                                                                | `tag`, `count`                   | Tag-specific exports     |
| _(Note: `csv_export` fires from the shared `exportCsv()` helper, so all CSV exports are tracked automatically)_ |                                  |                          |

## Settings & UX (5 + 2 combined above = 7)

| Event                     | Params                | Purpose               |
| ------------------------- | --------------------- | --------------------- |
| `settings_open`           | —                     | Settings engagement   |
| `settings_save`           | `has_custom_currency` | Configuration changes |
| `data_cleared`            | —                     | Account resets        |
| `theme_toggle`            | `theme`               | Dark/light preference |
| `sidebar_collapse_toggle` | `collapsed`           | UI preference         |

---

_Last updated: 10 March 2026_
