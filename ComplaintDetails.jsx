import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getComplaints } from "../api";

export default function ComplaintDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [complaint, setComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadComplaint();
  }, [id]);

  const loadComplaint = async () => {
    setLoading(true);

    try {
      const data = await getComplaints();

      const foundComplaint = data.find(
        (item) => String(item.id) === String(id)
      );

      if (!foundComplaint) {
        alert("Complaint not found.");
        navigate("/complaints");
        return;
      }

      setComplaint(foundComplaint);
    } catch (error) {
      console.error("Error loading complaint:", error);
      alert("Unable to load complaint.");
      navigate("/complaints");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1B1721] flex items-center justify-center">
        <p className="text-[#FFF9F2] text-lg">
          Loading complaint...
        </p>
      </div>
    );
  }

  if (!complaint) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#1B1721]">

      {/* BACKGROUND */}

      <div className="fixed inset-0 pointer-events-none z-0">

        <div className="absolute inset-0 bg-gradient-to-br from-[#1B1721] via-[#241B27] to-[#2B2030]" />

        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-[#D96C3B]/10 blur-[130px]" />

        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] rounded-full bg-[#9E4930]/10 blur-[130px]" />

        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full bg-[#D96C3B]/7 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

      </div>


      {/* NAVBAR */}

      <nav className="relative z-50 bg-[#FFF9F2]/95 backdrop-blur-xl border-b border-[#E8D8CC] shadow-lg sticky top-0">

        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <div>
            <h1 className="text-xl font-extrabold bg-gradient-to-r from-[#9E4930] to-[#D96C3B] bg-clip-text text-transparent">
              Fixit Campus
            </h1>

            <p className="text-xs text-[#756A72]">
              Student Portal
            </p>
          </div>

          <button
            onClick={() => navigate("/complaints")}
            className="text-sm text-[#9E4930] font-semibold hover:text-[#D96C3B] transition"
          >
            ← My Complaints
          </button>

        </div>

      </nav>


      {/* CONTENT */}

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-10">

        {/* HEADER */}

        <div className="mb-8">

          <p className="text-sm text-[#D9A28C] font-semibold mb-2">
            Complaint #{complaint.id}
          </p>

          <h2 className="text-4xl font-extrabold text-[#FFF9F2]">
            Complaint Details
          </h2>

          <p className="text-[#E8DDE5] mt-2">
            View the complete details of your maintenance complaint.
          </p>

        </div>


        {/* CARD */}

        <div className="bg-[#FFF9F2] rounded-3xl shadow-2xl border border-[#F1E4D8] overflow-hidden">

          {/* TOP */}

          <div className="p-7 border-b border-[#E8D8CC]">

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">

              <div>

                <span className="inline-block text-xs font-mono bg-[#F3E5DA] text-[#6F4E43] px-3 py-1.5 rounded-md border border-[#E8CFC0] mb-3">
                  {complaint.id}
                </span>

                <h3 className="text-2xl font-extrabold text-[#29232B]">
                  {complaint.title}
                </h3>

              </div>


              {/* STATUS */}

              <span
                className={`self-start text-sm font-bold px-4 py-2 rounded-full ${
                  complaint.status === "Pending"
                    ? "bg-[#F8E4D9] text-[#A74732]"
                    : complaint.status === "In Progress"
                    ? "bg-[#EBDDE3] text-[#78465A]"
                    : "bg-emerald-100 text-emerald-800"
                }`}
              >
                {complaint.status}
              </span>

            </div>

          </div>


          {/* DETAILS */}

          <div className="p-7">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-7">

              {/* CATEGORY */}

              <div className="bg-[#FFFDFC] border border-[#E8D8CC] rounded-xl p-5">

                <p className="text-xs font-semibold text-[#8A7D85] uppercase tracking-wide">
                  Category
                </p>

                <p className="text-base font-bold text-[#29232B] mt-2">
                  {complaint.category}
                </p>

              </div>


              {/* LOCATION */}

              <div className="bg-[#FFFDFC] border border-[#E8D8CC] rounded-xl p-5">

                <p className="text-xs font-semibold text-[#8A7D85] uppercase tracking-wide">
                  Location
                </p>

                <p className="text-base font-bold text-[#29232B] mt-2">
                  {complaint.location}
                </p>

              </div>


              {/* DATE */}

              <div className="bg-[#FFFDFC] border border-[#E8D8CC] rounded-xl p-5">

                <p className="text-xs font-semibold text-[#8A7D85] uppercase tracking-wide">
                  Date
                </p>

                <p className="text-base font-bold text-[#29232B] mt-2">
                  {complaint.date || "Not available"}
                </p>

              </div>


              {/* ID */}

              <div className="bg-[#FFFDFC] border border-[#E8D8CC] rounded-xl p-5">

                <p className="text-xs font-semibold text-[#8A7D85] uppercase tracking-wide">
                  Complaint ID
                </p>

                <p className="text-base font-bold text-[#29232B] mt-2">
                  {complaint.id}
                </p>

              </div>

            </div>


            {/* DESCRIPTION */}

            <div className="mb-7">

              <h4 className="text-lg font-bold text-[#29232B] mb-3">
                Description
              </h4>

              <div className="bg-[#FFFDFC] border border-[#E8D8CC] rounded-xl p-5">

                <p className="text-[#5E505A] leading-7 whitespace-pre-wrap">
                  {complaint.description || "No description provided."}
                </p>

              </div>

            </div>


            {/* IMAGE */}

            {complaint.imageUrl && (
              <div className="mb-7">

                <h4 className="text-lg font-bold text-[#29232B] mb-3">
                  Uploaded Photo
                </h4>

                <div className="border border-[#E8D8CC] rounded-xl p-4 bg-[#FFFDFC]">

                  <img
                    src={complaint.imageUrl}
                    alt="Complaint"
                    className="w-full max-h-[500px] object-contain rounded-xl bg-[#F4EEE9]"
                  />

                </div>

              </div>
            )}


            {/* BUTTONS */}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">

              <button
                onClick={() => navigate("/complaints")}
                className="flex-1 border border-[#D8CDD0] text-[#5E505A] font-semibold py-3 rounded-xl hover:bg-[#F3E5DA] transition"
              >
                ← Back to My Complaints
              </button>


              <button
                onClick={() =>
                  navigate(`/complaints/${complaint.id}/edit`)
                }
                className="flex-1 bg-[#9E4930] text-white font-semibold py-3 rounded-xl hover:bg-[#873D2A] transition shadow-md"
              >
                ✏️ Edit Complaint
              </button>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}