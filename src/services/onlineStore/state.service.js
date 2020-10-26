const State = require("../../models/onlineStore/state");

const StateService = {

    getById: async function (id) {
        return await State.find({ _id: id });
    },

    getAll: async function () {
        let stateCities = await State.find({})
        return stateCities;
    },

    create: async function (state) {
        const created = new State(state)
        await created.save()
        const {
            __v,
            ...fliterCreated
        } = created.toObject()

        return fliterCreated

    },

    update: async function (state, modifierId) {
        State.lastTimeModifiedBy = modifierId;
        State.lastTimeModified = new Date();

        const { creationDate, __v, ...stateToUpdate } = state;

        const result = await State.updateOne({ _id: State._id }, { $set: stateToUpdate });

        return result.nModified > 0 ? stateToUpdate : null;
    },

    delete: async function (stateId) {
        // const State = await this.update({
        //     _id: StateId,
        //     // status: Status.DELETED
        // });

        // return State != null;
        const state = await State.deleteOne({ _id: stateId });
        if (state) {
            return true;
        }
    }
}

module.exports = StateService;