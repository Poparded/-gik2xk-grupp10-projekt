module.exports = (sequelize, DataTypes) => {
    const cart = sequelize.define(
        "cart",
        {
            cart_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            amount: {
                type: DataTypes.DOUBLE,
                allowNull: false

            },
        },
        { underscored: true }
    );

    cart.associate = function (models) {
        cart.hasMany(models.cart_row, {
            foreignKey: {
                name: 'cart_id',
                allowNull: false
            },
            onDelete: "CASCADE"
        });

        cart.belongsTo(models.Users, {
            foreignKey: {
                name: 'users_id',
                allowNull: false
            },
            onDelete: "CASCADE"
        });
    };

    return cart;
};
