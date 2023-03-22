// Ratings model
module.exports = (sequelize, DataTypes) => {
    const Ratings = sequelize.define(
        "Ratings",
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
                type: DataTypes.DOUBLE,
                allowNull: false,
            },
        },
        { underscored: true }
    );


    return Ratings;
};