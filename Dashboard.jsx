import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getComplaints } from "../api";

export default function Dashboard() {
  const navigate = useNavigate();

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  const studentName =
    localStorage.getItem("studentName") || "Student";

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
    }

    setLoading(false);
  };

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

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("studentEmail");
    localStorage.removeItem("studentName");

    navigate("/");
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#1B1721]">

      {/* =====================================================
          PREMIUM PLUM + BURNT ORANGE BACKGROUND
      ====================================================== */}

      <div className="fixed inset-0 pointer-events-none z-0">

        {/* Main gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1B1721] via-[#241B27] to-[#2B2030]"></div>

        {/* Top-left orange glow */}
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#D96C3B]/15 blur-[130px]"></div>

        {/* Right-side warm glow */}
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-[#9E4930]/15 blur-[130px]"></div>

        {/* Bottom orange glow */}
        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full bg-[#D96C3B]/10 blur-[120px]"></div>

        {/* Subtle grid */}
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

              {/* DASHBOARD */}
              <button
                onClick={() => navigate("/dashboard")}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-[#9E4930] text-white shadow-md hover:bg-[#873D2A] hover:-translate-y-0.5 transition-all duration-200"
              >
                🏠 Dashboard
              </button>


              {/* SUBMIT COMPLAINT */}
              <button
                onClick={() => navigate("/submit-complaint")}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-[#5E505A] hover:bg-[#F3E5DA] hover:text-[#9E4930] hover:-translate-y-0.5 transition-all duration-200"
              >
                📝 Submit Complaint
              </button>


              {/* MY COMPLAINTS */}
              <button
                onClick={() => navigate("/complaints")}
                className="px-4 py-2 rounded-xl text-sm font-semibold text-[#5E505A] hover:bg-[#F3E5DA] hover:text-[#9E4930] hover:-translate-y-0.5 transition-all duration-200"
              >
                📋 My Complaints
              </button>

            </div>


            {/* USER */}
            <div className="flex items-center gap-4">

              <div className="flex items-center gap-2">

                {/* Avatar */}
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#9E4930] to-[#D96C3B] text-white flex items-center justify-center font-bold shadow-md">
                  {studentName.charAt(0).toUpperCase()}
                </div>

                <span className="text-sm font-semibold text-[#40353D]">
                  {studentName}
                </span>

              </div>


              {/* LOGOUT */}
              <button
                onClick={handleLogout}
                className="text-sm text-[#A74732] font-semibold px-3 py-2 rounded-lg hover:bg-[#FBE9E4] hover:text-[#873D2A] transition-all duration-200"
              >
                Logout
              </button>

            </div>

          </div>

        </div>

      </nav>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-10">


        {/* =====================================================
            WELCOME
        ====================================================== */}

        <div className="mb-8">

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#FFF9F2]">
            Welcome back, {studentName}! 👋
          </h2>

          <p className="text-[#E8DDE5] mt-2">
            Track and manage your campus maintenance complaints.
          </p>

        </div>


        {/* =====================================================
            STATISTICS
        ====================================================== */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">


          {/* TOTAL */}
          <div className="bg-[#FFF9F2] rounded-2xl shadow-xl p-6 border border-[#F1E4D8] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

            <div className="flex items-center justify-between">

              <p className="text-sm font-semibold text-[#6F6570]">
                Total Complaints
              </p>

              <span className="w-10 h-10 rounded-xl bg-[#F3E5DA] flex items-center justify-center text-lg">
                📋
              </span>

            </div>

            <p className="text-4xl font-extrabold text-[#29232B] mt-4">
              {totalComplaints}
            </p>

            <p className="text-xs text-[#756A72] mt-1">
              All reported issues
            </p>

          </div>


          {/* PENDING */}
          <div className="bg-[#FFF9F2] rounded-2xl shadow-xl p-6 border border-[#F1E4D8] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

            <div className="flex items-center justify-between">

              <p className="text-sm font-semibold text-[#6F6570]">
                Pending
              </p>

              <span className="w-10 h-10 rounded-xl bg-[#F8E4D9] flex items-center justify-center text-lg">
                ⏳
              </span>

            </div>

            <p className="text-4xl font-extrabold text-[#C45B32] mt-4">
              {pendingComplaints}
            </p>

            <p className="text-xs text-[#756A72] mt-1">
              Waiting for action
            </p>

          </div>


          {/* IN PROGRESS */}
          <div className="bg-[#FFF9F2] rounded-2xl shadow-xl p-6 border border-[#F1E4D8] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

            <div className="flex items-center justify-between">

              <p className="text-sm font-semibold text-[#6F6570]">
                In Progress
              </p>

              <span className="w-10 h-10 rounded-xl bg-[#EBDDE3] flex items-center justify-center text-lg">
                🔧
              </span>

            </div>

            <p className="text-4xl font-extrabold text-[#8B4A3A] mt-4">
              {inProgressComplaints}
            </p>

            <p className="text-xs text-[#756A72] mt-1">
              Currently being handled
            </p>

          </div>


          {/* RESOLVED */}
          <div className="bg-[#FFF9F2] rounded-2xl shadow-xl p-6 border border-[#F1E4D8] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">

            <div className="flex items-center justify-between">

              <p className="text-sm font-semibold text-[#6F6570]">
                Resolved
              </p>

              <span className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-lg">
                ✓
              </span>

            </div>

            <p className="text-4xl font-extrabold text-emerald-600 mt-4">
              {resolvedComplaints}
            </p>

            <p className="text-xs text-[#756A72] mt-1">
              Successfully completed
            </p>

          </div>

        </div>


        {/* =====================================================
            REPORT A PROBLEM
        ====================================================== */}

        <div className="relative overflow-hidden bg-gradient-to-r from-[#63352C] via-[#75402F] to-[#8A4D35] rounded-2xl p-6 mb-8 shadow-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

          {/* Decorative glow */}
          <div className="absolute -right-16 -top-16 w-56 h-56 bg-white/10 rounded-full blur-3xl"></div>

          <div className="absolute -left-10 -bottom-20 w-48 h-48 bg-[#FFD2BC]/10 rounded-full blur-3xl"></div>


          {/* CONTENT */}
          <div className="relative z-10">

            <div className="flex items-center gap-3">

              <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center text-xl">
                🛠️
              </div>

              <div>

                <h3 className="text-xl font-bold text-white">
                  Have a campus issue?
                </h3>

                <p className="text-[#FFE9DE] text-sm mt-1">
                  Report it and let the maintenance team know.
                </p>

              </div>

            </div>

          </div>


          {/* BUTTON */}
          <button
            onClick={() => navigate("/submit-complaint")}
            className="relative z-10 bg-[#FFF9F2] text-[#9E4930] font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 hover:bg-white transition-all duration-300"
          >
            + Report a Problem
          </button>

        </div>


        {/* =====================================================
            RECENT COMPLAINTS
        ====================================================== */}

        <div className="bg-[#FFF9F2]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-[#F1E4D8] overflow-hidden">


          {/* HEADER */}
          <div className="p-6 border-b border-[#E8D8CC] flex flex-col sm:flex-row justify-between sm:items-center gap-3">

            <div>

              <h3 className="text-xl font-bold text-[#29232B]">
                Recent Complaints
              </h3>

              <p className="text-sm text-[#756A72] mt-1">
                Your latest maintenance requests
              </p>

            </div>


            <button
              onClick={() => navigate("/complaints")}
              className="text-sm text-[#9E4930] font-semibold hover:text-[#D96C3B] hover:underline transition"
            >
              View All
            </button>

          </div>


          {/* COMPLAINTS */}
          <div className="p-6">

            {loading ? (

              <p className="text-center text-[#756A72] py-6">
                Loading complaints...
              </p>

            ) : complaints.length === 0 ? (

              <p className="text-center text-[#756A72] py-6">
                You haven't submitted any complaints yet.
              </p>

            ) : (

              <div className="space-y-3">

                {complaints.slice(0, 5).map((item) => (

  <div
    key={item.id}
    onClick={() => {
      console.log("Clicked complaint:", item.id);
      navigate(`/complaints/${item.id}`);
    }}
  className="group border border-[#E8D8CC] rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white hover:bg-[#FFF5EE] hover:border-[#D9A28C] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 cursor-pointer"
>

                    {/* COMPLAINT INFO */}
                    <div className="min-w-0">

                      <div className="flex items-center gap-2">

                        <span className="text-xs font-mono bg-[#F3E5DA] text-[#6F4E43] px-2.5 py-1 rounded-md border border-[#E8CFC0]">
                          {item.id}
                        </span>

                        <h4 className="font-semibold text-[#29232B] group-hover:text-[#9E4930] transition-colors truncate">
                          {item.title}
                        </h4>

                      </div>

                      <p className="text-sm text-[#756A72] mt-1 group-hover:text-[#5E505A] transition-colors">
                        {item.category} • {item.location}
                      </p>

                    </div>


                    {/* STATUS + DATE */}
                    <div className="flex items-center gap-3 shrink-0">

                      <span
                        className={`text-xs font-bold px-3 py-1.5 rounded-full shadow-sm whitespace-nowrap ${
                          item.status === "Pending"
                            ? "bg-[#F8E4D9] text-[#A74732]"
                            : item.status === "In Progress"
                            ? "bg-[#EBDDE3] text-[#78465A]"
                            : "bg-emerald-100 text-emerald-800"
                        }`}
                      >
                        {item.status}
                      </span>

                      <span className="text-xs text-[#8A7D85] whitespace-nowrap">
                        {item.date}
                      </span>

                    </div>

                  </div>

                ))}

              </div>

            )}

          </div>

        </div>

      </main>

    </div>
  );
}