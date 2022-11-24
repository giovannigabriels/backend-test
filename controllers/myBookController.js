const { Book, Member, MyBook, Penalty } = require("../models");

class Controller {
  static async borrowBook(req, res, next) {
    try {
      const { BookId } = req.params;
      const { id } = req.user;
      const member = await Member.findOne({
        where: {
          id,
        },
      });
      const penalty = await Penalty.findOne({
        where: {
          MemberId: id,
        },
      });
      if (penalty) {
        const diffTime = new Date() - penalty.createdAt;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays <= 3) {
          throw { name: "forbidden" };
        } else {
          await Penalty.destroy({
            where: {
              MemberId: id,
            },
          });
        }
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
      await book.decrement("stock");
      await member.increment("borrow");
      await MyBook.create({
        MemberId: id,
        BookId: book.id,
      });
      res.status(201).json({ message: `success borrow ${book.title}` });
    } catch (error) {
      next(error);
    }
  }

  static async returnBook(req, res, next) {
    try {
      const { BookId } = req.params;
      const { id } = req.user;
      const member = await Member.findOne({
        where: {
          id,
        },
      });
      const myBook = await MyBook.findOne({
        where: {
          BookId,
          MemberId: id,
        },
      });
      if (!myBook) {
        throw { name: "data not found" };
      }
      const book = await Book.findOne({
        where: {
          id: BookId,
        },
      });
      await book.increment("stock");
      const diffTime = new Date() - myBook.createdAt;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      //   console.log(diffTime + " milisecond");
      console.log(diffDays + " days");
      await member.decrement("borrow");
      if (diffDays > 7) {
        await Penalty.create({
          MemberId: id,
        });
      }
      await MyBook.destroy({
        where: {
          BookId,
          MemberId: id,
        },
      });
      res.status(200).json({ message: `success return book ${book.title}` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
