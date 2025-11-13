import { useSelector } from "react-redux";
import "../App.css";

export default function TalentList() {
  const { data, loading } = useSelector((state) => state.talents);

  if (loading)
    return <p className="text-center text-gray-500">Loading talents...</p>;
  if (!data.length)
    return <p className="text-center text-gray-400">No talents found.</p>;

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm transition-all duration-300 h-full flex flex-col">
      {/* Sticky Header */}
      <div className="sticky top-0 bg-white z-10 border-b border-gray-200 p-4 rounded-t-xl shadow-sm">
        <h2 className="text-lg font-semibold text-gray-700">All Talents</h2>
      </div>

      {/* Scrollable Talent Cards (hidden scrollbar) */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4 scroll-smooth custom-scroll">
        {data.map((talent) => (
          <div
            key={talent._id}
            className="border border-gray-200 bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            <h3 className="text-lg font-bold text-gray-800">{talent.name}</h3>
            <p className="text-gray-500 text-sm">{talent.email}</p>
            <p className="mt-2 text-gray-700 text-sm">
              <span className="font-semibold">Skills:</span>{" "}
              {talent.skills.join(", ")}
            </p>
            <p className="text-gray-700 text-sm">
              <span className="font-semibold">Experience:</span>{" "}
              {talent.experience} years
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
