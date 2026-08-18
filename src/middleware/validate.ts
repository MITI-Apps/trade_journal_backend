import type { Response, Request, NextFunction } from "express";
import type { ObjectSchema } from "joi";

function validate(schema: ObjectSchema){
    return (req: Request, res: Response, next: NextFunction) => {
       const { error, value } = schema.validate(req.body, { abortEarly: false});

       if (error){
        const messages = error.details.map((detail) => detail.message)
        return res.status(400).json({ errors: messages });
       }

       req.body = value // sanitized req.body
       next()
    }
};

// Validation middleware for URL params
const validateParams = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.params);
    if (error) {
      const messages = error.details.map((deta) => deta.message)
      return res.status(400).json({ errors: messages });
    }
    next();
  };
};

export  { validate, validateParams};