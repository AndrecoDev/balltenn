const Coupon = require("../../models/onlineStore/coupon");

const CouponService = {

    getById: async function (id) {
        return await Coupon.find({ _id: id });
    },

    getAll: async function () {
        let discountCoupons = await Coupon.find({}, {
            level: false,
        });

        return discountCoupons;
    },

    create: async function (discountCoupon) {
        discountCoupon = new Coupon(discountCoupon);
        discountCoupon.lastTimeModifiedBy = discountCoupon._id;

        await discountCoupon.save();

        const {
            lastTimeModifiedBy,
            ...filteredCoupon
        } = discountCoupon.toObject();

        return filteredCoupon;
    },

    update: async function (discountCoupon, modifierId) {
        discountCoupon.lastTimeModifiedBy = modifierId;
        discountCoupon.lastTimeModified = new Date();

        const { creationDate, __v, ...discountCouponToUpdate } = discountCoupon;

        const result = await Coupon.updateOne({ _id: discountCoupon._id }, { $set: discountCouponToUpdate });

        return result.nModified > 0 ? discountCouponToUpdate : null;
    },

    delete: async function (discountCouponId, modifierId) {
        const discountCoupon = await this.update({
            _id: discountCouponId,
            status: Status.DELETED
        }, modifierId);

        return discountCoupon != null;
    },

    matchCoupon: async function (coupon, user) {
        const couponCreated = await this.getById(coupon)
        if (couponCreated) {
            const coupon = await Coupon.updateOne({ _id: coupon }, { $set: { user_id: user } })
            if (coupon) {
                return coupon
            } else {
                return null;
            }
        } else {
            return null;
        }
    }
}

module.exports = CouponService;