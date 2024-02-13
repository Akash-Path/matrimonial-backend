import express from "express"
import Profile from "../models/ProfileSchema.js"

const router = express.Router();



router.post('/create-profile', async (req, res) => {
    try {
      const { name, age, gender, location } = req.body;
      const profile = new Profile({ name, age, gender, location });
      await profile.save();
      res.status(201).json(profile);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
router.get('/get-profiles', async (req, res) => {
    try {
      const profiles = await Profile.find();
      res.json(profiles);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

export default router;