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

    Ratings.associate = function (models) {
        Ratings.belongsTo(models.Product, {
            foreignKey: {
                name: 'product_id',
                allowNull: false
            },
            onDelete: "CASCADE"
        });
    };

    return Ratings;
};