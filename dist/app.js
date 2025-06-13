"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const http_status_codes_1 = require("http-status-codes");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.send({ message: "masjid management server is running!" });
});
app.use("/api/v1/", routes_1.default);
app.use((err, req, res, next) => {
    res.send({
        status: err.status || 500,
        message: err.message || "something went wrong",
        error: req.app.get("env") === "development" ? err : {}, // Only include error details in development mode  //
    });
});
app.use((req, res, next) => {
    res.send({
        status: http_status_codes_1.StatusCodes.NOT_FOUND || 500,
        message: "Api Not Found",
        error: {
            path: req.originalUrl,
            massage: "your api is not available",
        },
    });
});
exports.default = app;
