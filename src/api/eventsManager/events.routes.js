const express = require("express");
const router = express.Router();
const {verifyJwt} = require ("../eventsManager/events.model");

const Events = require ("../eventsManager/events.model");

