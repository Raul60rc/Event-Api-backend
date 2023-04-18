const express = require("express");
const router = express.Router();
const {verifyJwt} = require ("../eventsManager/events.model");
const jwt = require ("../../../utils/jwt/jwt")

const Events = require ("../eventsManager/events.model");

router.get("/getbyevent/:event", async (req,res)=>{
    try{
        const event = req.params.event;
        const eventToFind = await Event.findOne({event: event});
        return res.status(200).json(eventToFind);
    }catch(error){
        return next (error);
    }
});

router.get("/getidbyemail/:email", async (req, res) => {
    try {
      const email = req.params.user;
      const userToFind = await Event.findOne({ user: email });
      return res.status(200).json(userToFind);
    } catch (error) {
      return next(error);
    }
  });

  router.post("/create", async (req, res) => {
    try {
      const authorization = req.headers.authorization || "";
  
      if (!authorization || authorization === "") {
        return res.status(401).json("Unauthorized");
      }
  
      const verify = verifyJwt(authorization.replace("Bearer ", ""));
  
      if (!verify) {
        return res.status(401).json("Unauthorized");
      }
  
      const newData = new Events(req.body);
      const submited = await newData.save();
      return res.status(200).json(submited);
    } catch (error) {
      console.log(error);
      return res.status(500).json("Failed to submit");
    }
  });

  router.post("/edit", async (req, res) => { // to edit. 
    try {
      const authorization = req.headers.authorization || "";
  
      if (!authorization || authorization === "") {
        return res.status(401).json("Unauthorized");
      }
  
      const verify = verifyJwt(authorization.replace("Bearer ", ""));
  
      if (!verify) {
        return res.status(401).json("Unauthorized");
      }
  
      const data = {
        event: req.body.event,
        date: req.body.date,
        location: req.body.location,
      };
  
      const item = await Events.findOneAndUpdate({ _id: req.body.id }, data, {
        new: true,
      });
      return res.status(200).json(item);
    } catch (error) {
      return res.status(500).json(error);
    }
  });

  router.get("/getbyid/:id", async (req, res) => { //
    try {
      const authorization = req.headers.authorization || "";
  
      if (!authorization || authorization === "") {
        return res.status(401).json("Unauthorized");
      }
  
      const verify = verifyJwt(authorization.replace("Bearer ", ""));
  
      if (!verify) {
        return res.status(401).json("Unauthorized");
      }
  
      const item = await Events.findById(req.params.id);
      return res.status(200).json(item);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
  
  router.get("/all", async (req, res) => {
    try {
      const authorization = req.headers.authorization || ""; // same logic as Token
  
      if (!authorization || authorization === "") {
        return res.status(401).json("Unauthorized");
      }
  
      const verify = verifyJwt(authorization.replace("Bearer ", ""));
  
      if (!verify) {
        return res.status(401).json("Unauthorized");
      }
  
      const items = await Events.find();
      return res.status(200).json(items);
    } catch (error) {
      return res.status(500).json(error);
    }
  });
  
  module.exports = router;
  