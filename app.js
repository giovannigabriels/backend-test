if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const errorHandler = require("./middlewares/errorHandler");

const router = require("./routes");
const app = express();
const port = 3000;
const swaggerUi = require("swagger-ui-express");
const apiDoc = require("./apidocs.json");

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(apiDoc));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
