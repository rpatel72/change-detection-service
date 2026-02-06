import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";

import { commonValidations } from "@/common/utils/commonValidation";

extendZodWithOpenApi(z);

export type Watch = z.infer<typeof WatchSchema>;
export const WatchSchema = z.object({
  url: z.string(),
  title: z.string(),
  tag: z.string(),
  tags: z.array(z.string()),
  paused: z.boolean(),
  notification_muted: z.boolean(),
  method: z.string(),
  fetch_backend: z.string(),
  headers: z.object({ property1: z.string(), property2: z.string() }),
  body: z.string(),
  proxy: z.string(),
  webdriver_delay: z.number(),
  webdriver_js_execute_code: z.string(),
  time_between_check: z.object({
    weeks: z.number(),
    days: z.number(),
    hours: z.number(),
    minutes: z.number(),
    seconds: z.number()
  }),
  time_between_check_use_default: z.boolean(),
  notification_urls: z.array(z.string()),
  notification_title: z.string(),
  notification_body: z.string(),
  notification_format: z.string(),
  track_ldjson_price_data: z.boolean(),
  browser_steps: z.array(
    z.object({
      operation: z.string(),
      selector: z.string(),
      optional_value: z.string()
    })
  ),
  processor: z.string(),
  uuid: z.string(),
  last_checked: z.number(),
  last_changed: z.number(),
  last_error: z.string(),
  last_viewed: z.number(),
  link: z.string()
});

// Input Validation for 'GET users/:id' endpoint
export const GetUserSchema = z.object({
	params: z.object({ id: commonValidations.id }),
});
