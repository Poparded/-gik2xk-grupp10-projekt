const db = require("../models")
const {
    createResponseSuccess,
    createResponseError,
    createResponseMessage
} = require("../helpers/responseHelper");
const product = require("../models/product");
const { validate } = require("validate.js");
const constraints_products = {
    title: {
        length: {
            minimum: 2,
            maximum: 100,
            tooShort: "^Titeln måste vara minst %{count} tecken lång.",
            tooLong: "^Titeln får inte vara längre än %{count} tecken lång.",
        },
    },
};

async function getAll() {
    try {
        const AllProducts = await db.product.findAll();
        return createResponseSuccess(AllProducts)
    }

    catch (error) {
        return createResponseError(error, error.message)

    }

}

async function addProduct(product) {
    const invalidData = validate(product, constraints_products)
    if (invalidData) {
        return createResponseError(422, invalidData)

    }
    try {
        const newPost = await db.product.create(product)

        return createResponseSuccess(newPost)
    }
    catch (error) {
        return createResponseError(error.status, error.message);
    }


}


async function addRating(id, comment) {
    if (!id) {
        return createResponseError(422, 'Id is required');
    }
    try {
        comment.postId = id;
        await db.comment.create(comment);

        const postWithNewComment = await db.post.findOne({
            where: { id },
            include: [
                db.user,
                db.tag,
                {
                    model: db.comment,
                    include: [db.user]
                }
            ]
        });

        return createResponseSuccess(_formatPost(postWithNewComment));
    }
    catch (error) {
        return createResponseError(error.status, error.message)
    }
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