const app = require("../app");
const request = require("supertest");
const { Book, Member, MyBook, Penalty, sequelize } = require("../models");
const { queryInterface } = sequelize;

const members = [
  {
    code: "M001",
    name: "Angga",
    borrow: 0,
    password: "12345",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    code: "M002",
    name: "Ferry",
    borrow: 0,
    password: "12345",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    code: "M003",
    name: "Putri",
    borrow: 0,
    password: "12345",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

beforeAll(async () => {
  await queryInterface.bulkInsert("Members", members);
});

afterAll(async () => {
  await queryInterface.bulkDelete("Members", null, {
    truncate: true,
    restartIdentity: true,
    cascade: true,
  });
});

describe("POST /member/login - member login", () => {
  test("200 Success login - should return access_token", (done) => {
    request(app)
      .post("/member/login")
      .send({
        code: "M001",
        password: "12345",
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;

        expect(status).toBe(200);
        expect(body).toHaveProperty("access_token", expect.any(String));
        return done();
      });
  });

  test("401 Failed login - should return error if code is incorrect", (done) => {
    request(app)
      .post("/member/login")
      .send({
        code: "M0012",
        password: "12345",
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "invalid code or password");
        return done();
      });
  });

  test("401 Failed login - should return error if password is incorrect", (done) => {
    request(app)
      .post("/member/login")
      .send({
        code: "M001",
        password: "salahpassword",
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;

        expect(status).toBe(401);
        expect(body).toHaveProperty("message", "invalid code or password");
        return done();
      });
  });

  test("401 Failed login - should return error if password is null", (done) => {
    request(app)
      .post("/member/login")
      .send({
        code: "M001",
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Password is required");
        return done();
      });
  });

  test("401 Failed login - should return error if code is null", (done) => {
    request(app)
      .post("/member/login")
      .send({
        password: "12345",
      })
      .end((err, res) => {
        if (err) return done(err);
        const { body, status } = res;

        expect(status).toBe(400);
        expect(body).toHaveProperty("message", "Code is required");
        return done();
      });
  });
});
