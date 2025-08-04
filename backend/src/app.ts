import express, { Router } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { errorHandlerMiddleware } from "./middlewares/error.middleware";
import { loginHandler, logoutHandler } from "./components/auth/auth.controller";
import catchAsyncError from "./middlewares/catch-async.middleware";
import { validateSessionHandler } from "./components/auth/session/validate-session.service";
import {
  createAnnouncementHandler,
  getAnnouncementsHandler,
  markAnnouncementAsReadHandler,
} from "./components/announcement/announcement.controller";
import { validateRequestMiddleware } from "./middlewares/validate-request.middleware";

dotenv.config();

export const app = express();

app.use(
  cors({
    origin: process.env.APPLICATION_URL,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = Router();

const authRouter = Router();
authRouter.post("/login", catchAsyncError(loginHandler));
authRouter.post("/logout", catchAsyncError(logoutHandler));
authRouter.post("/validate-request", catchAsyncError(validateSessionHandler));

const announcementRouter = Router();
announcementRouter.get("/", validateRequestMiddleware, catchAsyncError(getAnnouncementsHandler));
announcementRouter.post("/", validateRequestMiddleware, catchAsyncError(createAnnouncementHandler));
announcementRouter.post(
  "/:announcementId/read",
  validateRequestMiddleware,
  catchAsyncError(markAnnouncementAsReadHandler)
);

router.use("/auth", authRouter);
router.use("/announcements", announcementRouter);

app.use("/api/v1", router);

app.use(errorHandlerMiddleware);
