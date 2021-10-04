"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class movies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      movies.hasMany(models.character, {
        foreignKey: "character.name",
      });
      movies.hasOne(models.genre, {
        foreignKey: "genre.name",
      });
    }
  }
  movies.init(
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      calification: {
        allowNull: false,
        defaultValue: 1,
        type: DataTypes.INTEGER,
      },
      dateCreation: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      charactersAsociated: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: {
            tableName: "character",
            schema: "disneydb",
          },
          key: "name",
        },
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      genreMovie: {
        allowNull: false,
        type: DataTypes.STRING,
        references: {
          model: {
            tableName: "genre",
            schema: "disneydb",
          },
          key: "name",
        },
      },
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      tableName: "movies",
      classMethods: {},
    }
  );
  return movies;
};
