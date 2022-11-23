const { compare } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { Member } = require("../models");

class Controller {
  static async login(req, res, next) {
    try {
      const { code, password } = req.body;
      const member = await Member.findOne({
        where: {
          code,
        },
      });

      if (!member) {
        throw { name: `invalid_credentials` };
      }

      const passValid = compare(password, member.password);

      if (!passValid) {
        throw { name: `invalid_credentials` };
      }

      const payload = {
        id: member.id,
      };
      const access_token = createToken(payload);
      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getAllMember(req, res, next) {
    try {
      const member = await Member.findAll();

      res.status(200).json(member);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
