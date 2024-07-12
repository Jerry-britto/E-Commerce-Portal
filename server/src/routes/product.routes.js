import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import {
  addProduct,
  getAllProducts,
  getProductById,
  setDefaultProduct,
} from "../controllers/product.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/addproduct")
  .post(verifyJwt, upload.single("coverImage"), addProduct);

router.route("/setdefaultproducts").post(setDefaultProduct);

router.route("/getproduct/:pid").get(getProductById);

router.route("/").get(getAllProducts);

export default router;
