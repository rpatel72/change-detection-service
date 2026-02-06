import { StatusCodes } from "http-status-codes";
import type { Mock } from "vitest";

import type { Watch } from "@/api/user/userModel";
import { UserRepository } from "@/api/user/userRepository";
import { UserService } from "@/api/user/userService";

vi.mock("@/api/user/userRepository");

describe("userService", () => {
	let userServiceInstance: UserService;
	let userRepositoryInstance: UserRepository;
	11;
	const mockUsers: Watch[] = [
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
			uuid: "095be615-a8ad-4c33-8e9c-c7612fbf6c9f",
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
			uuid: "195be615-a8ad-4c33-8e9c-c7612fbf6c9f",
			last_checked: 0,
			last_changed: 0,
			last_error: "string",
			last_viewed: 0,
			link: "string",
		},
	];

	beforeEach(() => {
		userRepositoryInstance = new UserRepository();
		userServiceInstance = new UserService(userRepositoryInstance);
	});

	describe("findAll", () => {
		it("return all users", async () => {
			// Arrange
			(userRepositoryInstance.findAllAsync as Mock).mockReturnValue(mockUsers);

			// Act
			const result = await userServiceInstance.findAll();

			// Assert
			expect(result.statusCode).toEqual(StatusCodes.OK);
			expect(result.success).toBeTruthy();
			expect(result.message).equals("Users found");
			expect(result.responseObject).toEqual(mockUsers);
		});

		it("returns a not found error for no users found", async () => {
			// Arrange
			(userRepositoryInstance.findAllAsync as Mock).mockReturnValue(null);

			// Act
			const result = await userServiceInstance.findAll();

			// Assert
			expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
			expect(result.success).toBeFalsy();
			expect(result.message).equals("No Users found");
			expect(result.responseObject).toBeNull();
		});

		it("handles errors for findAllAsync", async () => {
			// Arrange
			(userRepositoryInstance.findAllAsync as Mock).mockRejectedValue(new Error("Database error"));

			// Act
			const result = await userServiceInstance.findAll();

			// Assert
			expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
			expect(result.success).toBeFalsy();
			expect(result.message).equals("An error occurred while retrieving users.");
			expect(result.responseObject).toBeNull();
		});
	});

	describe("findById", () => {
		it("returns a user for a valid ID", async () => {
			// Arrange
			const testId = 1;
			const mockUser = mockUsers.find((user) => user.id === testId);
			(userRepositoryInstance.findByIdAsync as Mock).mockReturnValue(mockUser);

			// Act
			const result = await userServiceInstance.findById(testId);

			// Assert
			expect(result.statusCode).toEqual(StatusCodes.OK);
			expect(result.success).toBeTruthy();
			expect(result.message).equals("User found");
			expect(result.responseObject).toEqual(mockUser);
		});

		it("handles errors for findByIdAsync", async () => {
			// Arrange
			const testId = 1;
			(userRepositoryInstance.findByIdAsync as Mock).mockRejectedValue(new Error("Database error"));

			// Act
			const result = await userServiceInstance.findById(testId);

			// Assert
			expect(result.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
			expect(result.success).toBeFalsy();
			expect(result.message).equals("An error occurred while finding user.");
			expect(result.responseObject).toBeNull();
		});

		it("returns a not found error for non-existent ID", async () => {
			// Arrange
			const testId = 1;
			(userRepositoryInstance.findByIdAsync as Mock).mockReturnValue(null);

			// Act
			const result = await userServiceInstance.findById(testId);

			// Assert
			expect(result.statusCode).toEqual(StatusCodes.NOT_FOUND);
			expect(result.success).toBeFalsy();
			expect(result.message).equals("User not found");
			expect(result.responseObject).toBeNull();
		});
	});
});
