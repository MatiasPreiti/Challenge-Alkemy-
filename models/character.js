"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class character extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      character.belongsTo(models.movies);
      character.hasMany(models.movies, {
        as: "moviesA",
        foreignKey: "moviesAsociated",
      });
    }
  }
  character.init(
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      image: { type: DataTypes.STRING, allowNull: false },
      age: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      history: DataTypes.STRING,
      movies: {
        allowNull: true,
        type: DataTypes.STRING,
        references: {
          model: {
            tableName: "movies",
            schema: "disneydb",
          },
          key: "title",
        },
      },
    },
    {
      sequelize,
      modelName: "character",
    }
  );
  return character;
};
