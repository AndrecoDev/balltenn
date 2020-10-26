const Category = require("../../models/onlineStore/category");

const CategoryService = {

    getById: async function (id) {
        return await Category.find({ _id: id });
    },

    getAll: async function () {
        let categories = await Category.find({}, {
            level: false,
        });

        return categories;
    },

    create: async function (category) {
        category = new Category(category);
        category.lastTimeModifiedBy = category._id;

        await category.save();

        const {
            lastTimeModifiedBy,
            ...filteredCategory
        } = category.toObject();

        return filteredCategory;
    },

    update: async function (category, modifierId) {
        category.lastTimeModifiedBy = modifierId;
        category.lastTimeModified = new Date();
        
        const {   creationDate, __v, ...categoryToUpdate } = category;
        
        const result = await Category.updateOne({ _id: category._id }, { $set: categoryToUpdate });

        return result.nModified > 0 ? categoryToUpdate : null;
    },

    delete: async function (categoryId, modifierId) {
        const category = await this.update({
            _id: categoryId,
            status: Status.DELETED
        }, modifierId);

        return category != null;
    }
}

module.exports = CategoryService;