const mongoose = require("mongoose")
const userCertificateSchema = new mongoose.Schema({
    certificateId: mongoose.Schema.Types.ObjectId,
    userId:mongoose.Schema.Types.ObjectId,
    status:mongoose.Schema.Types.Number,//por pagar,pagada,activa,vencida,retirada,
    creationDate: { type: mongoose.Schema.Types.Date, default: Date.now },
    lastTimeModified: mongoose.Schema.Types.Date,
    lastTimeModifiedBy: mongoose.Schema.Types.ObjectId,
    terms:mongoose.Schema.Types.Date,
    acceptedTerms:mongoose.Schema.Types.Boolean

});



userCertificateSchema.pre('save', function preSave(next) {
    this.lastTimeModified = Date.now();
    next();
});

module.exports = mongoose.model("UserCertificates", userCertificateSchema);