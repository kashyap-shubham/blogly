import { ApiError } from "../utils/apiErrors";

export const errorHandler = (err, req, res, next) => {

    let customError = err;

    if (!(err instanceof ApiError)) {
        customError = new ApiError(500, err.message || "Internal Server error");
    }

    const statusCode = customError.statusCode || 500;
    const message = customError.message || "Something went wrong";


    res.status(statusCode).json({
        success: false,
        message: message,
    });
}