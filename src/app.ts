import { Application, NextFunction, Request, Response } from "express";
import express from "express";
import cors from "cors";
import router from "./routes";
import { StatusCodes } from "http-status-codes";
import cookieParser from "cookie-parser";

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.get("/", (req, res) => {
  res.send({ message: "masjid management server is running!" });
});

app.use("/api/v1/", router);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.send({
    status: err.status || 500,
    message: err.message || "something went wrong",
    error: req.app.get("env") === "development" ? err : {}, // Only include error details in development mode  //
  });
});
app.use((req: Request, res: Response, next: NextFunction) => {
  res.send({
    status: StatusCodes.NOT_FOUND || 500,
    message: "Api Not Found",
    error: {
      path: req.originalUrl,
      massage: "your api is not available",
    },
  });
});

export default app;
