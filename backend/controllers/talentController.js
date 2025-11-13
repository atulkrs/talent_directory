import Talent from "../models/Talent.js";

export const addTalent = async (req, res) => {
  try {
    const { name, email, skills, experience } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }

    const existing = await Talent.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const newTalent = await Talent.create({
      name,
      email,
      skills,
      experience,
    });

    res.status(201).json(newTalent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTalents = async (req, res) => {
  try {
    const { skill } = req.query;
    const filter = skill
      ? { skills: { $regex: skill, $options: "i" } }
      : {};

    const talents = await Talent.find(filter);
    res.status(200).json(talents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
