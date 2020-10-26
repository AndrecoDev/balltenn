const CartItem = require("../../models/onlineStore/cart-item");

const cartItemService = {
    add: async function (values) {
        const user = await CartItem.findOne({ user_id: values.user_id })
        let where, action, set;
        if (user) {
            const item = await user.cart.find(item => item.product_id == values.product_id)
            if (item) {
                console.log("yes")
                action = "$set";
                where = { "user_id": values.user_id, "cart.product_id": values.product_id };
                set = "cart.$";
            } else {
                console.log("no")
                action = "$push";
                where = { "user_id": values.user_id };
                set = "cart"
            }
            CartItem.findOneAndUpdate(where, {
                [action]: {
                    [set]: {
                        product_id: values.product_id,
                        amount: item ? (item.amount + values.amount) : values.amount,
                        price: values.price,
                        total: item ? values.price * (values.amount + item.amount) : (values.price * values.amount)
                    }
                }
            }, { useFindAndModify: false })
                .exec()
                .then(newItem => {
                    return newItem
                })
                .catch(error => {
                    return error
                });
        } else {
            const newCartItem = new CartItem({
                user_id: values.user_id,
                cart: [
                    {
                        product_id: values.product_id,
                        amount: values.amount,
                        price: values.price,
                        size: values.size,
                        color: values.color,
                        total: values.amount * values.price
                    }
                ]
            });
            newCartItem
                .save()
                .then(newCart => {
                    return newCart
                })
                .catch(error => {
                    return error
                });
        }
    },

    getAll: async function () {
        const products = CartItem.find({})
        return products
    },

    deleteById: async function (id) {
        const cart = await CartItem.deleteOne({ _id: id });
        if (cart) {
            return true;
        }
    },

    deleteCartProductById: async function (id) {
        const product = await CartItem.updateOne({}, { $pull: { cart: { _id: id } } });
        if (product) {
            return product;
        }
    }

}

module.exports = cartItemService