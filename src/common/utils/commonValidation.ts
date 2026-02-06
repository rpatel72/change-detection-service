import { z } from "../../lib/zod";

export const commonValidations = {
	uuid: z.uuid({ version: "v4" }),
	// ... other common validations
};
