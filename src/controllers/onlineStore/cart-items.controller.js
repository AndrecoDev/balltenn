const cartItemController = require("express").Router();
const cartItemService = require("../../services/onlineStore/cart-item.service");

cartItemController.post("/", async function (req, res, onError) {
    try {
        let products = await cartItemService.add(req.body);
        res.status(200).json(products);
    } catch (error) {
        onError(error);
    }
});

cartItemController.get("/", async function (req, res, onError) {
    try {
        let products = await cartItemService.getAll();
        res.status(200).json(products);
    } catch (error) {
        onError(error);
    }
});

cartItemController.delete("/:id", async function (req, res, onError) {
    try {
        const deleted = await cartItemService.deleteById(req.params.id);
        if (deleted) {
            res.status(200).json(deleted);
        } else {
            res.status(400);
        }
    } catch (error) {
        onError(error);
    }
});

cartItemController.delete("/product/:id", async function (req, res, onError) {
    try {
        const productDeleted = await cartItemService.deleteCartProductById(req.params.id)
        if (productDeleted) {
            res.status(200);
        } else {
            res.status(400);
        }
    } catch (error) {
        onError(error);
    }
})


module.exports = cartItemController;