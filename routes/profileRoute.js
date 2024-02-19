import express from "express"
import Profile from "../models/ProfileSchema.js"
import multer from "multer"
import fs from 'fs';
import path from'path';
// app.set("view engine", "ejs");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
  const filenameWithoutSpaces = file.originalname.replace(/\s+/g, '');
    cb(null, filenameWithoutSpaces);
  }
});

const upload = multer({ storage: storage });

router.post('/create-profile',upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'resume', maxCount: 1 }]), async (req, res) => {
    try {
      const { firstName,
      lastName,
      email,
      mobile,
      birthDate,
      age,
      religion,
      community,
      subCommunity,
      language,
      livingIn,
      gender,
      location,
      maritalStatus,
      diet,
      height,
      highestQualification,
      collegeName,
      workType,
      companyName,
      position,
      income,
      expressYourself,
      familyType,
      fatherOccupation,
      motherOccupation,
      siblings,
      familyLocation,
      contactAddress,
      familyAbout } = req.body;
      const profilePicture = req.files['profilePicture'][0].filename.replace(/\\/g, '/');;
      const resume = req.files['resume'][0].filename.replace(/\\/g, '/');;
      const profile = new Profile({ firstName,
        lastName,
        email,
        mobile,
        birthDate,
        age,
        religion,
        community,
        subCommunity,
        language,
        livingIn,
        gender,
        location,
        maritalStatus,
        diet,
        height,
        highestQualification,
        collegeName,
        workType,
        companyName,
        position,
        income,
        expressYourself,
        familyType,
        fatherOccupation,
        motherOccupation,
        siblings,
        familyLocation,
        contactAddress,
        familyAbout,
        profilePicture,
        resume
  });
      await profile.save();
      res.status(201).json(profile);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  // get profiles
router.get('/get-profiles', async (req, res) => {
    try {
      const profiles = await Profile.find();
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  //get specific profile
  router.get('/get-profiles/:id/details', async (req, res)=> {
    try {
      const profile = await Profile.findById(req.params.id);
      res.json(profile);
    } catch (error) {
      res.status(500).json({message: error.message})
    }
  })

export default router;