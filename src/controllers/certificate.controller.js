const certificateController = require("express").Router();
const certificateService = require("../services/certificate.service");
const authService = require("../services/auth.service");
const Role = require("../helpers/role.enum");

certificateController.get("/", async function (req, res, onError) {
    try {
        let certificates = await certificateService.getAll();
        res.status(200).json(certificates);
    } catch (error) {
        onError(error);
    }
});

certificateController.get("/:id", async function (req, res, onError) {
    try {
        const certificate = await certificateService.getById(req.params.id);
        if (certificate) {
            res.status(200).json(certificate);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        onError(error);
    }
});

certificateController.post("/", async function (req, res, onError) {
    try {
        let certificate = await certificateService.create(req.body);
        res.status(200).json(certificate);
    } catch (error) {
        onError(error);
    }
});

certificateController.put("/", async function (req, res, onError) {
    try {

        if (req.body._id == req.user._id) {
            let { ...certificateToUpdate } = req.body;

            let certificate = await certificateService.update(certificateToUpdate, req.certificate._id);

            if (certificate) {
                res.status(200).json(certificate);
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

certificateController.delete("/:id", authService.authorize(Role.ADMIN), async function (req, res, onError) {
    try {
        const deleted = await certificateService.delete(req.params.id, req.user._id);

        if (deleted) {
            res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    } catch (error) {
        onError(error);
    }
});

module.exports = certificateController;