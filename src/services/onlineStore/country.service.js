const Country = require("../../models/onlineStore/country");

const CountryService = {

    getById: async function (id) {
        return await Country.find({ _id: id });
    },

    getAll: async function () {
        let countryCities = await Country.find({})
        return countryCities;
    },

    create: async function (country) {
        const created = new Country(country)
        await created.save()
        const {
            __v,
            ...fliterCreated
        } = created.toObject()

        return fliterCreated

    },

    update: async function (country, modifierId) {
        Country.lastTimeModifiedBy = modifierId;
        Country.lastTimeModified = new Date();

        const { creationDate, __v, ...countryToUpdate } = country;

        const result = await Country.updateOne({ _id: Country._id }, { $set: countryToUpdate });

        return result.nModified > 0 ? countryToUpdate : null;
    },

    delete: async function (countryId) {
        // const Country = await this.update({
        //     _id: CountryId,
        //     // status: Status.DELETED
        // });

        // return Country != null;
        const country = await Country.deleteOne({ _id: countryId });
        if (country) {
            return true;
        }
    }
}

module.exports = CountryService;