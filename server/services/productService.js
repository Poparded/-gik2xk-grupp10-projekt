const db = require("../models")
const {
    createResponseSuccess,
    createResponseError,
    createResponseMessage
} = require("../helpers/responseHelper");
const product = require("../models/product");

async function getAll() {
    try {
        const AllProducts = await db.product.findAll();
        return createResponseSuccess(AllProducts.map((product) => _formatProduct(product)))
    }

    catch (error) {
        return createResponseError(error, error.message)

    }

}

function addProduct() {

}

function addRating() {

}

function update() {

}

function destroy() {

}



function _formatProduct(product) {
    const cleanProduct = {
        id: product.id,
        title: product.title,
        body: product.body,
        description: product.description,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
        price: product.price,
        imageUrl: product.imageUrl

    }
    return cleanProduct
}

module.exports = { destroy, getAll, getAll, update, addRating, addProduct }; 