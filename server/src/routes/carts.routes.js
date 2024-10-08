import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  addOrUpdateCart,
  clearCart,
  deleteCartItem,
  getUserCart,
} from "../controllers/cart.controller.js";

const router = Router();

// for logged in user
router.use(verifyJwt);

// get user cart
router.route("/").get(getUserCart);

// add to cart
router.route("/item/:productId").post(addOrUpdateCart).delete(deleteCartItem);

// clear cart
router.route("/clear").delete(clearCart);

export default router;
