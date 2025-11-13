import mongoose from "mongoose";

const talentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    skills: [{ type: String }],
    experience: { type: Number },
  },
  { timestamps: true }
);

const Talent = mongoose.model("Talent", talentSchema);
export default Talent;
