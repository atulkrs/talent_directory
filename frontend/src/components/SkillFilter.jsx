import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTalents } from "../features/talents/talentSlice";

export default function SkillFilter() {
  const [skill, setSkill] = useState("");
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(fetchTalents(skill));
  };

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        placeholder="Search skill..."
        value={skill}
        onChange={(e) => setSkill(e.target.value)}
        className="border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Search
      </button>
    </div>
  );
}
