import express from "express";
import { protectRoute } from "../Middleware/auth.middleware.js";
import {
  sendConnectionRequest,
  acceptConnectionRequest,
  rejectConnectionRequest,
  getConnectionRequests,
  getUserConnections,
  removeConnection,
  getConnectionStatus,
} from "./../controllers/connection.controller.js";

const router = express.Router();

router.get("/request/:userId", protectRoute, sendConnectionRequest);
router.put("/accept/:requestid", protectRoute, acceptConnectionRequest);
router.put("/reject/:requestId", protectRoute, rejectConnectionRequest);
router.get("/requests", protectRoute, getConnectionRequests);
router.get("/", protectRoute, getUserConnections);
router.delete("/:userId", protectRoute, removeConnection);
router.get("/status/:userId", protectRoute, getConnectionStatus);

export default router;
