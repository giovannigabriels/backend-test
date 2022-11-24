"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Member.hasMany(models.MyBook, { foreignKey: "MemberId" });
    }
  }
  Member.init(
    {
      code: DataTypes.STRING,
      name: DataTypes.STRING,
      borrow: DataTypes.INTEGER,
      password: DataTypes.STRING,
      penalty: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Member",
    }
  );
  return Member;
};
