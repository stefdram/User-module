const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const CONFIG = require('./src/config/index');

require('dotenv').config();

const { port } = CONFIG;
const host = CONFIG.app;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(passport.initialize());

require('./src/config/passport');
const router = require('./src/routes/route');

app.use(router);

app.listen(port, host, () => {
  console.log(`Server starts at http://${host}:${port}`);
});
