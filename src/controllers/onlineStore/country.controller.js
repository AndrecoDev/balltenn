const countryController = require("express").Router();
const countryService = require("../../services/onlineStore/country.service");
// const authService = require("../../services/auth.service");
// const Role = require("../../helpers/role.enum");

countryController.get("/", async function (req, res, onError) {
    try {
        let countrys = await countryService.getAll();
        res.status(200).json(countrys);
    } catch (error) {
        onError(error);
    }
});

countryController.get("/:id", async function (req, res, onError) {
    try {
        const country = await countryService.getById(req.params.id);
        if (country) {
            res.status(200).json(country);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        onError(error);
    }
});

countryController.post("/", async function (req, res, onError) {
    try {
        let country = await countryService.create(req.body);
        res.status(200).json(country);
    } catch (error) {
        onError(error);
    }
});

countryController.put("/", async function (req, res, onError) {
    try {
        if (req.body._id) {
            let { ...countryToUpdate } = req.body;
            let country = await countryService.update(countryToUpdate, req.body._id);
            if (country) {
                res.status(200).json(country);
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

countryController.delete("/:id", async function (req, res, onError) {
    try {
        const deleted = await countryService.delete(req.params.id);

        if (deleted) {
            res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    } catch (error) {
        onError(error);
    }
});

module.exports = countryController;