const { Book, Member, MyBook } = require("../models");

class Controller {
  static async getAllBook(req, res, next) {
    try {
      const books = await Book.findAll();
      let output = [];
      books.forEach((el) => {
        if (el.stock > 0) {
          output.push(el);
        }
      });
      res.status(200).json(output);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
