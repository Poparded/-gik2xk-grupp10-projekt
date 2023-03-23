// Ratings model
module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "rating",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,

            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            rating: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    len: [1, 10],
                }
            },
        },
        { underscored: true }
    );


};

