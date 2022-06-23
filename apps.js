const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const CONFIG = require('./src/config/index');

require('dotenv').config();
const port = process.env.PORT;
const host = process.env.APP;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(passport.initialize());

require('./src/config/passport');
const router = require('./src/routes/function');

app.use(router);

app.listen(port, host, () => {
  console.log(`Server starts at http://${host}:${port}`);
});
