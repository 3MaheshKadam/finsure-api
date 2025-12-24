import mongoose from "mongoose";

const socialLinkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  href: { type: String, required: true },
  icon: { type: String, required: true },
});

const linkSchema = new mongoose.Schema({
  name: { type: String, required: true },
  href: { type: String, required: true },
});

const statSchema = new mongoose.Schema({
  number: { type: String, required: true },
  label: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String, required: true },
});

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  experience: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  linkedin: { type: String, required: true },
  specialization: { type: String, required: true },
});

const milestoneSchema = new mongoose.Schema({
  year: { type: String, required: true },
  event: { type: String, required: true },
  description: { type: String, required: true },
});

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  icon: { type: String, required: true },
  color: { type: String, required: true },
});

const valueSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const missionVisionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  icon: { type: String, required: true },
});

const contactMethodSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  details: { type: String, required: true },
  subDetails: { type: String, required: true },
  action: { type: String, required: true },
  color: { type: String, required: true },
  bgColor: { type: String, required: true },
});

const officeLocationSchema = new mongoose.Schema({
  city: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  timing: { type: String, required: true },
  isHeadOffice: { type: Boolean, required: true },
});

const supportFeatureSchema = new mongoose.Schema({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
});

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    logoLetter: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String, required: true },
    cin: { type: String, required: true },
    gst: { type: String, required: true },
    disclaimer: { type: String, required: true },
    supportHours: {
      weekdays: String,
      saturday: String,
      sunday: String,
      emergency: String,
    },
    socialLinks: [socialLinkSchema],
    quickLinks: [linkSchema],
    legalLinks: [linkSchema],
    companyStats: [statSchema],
    teamMembers: [teamMemberSchema],
    milestones: [milestoneSchema],
    achievements: [achievementSchema],
    values: [valueSchema],
    missionVision: {
      mission: missionVisionSchema,
      vision: missionVisionSchema,
    },
    contactMethods: [contactMethodSchema],
    officeLocations: [officeLocationSchema],
    supportFeatures: [supportFeatureSchema],
  },
  { timestamps: true }
);

const Company = mongoose.models.Company || mongoose.model("Company", companySchema);

export default Company;