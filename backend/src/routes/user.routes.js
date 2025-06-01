import { Router } from "express";
import {
  changeCurrentUserPassword,
  deleteUser,
  getAllUsers,
  getCurrentUser,
  getUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/user.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);

router.post("/logout", verifyJWT, logoutUser);
router.get("/current-user", verifyJWT, getCurrentUser);
router.put("/change-password", verifyJWT, changeCurrentUserPassword);

// router.get("/", getAllUsers);
// router.delete("/:id", deleteUser);
// router.get("/:id", getUser);

export default router;
