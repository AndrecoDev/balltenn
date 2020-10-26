const authController = require("./controllers/auth.controller");
const userController = require("./controllers/user.controller");
const certificateController = require("./controllers/certificate.controller");
const categoryController = require("./controllers/onlineStore/category.controller");
const productController = require("./controllers/onlineStore/product.controller");
const cartController = require("./controllers/onlineStore/cart-items.controller");
const couponController = require("./controllers/onlineStore/coupon.controller");
const countryController = require("./controllers/onlineStore/country.controller");
const stateController = require("./controllers/onlineStore/state.controller");
const cityController = require("./controllers/onlineStore/city.controller");

const app = require("express").Router();


app.use("/auth", authController);
app.use("/users", userController);
app.use("/certificates", certificateController);
app.use("/categories", categoryController);
app.use("/products", productController);
app.use("/cart", cartController);
app.use("/coupons", couponController);
app.use("/countries", countryController)
app.use("/states", stateController)
app.use("/cities", cityController)

module.exports = app;