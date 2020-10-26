const couponController = require("express").Router();
const CouponService = require("../../services/onlineStore/coupon.service");
// const authService = require("../../services/auth.service");
// const Role = require("../../helpers/role.enum");

couponController.get("/", async function (req, res, onError) {
    try {
        let Coupons = await CouponService.getAll();
        res.status(200).json(Coupons);
    } catch (error) {
        onError(error);
    }
});

couponController.get("/:id", async function (req, res, onError) {
    try {
        const Coupon = await CouponService.getById(req.params.id);
        if (Coupon) {
            res.status(200).json(Coupon);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        onError(error);
    }
});

couponController.post("/", async function (req, res, onError) {
    try {
        let Coupon = await CouponService.create(req.body);
        res.status(200).json(Coupon);
    } catch (error) {
        onError(error);
    }
});

couponController.put("/", async function (req, res, onError) {
    try {
        if (req.body._id) {
            let { ...CouponToUpdate } = req.body;
            let Coupon = await CouponService.update(CouponToUpdate, req.body._id);
            if (Coupon) {
                res.status(200).json(Coupon);
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

couponController.delete("/:id", async function (req, res, onError) {
    try {
        const deleted = await CouponService.delete(req.params.id, req.user._id);

        if (deleted) {
            res.sendStatus(200);
        } else {
            res.sendStatus(400);
        }
    } catch (error) {
        onError(error);
    }
});

couponController.post('/match', async function (req, res, onError) {
    try {
        const { coupon_id, user_id } = req.body;
        const matchCoupons = await CouponService.matchCoupon(coupon_id, user_id)
        if (matchCoupons) {
            res.sendStatus(200);
        } else {
            res.sendStatus(400)
        }
    } catch (error) {

    }
})

module.exports = couponController;