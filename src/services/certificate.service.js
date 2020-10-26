const Certificate = require("../models/certificates");

const certificateService = {

    getById: async function (id) {
        return await Certificate.find({ _id: id });
    },

    getAll: async function () {
        let certificates = await Certificate.find({}, {
            level: false,
        });

        return certificates;
    },

    create: async function (certificate) {
        certificate = new Certificate(certificate);
        certificate.lastTimeModifiedBy = certificate._id;

        await certificate.save();

        const {
            lastTimeModifiedBy,
            ...filteredCertificate
        } = certificate.toObject();

        return filteredCertificate;
    },

    update: async function (certificate, modifierId) {
        certificate.lastTimeModifiedBy = modifierId;
        certificate.lastTimeModified = new Date();
        
        const {   creationDate, __v, ...certificateToUpdate } = certificate;
        
        const result = await Certificate.updateOne({ _id: certificate._id }, { $set: certificateToUpdate });

        return result.nModified > 0 ? certificateToUpdate : null;
    },

    delete: async function (certificateId, modifierId) {
        const certificate = await this.update({
            _id: certificateId,
            status: Status.DELETED
        }, modifierId);

        return certificate != null;
    }
}

module.exports = certificateService;