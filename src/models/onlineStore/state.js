const mongoose = require('mongoose');

const stateSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    country_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'countries'
    },
    state: mongoose.Schema.Types.String,
    creationDate: { type: mongoose.Schema.Types.Date, default: Date.now },
    lastTimeModified: mongoose.Schema.Types.Date,
    lastTimeModifiedBy: mongoose.Schema.Types.ObjectId,
});

stateSchema.pre('save', function preSave(next) {
    this.lastTimeModified = Date.now();
    next();
});

module.exports = mongoose.model('states', stateSchema);