const categoryController = require("express").Router();
const categoryService = require("../../services/onlineStore/category.service");
const authService = require("../../services/auth.service");
const Role = require("../../helpers/role.enum");

categoryController.get("/", async function (req, res, onError) {
    try {
        let categories = await categoryService.getAll();
        res.status(200).json(categories);
    } catch (error) {
        onError(error);
    }
});

categoryController.get("/:id", async function (req, res, onError) {
    try {
        const category = await categoryService.getById(req.params.id);
        if (category) {
            res.status(200).json(category);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        onError(error);
    }
});

categoryController.post("/", async function (req, res, onError) {
    try {
        let category = await categoryService.create(req.body);
        res.status(200).json(category);
    } catch (error) {
        onError(error);
    }
});

categoryController.put("/", async function (req, res, onError) {
    try {
        console.log(req.body._id)
        if (req.body._id) {
            let { ...categoryToUpdate } = req.body;
            let category = await categoryService.update(categoryToUpdate, req.body._id);
            if (category) {
                res.status(200).json(category);
            } else {
                res.sendStatus(304);
            }
        } else {
            onError({
                id: "unauthorized",
                message: "Unauthorized"
            });
        }
    } catch (error) {
        onError(error);
    }
});

categoryController.delete("/:id", async function (req, res, onError) {
    try {
        const deleted = await categoryService.delete(req.params.id, req.user._id);

        if (deleted) {
            res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    } catch (error) {
        onError(error);
    }
});

module.exports = categoryController;