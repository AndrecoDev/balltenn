const mongoose = require('mongoose')

const couponSchema = new mongoose.Schema({
    code: {
        type: String, //UPPERCASE
        required: true,
        unique: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 1
    },
    discountPercentage: {
        type: Number,
        required: true,
    },
    expirationDate: {
        type: Date,
        required: true
    },
    used: {
        type: Boolean,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    times_used: {
        type: Number,
    },

    creationDate: { type: mongoose.Schema.Types.Date, default: Date.now },
    lastTimeModified: mongoose.Schema.Types.Date,
    lastTimeModifiedBy: mongoose.Schema.Types.ObjectId
})

couponSchema.pre('save', function preSave(next) {
    this.lastTimeModified = Date.now();
    next();
});

module.exports = mongoose.model("coupons", couponSchema);