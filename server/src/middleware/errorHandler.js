import { ApiError } from "../utils/apiErrors.js";

export const errorHandler = (err, req, res, next) => {

    let customError = err;

    if (!(err instanceof ApiError)) {
        customError = new ApiError(500, err.message || "Internal Server error");
    }

    const statusCode = customError.statusCode || 500;
    const message = customError.message || "Something went wrong";

    console.error(err.stack);

    res.status(statusCode).json({
        success: false,
        message: message,
    });
}