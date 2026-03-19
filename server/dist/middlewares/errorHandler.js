export const errorHandler = (err, req, res, next) => {
    console.error(`[Error] ${err.message}`);
    const status = err.status || 500;
    const message = err.message || "Une erreur interne est survenue.";
    res.status(status).json({
        error: {
            message: message,
            status: status
        }
    });
};
