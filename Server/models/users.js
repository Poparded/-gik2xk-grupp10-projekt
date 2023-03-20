module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define(
        "Users",
        {
            users_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,

            },
            email: {
                type: DataTypes.STRING(200),
                allowNull: false,
                validate: {
                    len: [4, 200],
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING, // Updated data type
                allowNull: false,
                validate: {
                    len: [8, 25]
                }
            },
            username: {
                type: DataTypes.STRING(50),
                allowNull: false,
                validate: {
                    len: [3, 50]
                }
            }
            , first_name: {
                type: DataTypes.STRING(50),
                validate: {
                    len: [3, 50]
                }
            }
            , last_name: {
                type: DataTypes.STRING(50),
                validate: {
                    len: [3, 50]
                }
            },

        },

        { underscored: true }
    );

    return Users;
};
