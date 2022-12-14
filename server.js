// require const's
const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

const { notes } = require('./db/db');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

