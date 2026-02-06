import type { Request, RequestHandler, Response } from "express";

import { watchService } from "@/api/watches/watchService";

class WatchController {
	public getWatches: RequestHandler = async (_req: Request, res: Response) => {
		const serviceResponse = await watchService.findAll();
		res.status(serviceResponse.statusCode).send(serviceResponse);
	};

	public getWatch: RequestHandler = async (req: Request, res: Response) => {
		const id = req.params.id as string;
		const serviceResponse = await watchService.findById(id);
		res.status(serviceResponse.statusCode).send(serviceResponse);
	};
}

export const watchController = new WatchController();
