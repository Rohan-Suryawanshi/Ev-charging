import { Router } from "express";
import { createStation, deleteStation, getAllStations, getStation, getStations, updateStation } from "../controllers/station.controller.js";
import verifyJWT from "../middlewares/auth.middleware.js";

const router=Router();

router.post("/",verifyJWT,createStation);
router.get('/',getAllStations);
router.get("/filter", getStations);
router.get("/:id",getStation);
router.put("/:id", verifyJWT,updateStation);
router.delete("/:id",verifyJWT,deleteStation);



export default router;