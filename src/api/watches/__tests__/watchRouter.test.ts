import { StatusCodes } from "http-status-codes";
import request from "supertest";
import type { Watch } from "@/api/watches/watchModel";
import { watches } from "@/api/watches/watchRepository";
import type { ServiceResponse } from "@/common/models/serviceResponse";
import { app } from "@/server";

describe("Watch API Endpoints", () => {
	describe("GET /watches", () => {
		it("should return a list of watches", async () => {
			// Act
			const response = await request(app).get("/watches");
			const responseBody: ServiceResponse<Watch[]> = response.body;

			// Assert
			expect(response.statusCode).toEqual(StatusCodes.OK);
			expect(responseBody.success).toBeTruthy();
			expect(responseBody.message).toContain("Watches found");
			expect(responseBody.responseObject.length).toEqual(watches.length);
			responseBody.responseObject.forEach((watch, index) => compareWatches(watches[index] as Watch, watch));
		});
	});

	describe("GET /watches/:id", () => {
		it("should return a watch for a valid ID", async () => {
			// Arrange
			const testId = "65c72d01-9654-4294-bb6d-80bce4095778";
			const expectedWatch = watches.find((watch) => watch.uuid === testId) as Watch;

			// Act
			const response = await request(app).get(`/watches/${testId}`);
			const responseBody: ServiceResponse<Watch> = response.body;

			// Assert
			expect(response.statusCode).toEqual(StatusCodes.OK);
			expect(responseBody.success).toBeTruthy();
			expect(responseBody.message).toContain("Watch found");
			if (!expectedWatch) throw new Error("Invalid test data: expectedWatch is undefined");
			compareWatches(expectedWatch, responseBody.responseObject);
		});

		it("should return a not found error for non-existent ID", async () => {
			// Arrange
			const testId = "287534c5-9b1f-4ff2-bee8-0016a1d80d6e"; // Assuming this ID does not exist in the mock data

			// Act
			const response = await request(app).get(`/watches/${testId}`);
			const responseBody: ServiceResponse = response.body;

			// Assert
			expect(response.statusCode).toEqual(StatusCodes.NOT_FOUND);
			expect(responseBody.success).toBeFalsy();
			expect(responseBody.message).toContain("Watch not found");
			expect(responseBody.responseObject).toBeNull();
		});

		it("should return a bad request for invalid ID format", async () => {
			// Act
			const invalidInput = "abc";
			const response = await request(app).get(`/watches/${invalidInput}`);
			const responseBody: ServiceResponse = response.body;

			console.log(responseBody);

			// Assert
			expect(response.statusCode).toEqual(StatusCodes.BAD_REQUEST);
			expect(responseBody.success).toBeFalsy();
			expect(responseBody.message).toContain("Invalid input");
			expect(responseBody.responseObject).toBeNull();
		});
	});
});

function compareWatches(mockWatch: Watch, responseWatch: Watch) {
	if (!mockWatch || !responseWatch) {
		throw new Error("Invalid test data: mockWatch or responseWatch is undefined");
	}

	expect(responseWatch.uuid).toEqual(mockWatch.uuid);
}
