
module.exports = (sequelize, DataTypes) => {
    const cart_row = sequelize.define(
        "cart_row",
        {
            cart_row_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true

            },
            amount: {
                type: DataTypes.DOUBLE,
                allowNull: false

            }
        },

        { underscored: true }

    );

    cart_row.associate = function (models) {
        cart_row.belongsTo(models.Product, {
            foreignKey: {
                name: 'product_id',
                allowNull: false
            },
            onDelete: "CASCADE"
        });
    };

    return cart_row;
};
