const Product = require("../../models/onlineStore/product");

const productService = {

    getById: async function (id) {
        return await Product.find({ _id: id });
    },

    getAll: async function () {
        let products = await Product.find({}, {
            level: false,
        });

        return products;
    },

    create: async function (product) {
        product = new Product(product);
        product.lastTimeModifiedBy = product._id;

        await product.save();

        const {
            lastTimeModifiedBy,
            ...filteredproduct
        } = product.toObject();

        return filteredproduct;
    },

    update: async function (product, modifierId) {
        product.lastTimeModifiedBy = modifierId;
        product.lastTimeModified = new Date();

        const { creationDate, __v, ...productToUpdate } = product;

        const result = await Product.updateOne({ _id: product._id }, { $set: productToUpdate });

        return result.nModified > 0 ? productToUpdate : null;
    },

    delete: async function (productId, modifierId) {
        const product = await this.update({
            _id: productId,
            status: Status.DELETED
        }, modifierId);

        return product != null;
    },

    saveImages: async function (images) {
        let imgNames = []
        await images.map(image => {
            imgNames.push({ image: `${image.name}` });
            image.mv(`./uploads/products/${image.name}`, function (err) {
                if (err)
                    return res.status(500).send(err);
            })
        })

        return imgNames
    },

    getByCategory: async function (idCategory) {
        const products = await Product.find({ category_id: idCategory })
        if (products) {
            return products
        } else {
            return null;
        }
    }
}

module.exports = productService;