const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('egresos', {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          allowNull: false,
          primaryKey: true
        },
        concept: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        amount: {
          type: DataTypes.FLOAT,
          allowNull: false
        },
        date: {
          type: DataTypes.TEXT
        },
    })
}