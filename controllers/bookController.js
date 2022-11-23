const { Book, Member } = require("../models");

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
  static async borrowBook(req, res, next) {
    try {
      const { BookId } = req.params;
      const { id } = req.user;
      const member = await Member.findOne({
        where: {
          id,
        },
      });
      if (member.penalty) {
        throw { name: "forbidden" };
      }
      if (member.borrow >= 2) {
        throw { name: "already" };
      }
      const book = await Book.findOne({
        where: {
          id: BookId,
        },
      });
      if (!book) {
        throw { name: "book not found" };
      }
      if (book.stock == 0) {
        throw { name: "out of stock" };
      }
      await Book.update(
        { stock: book.stock - 1 },
        {
          where: {
            id: BookId,
          },
        }
      );
      await Member.update(
        { borrow: member.borrow + 1 },
        {
          where: {
            id,
          },
        }
      );
      res.status(200).json({ message: `success borrow ${book.title}` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
