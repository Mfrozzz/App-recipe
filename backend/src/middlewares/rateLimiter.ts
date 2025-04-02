import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later.",
});

export default rateLimiter;