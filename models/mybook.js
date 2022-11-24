"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MyBook extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MyBook.belongsTo(models.Member, { foreignKey: "MemberId" });
      MyBook.belongsTo(models.Book, { foreignKey: "BookId" });
    }
  }
  MyBook.init(
    {
      MemberId: DataTypes.INTEGER,
      BookId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "MyBook",
    }
  );
  return MyBook;
};
