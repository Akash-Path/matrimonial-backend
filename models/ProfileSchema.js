import mongoose from "mongoose";

const ProfileSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Invalid email address format',
    },
  },
  mobile: {type:Number, required: true},
  birthDate: {type: Date, required: true},
  age: {type: String},
  religion: {type: String, required: true},
  language: { type: String, required: true },
  community: {type: String, required: true},
  subCommunity: {type: String},
  livingIn: {type: String, required: true},
  gender: { type: String, required: true },
  location: { type: String, required: true },
  maritalStatus: { type: String, required: true },
  diet: { type: String, required: true },
  height: {type: String},
  highestQualification: { type: String, required: true },
  collegeName: { type: String},
  workType: { type: String, required: true },
  companyName: { type: String, required: true },
  position: { type: String },
  income: { type: String, required: true },
  expressYourself: { type: String, required: true },
  familyType: { type: String },
  fatherOccupation: { type: String},
  motherOccupation: { type: String },
  siblings: { type: String },
  familyLocation: { type: String },
  contactAddress: { type: String },
  // familyAbout: { type: String },
  profilePicture: { type: String },
  resume: { type: String },
  
  // Add more fields as needed
});

export default mongoose.model('Profile', ProfileSchema);


