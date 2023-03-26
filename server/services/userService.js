const db = require("../models");
const {
    createResponseSuccess,
    createResponseError,
    createResponseMessage,
} = require("../helpers/responseHelper");
const product = require("../models/product");
const { validate, async } = require("validate.js");
const constraints_user = {
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
        console.log(user);
        const NewUser = await db.user.create(user);
        console.log(NewUser);
        return createResponseSuccess(NewUser);
    } catch (error) {
        return createResponseError(error, error.message);
    }
}
async function destroy(users_id) {
    if (!users_id) return createResponseError(422, "Id is required");

    try {
        await db.user.destroy({ where: { users_id } });
        return createResponseMessage(200, "User deleted");
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

async function update(user, users_id) {
    const invalidData = validate(user, constraints_user);
    if (!users_id) {
        return createResponseError(422, "Id is required");
    }
    if (invalidData) {
        return createResponseError(422, invalidData);
    }
    try {
        const existingUser = await db.user.findOne({ where: { users_id } });
        if (!existingUser) {
            return createResponseError(404, "No user found to update");
        }
        await db.user.update(user, { where: { users_id } });
        return createResponseMessage(200, "user updated");
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}
async function getRatingByUser(userId) {
    try {
        const review = await db.review.findAll({
            where: { userId },
            include: [db.user, db.product],
        });
        /* return createResponseSuccess(cart); */
        return createResponseSuccess(review);
    } catch (error) {
        return createResponseError(error.status, error.message);
    }
}

module.exports = { getAllusers, addUsers, destroy, update, getRatingByUser };
