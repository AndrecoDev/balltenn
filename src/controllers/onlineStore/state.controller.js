const stateController = require("express").Router();
const stateService = require("../../services/onlineStore/state.service");
// const authService = require("../../services/auth.service");
// const Role = require("../../helpers/role.enum");

stateController.get("/", async function (req, res, onError) {
    try {
        let states = await stateService.getAll();
        res.status(200).json(states);
    } catch (error) {
        onError(error);
    }
});

stateController.get("/:id", async function (req, res, onError) {
    try {
        const state = await stateService.getById(req.params.id);
        if (state) {
            res.status(200).json(state);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        onError(error);
    }
});

stateController.post("/", async function (req, res, onError) {
    try {
        let state = await stateService.create(req.body);
        res.status(200).json(state);
    } catch (error) {
        onError(error);
    }
});

stateController.put("/", async function (req, res, onError) {
    try {
        if (req.body._id) {
            let { ...stateToUpdate } = req.body;
            let state = await stateService.update(stateToUpdate, req.body._id);
            if (state) {
                res.status(200).json(state);
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

stateController.delete("/:id", async function (req, res, onError) {
    try {
        const deleted = await stateService.delete(req.params.id);

        if (deleted) {
            res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    } catch (error) {
        onError(error);
    }
});

module.exports = stateController;