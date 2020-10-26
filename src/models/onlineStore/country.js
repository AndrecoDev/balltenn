const mongoose = require('mongoose');

const countrySchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    country: mongoose.Schema.Types.String,

    creationDate: { type: mongoose.Schema.Types.Date, default: Date.now },
    lastTimeModified: mongoose.Schema.Types.Date,
    lastTimeModifiedBy: mongoose.Schema.Types.ObjectId,
});

countrySchema.pre('save', function preSave(next) {
    this.lastTimeModified = Date.now();
    next();
});

module.exports = mongoose.model('countries', countrySchema);