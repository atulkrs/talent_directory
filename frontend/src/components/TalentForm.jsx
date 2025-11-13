import { useState, useMemo } from "react";
import { useDispatch } from "react-redux";
import { addTalent } from "../features/talents/talentSlice";

const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;

export default function TalentForm({ onViewAll }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    skills: "",
    experience: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
  });

  const dispatch = useDispatch();

  
  const isNameValid = form.name.trim().length > 0;
  const isEmailValid = gmailRegex.test(form.email.trim());
  const isFormValid = isNameValid && isEmailValid;

  const emailError = useMemo(() => {
    const s = form.email.trim();
    if (!s && touched.email) return "Email is required.";
    if (s && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return "Enter a valid email.";
    if (s && !gmailRegex.test(s)) return "Only gmail.com addresses are allowed.";
    return "";
  }, [form.email, touched.email]);

  const handleSubmit = (e) => {
    e.preventDefault();

  
    setTouched({ name: true, email: true });

    if (!isFormValid) return;

    const newTalent = {
      name: form.name.trim(),
      email: form.email.trim(),
      skills: form.skills ? form.skills.split(",").map((s) => s.trim()) : [],
      experience: form.experience ? Number(form.experience) : 0,
    };

    dispatch(addTalent(newTalent))
      .unwrap?.()
      .catch((err) => {
        
        console.error("Failed to add talent:", err);
      });

    setForm({ name: "", email: "", skills: "", experience: "" });
    setTouched({ name: false, email: false });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
      noValidate
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-6 border-b border-gray-200 pb-2">
        Add New Talent
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            onBlur={() => setTouched((t) => ({ ...t, name: true }))}
            className={`border rounded-lg px-3 py-2.5 text-gray-800 placeholder-gray-400 focus:ring-2 transition ${
              touched.name && !isNameValid
                ? "border-red-300 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {touched.name && !isNameValid && (
            <p className="text-sm text-red-500 mt-1">Name is required.</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            placeholder="you@gmail.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            onBlur={() => setTouched((t) => ({ ...t, email: true }))}
            className={`border rounded-lg px-3 py-2.5 text-gray-800 placeholder-gray-400 focus:ring-2 transition ${
              touched.email && emailError
                ? "border-red-300 focus:ring-red-300"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {emailError && (
            <p className="text-sm text-red-500 mt-1">{emailError}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Skills <span className="text-gray-400">(comma separated)</span>
          </label>
          <input
            type="text"
            placeholder="e.g. React, Node.js, MongoDB"
            value={form.skills}
            onChange={(e) => setForm({ ...form, skills: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-600 mb-1">
            Experience (Years)
          </label>
          <input
            type="number"
            min="0"
            placeholder="Enter experience"
            value={form.experience}
            onChange={(e) => setForm({ ...form, experience: e.target.value })}
            className="border border-gray-300 rounded-lg px-3 py-2.5 text-gray-800 placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-6">
        <button
          type="submit"
          disabled={!isFormValid}
          className={`inline-flex items-center gap-2 ${
            isFormValid
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md"
              : "bg-blue-200 text-white cursor-not-allowed"
          } font-medium px-6 py-2.5 rounded-lg transition-all`}
        >
          ➕ Add Talent
        </button>

        <button
          type="button"
          onClick={onViewAll}
          className="bg-gray-100 text-gray-800 font-medium px-6 py-2.5 rounded-lg border border-gray-300 shadow-sm hover:bg-gray-200 transition-all"
        >
          👁️ View All Talents
        </button>
      </div>
    </form>
  );
}
