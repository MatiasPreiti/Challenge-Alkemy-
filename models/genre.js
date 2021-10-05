"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class genre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      genre.belongsTo(models.movies);
      genre.hasMany(models.movies, {
        as: "asociatedmovie",
        foreignKey: "movies",
      });
    }
  }
  genre.init(
    {
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      image: DataTypes.STRING,
      asociatedmovies: {
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
      modelName: "genre",
    }
  );
  return genre;
};
