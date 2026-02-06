import { OpenAPIRegistry } from "@asteasolutions/zod-to-openapi";
import express, { type Router } from "express";
import { GetWatchSchema, WatchSchema } from "@/api/watches/watchModel";
import { createApiResponse } from "@/api-docs/openAPIResponseBuilders";
import { validateRequest } from "@/common/utils/httpHandlers";
import { z } from "../../lib/zod";
import { watchController } from "./watchController";

export const watchRegistry = new OpenAPIRegistry();
export const watchRouter: Router = express.Router();

watchRegistry.register("Watch", WatchSchema);

watchRegistry.registerPath({
	method: "get",
	path: "/watches",
	tags: ["Watch"],
	responses: createApiResponse(z.array(WatchSchema), "Success"),
});

watchRegistry.registerPath({
	method: "get",
	path: "/watches/{id}",
	tags: ["Watch"],
	request: { params: GetWatchSchema.shape.params },
	responses: createApiResponse(WatchSchema, "Success"),
});

watchRouter.get("/", watchController.getWatches);
watchRouter.get("/:id", validateRequest(GetWatchSchema), watchController.getWatch);
