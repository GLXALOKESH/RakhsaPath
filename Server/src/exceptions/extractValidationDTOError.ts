import { ValidationError } from "class-validator";

type NestedErrors = Record<string, any>;

function extractValidationErrors(
  errors: ValidationError[],
  result: NestedErrors = {}
): NestedErrors {
  for (const error of errors) {
    const { property, constraints, children } = error;

    // Ensure object exists
    if (!result[property]) {
      result[property] = {};
    }

    // Leaf node (actual validation error)
    if (constraints) {
      result[property] = Object.values(constraints).join(", ");
    }

    // Nested validation errors
    if (children && children.length > 0) {
      // If current level already has a string, convert to object
      if (typeof result[property] !== "object") {
        result[property] = {};
      }

      extractValidationErrors(children, result[property]);
    }
  }

  return result;
}

export default extractValidationErrors;
