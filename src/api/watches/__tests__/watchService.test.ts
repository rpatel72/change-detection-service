import { StatusCodes } from "http-status-codes";
import type { Mock } from "vitest";
import type { Watch } from "@/api/watches/watchModel";
import { WatchRepository } from "@/api/watches/watchRepository";
import { WatchService } from "@/api/watches/watchService";

vi.mock("@/api/watches/watchRepository");

const userId1 = "095be615-a8ad-4c33-8e9c-c7612fbf6c9f";
const userId2 = "1195be615-a8ad-4c33-8e9c-c7612fbf6c9f";

describe("watchService", () => {
	let watchServiceInstance: WatchService;
	let watchRepositoryInstance: WatchRepository;
	11;
	const mockWatches: Watch[] = [
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
			uuid: userId1,
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
			uuid: userId2,
			last_checked: 0,
			last_changed: 0,
			last_error: "string",
			last_viewed: 0,
			link: "string",
		},
	];

	beforeEach(() => {
		watchRepositoryInstance = new WatchRepository();
		watchServiceInstance = new WatchService(watchRepositoryInstance);
	});

	describe("findAll", () => {
		it("return all watches", async () => {
			// Arrange
			(watchRepositoryInstance.findAllAsync as Mock).mockReturnValue(mockWatches);

			// Act
			const result = await watchServiceInstance.findAll();

			// Assert
			expect(result.statusCode).toEqual(StatusCodes.OK);
			expect(result.success).toBeTruthy();
			expect(result.message).equals("Watches found");
			expect(result.responseObject).toEqual(mockWatches);
		});

		it("returns a not found error for no watches found", async () => {
			// Arrange
			(watchRepositoryInstance.findAllAsync as Mock).mockReturnValue(null);

			// Act
			const result = await watchServiceInstance.findAll();

			// Assert
			expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
			expect(result.success).toBeFalsy();
			expect(result.message).equals("No Watches found");
			expect(result.responseObject).toBeNull();
		});

		it("handles errors for findAllAsync", async () => {
			// Arrange
			(watchRepositoryInstance.findAllAsync as Mock).mockRejectedValue(new Error("Database error"));

			// Act
			const result = await watchServiceInstance.findAll();

			// Assert
			expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
			expect(result.success).toBeFalsy();
			expect(result.message).equals("An error occurred while retrieving watches.");
			expect(result.responseObject).toBeNull();
		});
	});

	describe("findById", () => {
		it("returns a user for a valid ID", async () => {
			// Arrange
			const testId = userId1;
			const mockWatch = mockWatches.find((watch) => watch.uuid === testId);
			(watchRepositoryInstance.findByIdAsync as Mock).mockReturnValue(mockWatch);

			// Act
			const result = await watchServiceInstance.findById(testId);
			// Assert
			expect(result.statusCode).toEqual(StatusCodes.OK);
			expect(result.success).toBeTruthy();
			expect(result.message).equals("Watch found");
			expect(result.responseObject).toEqual(mockWatch);
		});

		it("handles errors for findByIdAsync", async () => {
			// Arrange
			const testId = userId2;
			(watchRepositoryInstance.findByIdAsync as Mock).mockRejectedValue(new Error("Database error"));

			// Act
			const result = await watchServiceInstance.findById(testId);

			// Assert
			expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
			expect(result.success).toBeFalsy();
			expect(result.message).equals("An error occurred while finding watch.");
			expect(result.responseObject).toBeNull();
		});

		it("returns a not found error for non-existent ID", async () => {
			// Arrange
			const testId = userId1;
			(watchRepositoryInstance.findByIdAsync as Mock).mockReturnValue(null);

			// Act
			const result = await watchServiceInstance.findById(testId);

			// Assert
			expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
			expect(result.success).toBeFalsy();
			expect(result.message).equals("Watch not found");
			expect(result.responseObject).toBeNull();
		});
	});
});
