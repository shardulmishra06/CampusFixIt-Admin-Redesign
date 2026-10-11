import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getComplaints, deleteComplaint } from "../api";

export default function MyComplaints() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    setLoading(true);

    try {
      const data = await getComplaints();
      setComplaints(data);
    } catch (error) {
      console.error("Error loading complaints:", error);
      alert("Unable to load complaints.");
    } finally {
      setLoading(false);
    }
  };

  const filteredComplaints =
    activeFilter === "All"
      ? complaints
      : complaints.filter(
          (item) => item.status === activeFilter
        );

  const totalComplaints = complaints.length;

  const pendingComplaints = complaints.filter(
    (item) => item.status === "Pending"
  ).length;

  const inProgressComplaints = complaints.filter(
    (item) => item.status === "In Progress"
  ).length;

  const resolvedComplaints = complaints.filter(
    (item) => item.status === "Resolved"
  ).length;

  const handleCancel = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this complaint?"
    );

    if (!confirmed) return;

    try {
      await deleteComplaint(id);
      await loadComplaints();
    } catch (error) {
      console.error(error);
      alert("Unable to cancel complaint.");
    }
  };

  const getStatusClass = (status) => {
    if (status === "Pending") {
      return "bg-[#F8E4D9] text-[#A74732] border-[#E8CFC0]";
    }

    if (status === "In Progress") {
      return "bg-[#EBDDE3] text-[#78465A] border-[#D9C5CE]";
    }

    if (status === "Resolved") {
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    }

    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#1B1721]">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="fixed inset-0 pointer-events-none z-0">

        <div className="absolute inset-0 bg-gradient-to-br from-[#1B1721] via-[#241B27] to-[#2B2030]"></div>

        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#D96C3B]/10 blur-[130px]"></div>

        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-[#9E4930]/10 blur-[130px]"></div>

        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full bg-[#D96C3B]/7 blur-[120px]"></div>

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        ></div>

      </div>


      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <nav className="relative z-50 bg-[#FFF9F2]/95 backdrop-blur-xl border-b border-[#E8D8CC] shadow-lg sticky top-0">

        <div className="max-w-7xl mx-auto px-6 py-4">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            {/* LOGO */}

            <div>

              <h1 className="text-xl font-extrabold bg-gradient-to-r from-[#9E4930] to-[#D96C3B] bg-clip-text text-transparent">
                Fixit Campus
              </h1>

              <p className="text-xs text-[#756A72]">
                Student Portal
              </p>

            </div>


            {/* NAVIGATION */}

            <div className="flex flex-wrap items-center gap-2">

              <button
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-[#5E505A] hover:bg-[#F3E5DA] hover:text-[#9E4930] transition-all"
              >
                🏠 Dashboard
              </button>

              <button
                onClick={() => navigate("/submit-complaint")}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-[#5E505A] hover:bg-[#F3E5DA] hover:text-[#9E4930] transition-all"
              >
                📝 Submit Complaint
              </button>

              <button
                onClick={() => navigate("/complaints")}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#9E4930] text-white shadow-md"
              >
                📋 My Complaints
              </button>

            </div>


            {/* USER */}

            <div className="flex items-center gap-4">

              <span className="text-sm font-semibold text-[#40353D]">
                👋 {localStorage.getItem("studentName") || "Student"}
              </span>

              <button
                onClick={() => {
                  localStorage.removeItem("isLoggedIn");
                  localStorage.removeItem("studentEmail");
                  localStorage.removeItem("studentName");

                  navigate("/");
                }}
                className="text-sm text-[#A74732] font-semibold hover:text-[#873D2A]"
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      </nav>


      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-10">


        {/* HEADER */}

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5 mb-8">

          <div>

            <h2 className="text-4xl font-extrabold text-[#FFF9F2]">
              My Complaints
            </h2>

            <p className="text-[#E8DDE5] mt-2">
              {complaints.length}{" "}
              {complaints.length === 1
                ? "complaint"
                : "complaints"}{" "}
              found
            </p>

          </div>


          <button
            onClick={() => navigate("/submit-complaint")}
            className="bg-[#9E4930] hover:bg-[#873D2A] text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all"
          >
            + New Complaint
          </button>

        </div>


        {/* =====================================================
            FILTERS
        ====================================================== */}

        <div className="bg-[#FFF9F2] rounded-2xl shadow-xl border border-[#F1E4D8] p-2 mb-7">

          <div className="flex flex-wrap gap-2">

            {["All", "Pending", "In Progress", "Resolved"].map(
              (filter) => (

                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    activeFilter === filter
                      ? "bg-[#9E4930] text-white shadow-md"
                      : "text-[#6F6570] hover:bg-[#F3E5DA] hover:text-[#9E4930]"
                  }`}
                >
                  {filter}
                </button>

              )
            )}

          </div>

        </div>


        {/* =====================================================
            SUMMARY
        ====================================================== */}

        <div className="bg-[#FFF9F2] rounded-2xl shadow-xl border border-[#F1E4D8] p-5 mb-7">

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">

            <div className="flex items-center gap-2">

              <span className="w-3 h-3 rounded-full bg-[#9BA3B2]"></span>

              <span className="text-[#756A72]">
                Total
              </span>

              <strong className="text-[#29232B]">
                {totalComplaints}
              </strong>

            </div>


            <div className="flex items-center gap-2">

              <span className="w-3 h-3 rounded-full bg-[#D96C3B]"></span>

              <span className="text-[#756A72]">
                Pending
              </span>

              <strong className="text-[#29232B]">
                {pendingComplaints}
              </strong>

            </div>


            <div className="flex items-center gap-2">

              <span className="w-3 h-3 rounded-full bg-[#9E4930]"></span>

              <span className="text-[#756A72]">
                In Progress
              </span>

              <strong className="text-[#29232B]">
                {inProgressComplaints}
              </strong>

            </div>


            <div className="flex items-center gap-2">

              <span className="w-3 h-3 rounded-full bg-emerald-500"></span>

              <span className="text-[#756A72]">
                Resolved
              </span>

              <strong className="text-[#29232B]">
                {resolvedComplaints}
              </strong>

            </div>

          </div>

        </div>


        {/* =====================================================
            COMPLAINT LIST
        ====================================================== */}

        <div className="bg-[#FFF9F2] rounded-2xl shadow-2xl border border-[#F1E4D8] overflow-hidden">

          {loading ? (

            <div className="p-12 text-center">

              <p className="text-[#756A72]">
                Loading complaints...
              </p>

            </div>

          ) : filteredComplaints.length === 0 ? (

            <div className="p-12 text-center">

              <div className="text-5xl mb-4">
                📭
              </div>

              <h3 className="text-xl font-bold text-[#29232B]">
                No complaints found
              </h3>

              <p className="text-[#756A72] mt-2">
                There are no complaints in this category.
              </p>

            </div>

          ) : (

            <div className="divide-y divide-[#E8D8CC]">

              {filteredComplaints.map((item) => (

                <div
                  key={item.id}
                  className="p-7 hover:bg-[#FFF5EE] transition-all duration-300"
                >

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">


                    {/* INFORMATION */}

                    <div className="min-w-0">

                      <div className="flex flex-wrap items-center gap-3">

                        <span className="text-xs font-mono bg-[#F3E5DA] text-[#6F4E43] px-2.5 py-1 rounded-md border border-[#E8CFC0]">
                          {item.id}
                        </span>

                        <h3 className="text-lg font-bold text-[#29232B]">
                          {item.title}
                        </h3>

                      </div>


                      <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-[#756A72]">

                        <span>
                          📁 {item.category}
                        </span>

                        <span>
                          📍 {item.location}
                        </span>

                        <span>
                          📅 {item.date}
                        </span>

                      </div>

                    </div>


                    {/* ACTIONS */}

                    <div className="flex flex-wrap items-center gap-2">

                      {/* STATUS */}

                      <span
                        className={`text-xs font-bold px-3 py-1.5 rounded-full border ${getStatusClass(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>


                      {/* VIEW DETAILS */}

                      <button
                        onClick={() =>
                          navigate(`/complaints/${item.id}`)
                        }
                        className="px-4 py-2 rounded-lg border border-[#D8CDD0] text-[#4F4650] font-semibold text-sm hover:bg-[#F3E5DA] hover:text-[#9E4930] transition-all"
                      >
                        View Details
                      </button>


                      {/* EDIT */}

                      {item.status === "Pending" && (
                        <>

                          <button
                            onClick={() =>
                              navigate(
                                `/complaints/${item.id}/edit`
                              )
                            }
                            className="px-4 py-2 rounded-lg border border-[#C8A9A0] text-[#9E4930] font-semibold text-sm hover:bg-[#F8E4D9] transition-all"
                          >
                            ✏️ Edit
                          </button>


                          {/* CANCEL */}

                          <button
                            onClick={() =>
                              handleCancel(item.id)
                            }
                            className="px-4 py-2 rounded-lg border border-red-300 text-red-600 font-semibold text-sm hover:bg-red-50 transition-all"
                          >
                            ✕ Cancel
                          </button>

                        </>
                      )}

                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </main>

    </div>
  );
}