const cityController = require("express").Router();
const cityService = require("../../services/onlineStore/city.service");
// const authService = require("../../services/auth.service");
// const Role = require("../../helpers/role.enum");

cityController.get("/", async function (req, res, onError) {
    try {
        let citys = await cityService.getAll();
        res.status(200).json(citys);
    } catch (error) {
        onError(error);
    }
});

cityController.get("/:id", async function (req, res, onError) {
    try {
        const city = await cityService.getById(req.params.id);
        if (city) {
            res.status(200).json(city);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        onError(error);
    }
});

cityController.post("/", async function (req, res, onError) {
    try {
        let city = await cityService.create(req.body);
        res.status(200).json(city);
    } catch (error) {
        onError(error);
    }
});

cityController.put("/", async function (req, res, onError) {
    try {
        if (req.body._id) {
            let { ...cityToUpdate } = req.body;
            let city = await cityService.update(cityToUpdate, req.body._id);
            if (city) {
                res.status(200).json(city);
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

cityController.delete("/:id", async function (req, res, onError) {
    try {
        const deleted = await cityService.delete(req.params.id);

        if (deleted) {
            res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    } catch (error) {
        onError(error);
    }
});

module.exports = cityController;