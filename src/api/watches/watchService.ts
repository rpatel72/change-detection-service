import { StatusCodes } from "http-status-codes";
import type { Watch } from "@/api/watches/watchModel";
import { WatchRepository } from "@/api/watches/watchRepository";
import { ServiceResponse } from "@/common/models/serviceResponse";
import { logger } from "@/server";

export class WatchService {
	private watchRepository: WatchRepository;

	constructor(repository: WatchRepository = new WatchRepository()) {
		this.watchRepository = repository;
	}

	// Retrieves all watches from the database
	async findAll(): Promise<ServiceResponse<Watch[] | null>> {
		try {
			const watches = await this.watchRepository.findAllAsync();
			if (!watches || watches.length === 0) {
				return ServiceResponse.failure("No Watches found", null, StatusCodes.NOT_FOUND);
			}
			return ServiceResponse.success<Watch[]>("Watches found", watches);
		} catch (ex) {
			const errorMessage = `Error finding all watches: $${(ex as Error).message}`;
			logger.error(errorMessage);
			return ServiceResponse.failure(
				"An error occurred while retrieving watches.",
				null,
				StatusCodes.INTERNAL_SERVER_ERROR,
			);
		}
	}

	// Retrieves a single watch by their ID
	async findById(id: string): Promise<ServiceResponse<Watch | null>> {
		try {
			const watch = await this.watchRepository.findByIdAsync(id);
			if (!watch) {
				return ServiceResponse.failure("Watch not found", null, StatusCodes.NOT_FOUND);
			}
			return ServiceResponse.success<Watch>("Watch found", watch);
		} catch (ex) {
			const errorMessage = `Error finding watch with id ${id}:, ${(ex as Error).message}`;
			logger.error(errorMessage);
			return ServiceResponse.failure("An error occurred while finding watch.", null, StatusCodes.INTERNAL_SERVER_ERROR);
		}
	}
}

export const watchService = new WatchService();
