import type { Watch } from "@/api/watches/watchModel";

export const watches: Watch[] = [
	{
		url: "http://example.com",
		title: "string",
		tag: "string",
		tags: ["string"],
		paused: true,
		notification_muted: true,
		method: "GET",
		fetch_backend: "html_requests",
		headers: {
			property1: "string",
			property2: "string",
		},
		body: "string",
		proxy: "string",
		webdriver_delay: 0,
		webdriver_js_execute_code: "string",
		time_between_check: {
			weeks: 0,
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
		},
		time_between_check_use_default: true,
		notification_urls: ["string"],
		notification_title: "string",
		notification_body: "string",
		notification_format: "text",
		track_ldjson_price_data: true,
		browser_steps: [
			{
				operation: "string",
				selector: "string",
				optional_value: "string",
			},
		],
		processor: "restock_diff",
		uuid: "65c72d01-9654-4294-bb6d-80bce4095778",
		last_checked: 0,
		last_changed: 0,
		last_error: "string",
		last_viewed: 0,
		link: "string",
	},
	{
		url: "http://example.com",
		title: "string",
		tag: "string",
		tags: ["string"],
		paused: true,
		notification_muted: true,
		method: "GET",
		fetch_backend: "html_requests",
		headers: {
			property1: "string",
			property2: "string",
		},
		body: "string",
		proxy: "string",
		webdriver_delay: 0,
		webdriver_js_execute_code: "string",
		time_between_check: {
			weeks: 0,
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
		},
		time_between_check_use_default: true,
		notification_urls: ["string"],
		notification_title: "string",
		notification_body: "string",
		notification_format: "text",
		track_ldjson_price_data: true,
		browser_steps: [
			{
				operation: "string",
				selector: "string",
				optional_value: "string",
			},
		],
		processor: "restock_diff",
		uuid: "e1f9de32-2d01-4ddb-9c24-1205e5efd7c0",
		last_checked: 0,
		last_changed: 0,
		last_error: "string",
		last_viewed: 0,
		link: "string",
	},
];

export class WatchRepository {
	async findAllAsync(): Promise<Watch[]> {
		return watches;
	}

	async findByIdAsync(id: string): Promise<Watch | null> {
		return watches.find((user) => user.uuid === id) || null;
	}
}
