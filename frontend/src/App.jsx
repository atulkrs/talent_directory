import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchTalents } from "./features/talents/talentSlice";
import TalentForm from "./components/TalentForm";
import TalentList from "./components/TalentList";
import SkillFilter from "./components/SkillFilter";

export default function App() {
  const dispatch = useDispatch();
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (showList) dispatch(fetchTalents());
  }, [dispatch, showList]);

  return (
    
    <div className="h-screen bg-gray-100 flex justify-center items-center px-4 overflow-hidden">
      <div className="w-full max-w-6xl h-[90vh] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        <header className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 text-center shadow-md">
          <h1 className="text-2xl font-bold tracking-wide">Talent Directory</h1>
        </header>

    
        <div className="flex flex-1 overflow-hidden">
          
          <div className="w-1/2 bg-gray-50 border-r border-gray-200 p-6 overflow-hidden flex flex-col">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Add New Talent
            </h2>
            <div className="flex-1 overflow-auto">
              <TalentForm onViewAll={() => setShowList(true)} />
            </div>
          </div>

          
          <div className="w-1/2 flex flex-col bg-white">
            {showList ? (
              <>
                
                <div className="flex justify-between items-center gap-3 border-b border-gray-200 p-4 bg-white shadow-sm sticky top-0 z-10">
                  <div className="flex-1">
                    <SkillFilter />
                  </div>
                  <button
                    onClick={() => setShowList(false)}
                    className="flex items-center gap-1 text-red-500 border border-red-400 px-3 py-1 rounded-md hover:bg-red-500 hover:text-white transition text-sm font-medium"
                  >
                    ✖ Close
                  </button>
                </div>

                
                <div className="flex-1 overflow-y-auto px-5 py-3 bg-gray-50">
                  <TalentList />
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <p className="text-center text-sm">
                  Click{" "}
                  <span className="font-semibold">“View All Talents”</span> to
                  see the list.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
