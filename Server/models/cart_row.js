
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
            ,
            product_id: {
                type: DataTypes.DOUBLE,
                allowNull: false

            }
        },

        { underscored: true }

    );



    return cart_row;
};
