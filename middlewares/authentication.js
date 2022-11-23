const { verifyToken } = require("../helpers/jwt");
const { Member } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: `invalid token` };
    }
    const payload = verifyToken(access_token);
    const member = await Member.findByPk(payload.id);
    if (!member) {
      throw { name: `invalid token` };
    }

    req.user = {
      id: member.id,
    };
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
