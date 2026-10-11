import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getComplaints, updateComplaint } from "../api";

export default function EditComplaint() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Plumbing");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadComplaint();
  }, [id]);

  const loadComplaint = async () => {
    setLoading(true);

    try {
      const data = await getComplaints();

      const complaint = data.find(
        (item) => String(item.id) === String(id)
      );

      if (!complaint) {
        alert("Complaint not found.");
        navigate("/complaints");
        return;
      }

      setTitle(complaint.title || "");
      setCategory(complaint.category || "Plumbing");
      setLocation(complaint.location || "");
      setDescription(complaint.description || "");

    } catch (error) {
      console.error("Error loading complaint:", error);
      alert("Unable to load complaint.");
      navigate("/complaints");
    } finally {
      setLoading(false);
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter an issue title.");
      return;
    }

    if (!location.trim()) {
      alert("Please enter the location.");
      return;
    }

    if (!description.trim()) {
      alert("Please describe the problem.");
      return;
    }

    setSaving(true);

    try {

      await updateComplaint(id, {
        title: title.trim(),
        category,
        location: location.trim(),
        description: description.trim(),
      });

      alert("Complaint updated successfully!");

      navigate(`/complaints/${id}`);

    } catch (error) {

      console.error("Error updating complaint:", error);

      alert("Something went wrong while updating the complaint.");

    } finally {

      setSaving(false);

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
            onClick={() => navigate(`/complaints/${id}`)}
            className="text-sm text-[#9E4930] font-semibold hover:text-[#D96C3B] transition"
          >
            ← Complaint Details
          </button>

        </div>

      </nav>


      {/* CONTENT */}

      <main className="relative z-10 max-w-3xl mx-auto px-6 py-10">

        {/* HEADER */}

        <div className="mb-8">

          <p className="text-sm text-[#D9A28C] font-semibold mb-2">
            Complaint #{id}
          </p>

          <h2 className="text-4xl font-extrabold text-[#FFF9F2]">
            Edit Complaint
          </h2>

          <p className="text-[#E8DDE5] mt-2">
            Update the details of your maintenance complaint.
          </p>

        </div>


        {/* FORM CARD */}

        <div className="bg-[#FFF9F2] rounded-3xl shadow-2xl border border-[#F1E4D8] p-7">

          <form
            onSubmit={handleSubmit}
            className="space-y-7"
          >

            {/* TITLE */}

            <div>

              <label className="block text-sm font-semibold text-[#40353D] mb-2">
                Issue Title
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Water tap is leaking"
                className="w-full border border-[#D8CDD0] bg-white rounded-xl px-4 py-3 text-[#29232B] placeholder-[#9B9098] focus:outline-none focus:ring-2 focus:ring-[#9E4930]/30 focus:border-[#9E4930] transition"
              />

            </div>


            {/* CATEGORY + LOCATION */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>

                <label className="block text-sm font-semibold text-[#40353D] mb-2">
                  Category
                </label>

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full border border-[#D8CDD0] bg-white rounded-xl px-4 py-3 text-[#29232B] focus:outline-none focus:ring-2 focus:ring-[#9E4930]/30 focus:border-[#9E4930] transition"
                >

                  <option value="Plumbing">
                    Plumbing
                  </option>

                  <option value="Electrical">
                    Electrical
                  </option>

                  <option value="IT / Electronics">
                    IT / Electronics
                  </option>

                  <option value="Carpentry">
                    Carpentry
                  </option>

                  <option value="Cleaning">
                    Cleaning
                  </option>

                  <option value="Infrastructure">
                    Infrastructure
                  </option>

                  <option value="Other">
                    Other
                  </option>

                </select>

              </div>


              <div>

                <label className="block text-sm font-semibold text-[#40353D] mb-2">
                  Location
                </label>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Hostel Block B, Room 204"
                  className="w-full border border-[#D8CDD0] bg-white rounded-xl px-4 py-3 text-[#29232B] placeholder-[#9B9098] focus:outline-none focus:ring-2 focus:ring-[#9E4930]/30 focus:border-[#9E4930] transition"
                />

              </div>

            </div>


            {/* DESCRIPTION */}

            <div>

              <label className="block text-sm font-semibold text-[#40353D] mb-2">
                Description
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="6"
                placeholder="Describe the problem in detail..."
                className="w-full border border-[#D8CDD0] bg-white rounded-xl px-4 py-3 resize-none text-[#29232B] placeholder-[#9B9098] focus:outline-none focus:ring-2 focus:ring-[#9E4930]/30 focus:border-[#9E4930] transition"
              />

              <p className="text-xs text-[#8A7D85] mt-2">
                Update the information that needs to be changed.
              </p>

            </div>


            {/* BUTTONS */}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">

              <button
                type="button"
                onClick={() => navigate(`/complaints/${id}`)}
                className="flex-1 border border-[#D8CDD0] text-[#5E505A] font-semibold py-3 rounded-xl hover:bg-[#F3E5DA] transition"
              >
                Cancel
              </button>


              <button
                type="submit"
                disabled={saving}
                className={`flex-1 py-3 rounded-xl font-bold text-white shadow-lg transition-all ${
                  saving
                    ? "bg-[#AFA5A9] cursor-not-allowed"
                    : "bg-[#9E4930] hover:bg-[#873D2A] hover:-translate-y-0.5"
                }`}
              >
                {saving
                  ? "Saving..."
                  : "Save Changes"}
              </button>

            </div>

          </form>

        </div>

      </main>

    </div>
  );
}