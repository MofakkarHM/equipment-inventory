import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

//what validated data looks like
interface validatedRequest {
  body: unknown;
  params: unknown;
  query: unknown;
}

//extend express request to hold validated data
declare module "express-serve-static-core" {
  interface Request {
    validated: {
      body: unknown;
      params: unknown;
      query: unknown;
    };
  }
}

//format zod errors into structured response
function formatZodErrors(error: ZodError) {
  return error.issues.map((err) => ({
    path: err.path.join(".") || "root",
    message: err.message,
    code: err.code,
  }));
}

//the middlewares
//separate schemas for body, params and query
interface ValidationSchemas {
  body?: ZodSchema;
  params?: ZodSchema;
  query?: ZodSchema;
}

export function validateRequest(schemas: ValidationSchemas) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    //collect all errors from body, params, query
    const allErrors: ReturnType<typeof formatZodErrors> = [];

    //validated results
    const validated: validatedRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
    };

    // validate body
    if (schemas.body) {
      const result = await schemas.body.safeParseAsync(req.body);
      if (!result.success) {
        allErrors.push(...formatZodErrors(result.error));
      } else {
        validated.body = result.data;
      }
    }

    //validate params
    if (schemas.params) {
      const result = await schemas.params.safeParseAsync(req.params);
      if (!result.success) {
        allErrors.push(...formatZodErrors(result.error));
      } else {
        validated.params = result.data;
      }
    }

    //validate query
    if (schemas.query) {
      const result = await schemas.query.safeParseAsync(req.query);
      if (!result.success) {
        allErrors.push(...formatZodErrors(result.error));
      } else {
        validated.query = result.data;
      }
    }

    //error
    if (allErrors.length > 0) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: allErrors,
      });
      return;
    }

    //all valid
    req.validated = validated;
    next();
  };
}
