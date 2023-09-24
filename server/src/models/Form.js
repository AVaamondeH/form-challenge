const { DataTypes } = require("sequelize");
const { v4: uuidv4 } = require('uuid');

module.exports = (database) => {
    database.define("Form", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: uuidv4()
        },
        json: {
            type: DataTypes.JSON,
            allowNull: false,
        }
    }, 
    { 
        timestamps: false,
        paranoid: true,
        deletedAt: 'destroyTime',
    });
};
