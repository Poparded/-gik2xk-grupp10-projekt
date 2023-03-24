const db = require("../models");
const {
    createResponseSuccess,
    createResponseError,
    createResponseMessage,
} = require("../helpers/responseHelper");
const product = require("../models/product");
const { validate, async } = require("validate.js");
const constraints_products = {
    users_id: {
        length: {
            minimum: 2,
            maximum: 100,
            tooShort: "^Titeln måste vara minst %{count} tecken lång.",
            tooLong: "^Titeln får inte vara längre än %{count} tecken lång.",
        },
    },
    email: {
        length: {
            minimum: 3,
            maximum: 50,
            tooShort: "^Titeln måste vara minst %{count} tecken lång.",
            tooLong: "^Titeln får inte vara längre än %{count} tecken lång.",
        },
    },
    password: {
        length: {
            minimum: 8,
            maximum: 50,
            tooShort: "^Titeln måste vara minst %{count} tecken lång.",
            tooLong: "^Titeln får inte vara längre än %{count} tecken lång.",
        },
    },
};

async function getAllusers() {
    const allUsers = await db.user.findAll();
    return createResponseSuccess(allUsers);
}

async function addUsers(user) {
    try {
        const NewUser = await db.user.create(user);
        return createResponseMessage(NewUser);
    } catch (error) {
        return createResponseError(error, error.message);
    }
}
module.exports = { getAllusers };
