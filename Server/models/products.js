// Product model
module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define(
        "Product",
        {
            product_id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            price: {
                type: DataTypes.FLOAT,
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            imageUrl: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            size: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        { underscored: true }
    );

    Product.associate = function (models) {
        Product.hasMany(models.Ratings, {
            foreignKey: {
                name: 'product_id',
                allowNull: false
            },
            onDelete: "CASCADE"
        });
        Product.hasMany(models.cart_row, {
            foreignKey: {
                name: 'product_id',
                allowNull: false
            },
            onDelete: "CASCADE"
        });
    };

    return Product;
};
