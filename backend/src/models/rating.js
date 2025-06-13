const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");
const User = require("./user");
const Store = require("./store");

const Rating = sequelize.define(
  "Rating",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    store_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Store,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Rating.belongsTo(User, { foreignKey: 'user_id' });
// Rating.belongsTo(Store, { foreignKey: 'store_id' });

module.exports = Rating;
