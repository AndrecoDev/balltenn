const City = require("../../models/onlineStore/city");

const CityService = {

    getById: async function (id) {
        return await City.find({ _id: id });
    },

    getAll: async function () {
        let cities = await City.find({})
        return cities;
    },

    create: async function (city) {
        const created = new City(city)
        await created.save()
        const {
            __v,
            ...fliterCreated
        } = created.toObject()

        return fliterCreated

    },

    update: async function (city, modifierId) {
        City.lastTimeModifiedBy = modifierId;
        City.lastTimeModified = new Date();

        const { creationDate, __v, ...cityToUpdate } = city;

        const result = await City.updateOne({ _id: City._id }, { $set: cityToUpdate });

        return result.nModified > 0 ? cityToUpdate : null;
    },

    delete: async function (cityId) {
        // const City = await this.update({
        //     _id: CityId,
        //     // status: Status.DELETED
        // });

        // return City != null;
        const city = await City.deleteOne({ _id: cityId });
        if (city) {
            return true;
        }
    }
}

module.exports = CityService;