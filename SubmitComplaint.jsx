import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createComplaint } from "../api";

export default function SubmitComplaint() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Plumbing");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5 MB.");
      return;
    }

    setImage(file);

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");

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

    setLoading(true);

    try {
      await createComplaint({
        title: title.trim(),
        category,
        location: location.trim(),
        description: description.trim(),
        imageUrl: imagePreview || null,
        imageName: image ? image.name : null,
      });

      setSuccess("Complaint submitted successfully!");

      setTitle("");
      setLocation("");
      setDescription("");
      setCategory("Plumbing");
      setImage(null);
      setImagePreview("");

    } catch (error) {
      console.error(error);
      alert("Something went wrong while submitting the complaint.");
    }

    setLoading(false);
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
  onClick={() => navigate("/dashboard")}
  className="
    group
    inline-flex items-center gap-2
    bg-[#4A293D]
    text-white
    font-semibold
    px-6 py-3
    rounded-xl
    border border-[#6B3D55]
    shadow-md
    transition-all duration-300
    hover:bg-[#9E4930]
    hover:border-[#9E4930]
    hover:shadow-xl
    hover:-translate-y-1
    active:translate-y-0
  "
>
  <span className="text-lg transition-transform duration-300 group-hover:-translate-x-1">
    ←
  </span>

  <span className="text-white">
    Dashboard
  </span>
</button>

        </div>

      </nav>


      {/* =====================================================
          CONTENT
      ====================================================== */}

      <main className="relative z-10 max-w-3xl mx-auto px-6 py-10">

        {/* HEADER */}

        <div className="mb-8">

          <h2 className="text-4xl font-extrabold text-[#FFF9F2]">
            Report a Problem
          </h2>

          <p className="text-[#E8DDE5] mt-2">
            Tell us about the maintenance issue you are facing.
          </p>

        </div>


        {/* =====================================================
            FORM CARD
        ====================================================== */}

        <div className="bg-[#FFF9F2] rounded-3xl shadow-2xl border border-[#F1E4D8] p-7">

          <form onSubmit={handleSubmit} className="space-y-7">


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
                rows="5"
                placeholder="Describe the problem in detail..."
                className="w-full border border-[#D8CDD0] bg-white rounded-xl px-4 py-3 resize-none text-[#29232B] placeholder-[#9B9098] focus:outline-none focus:ring-2 focus:ring-[#9E4930]/30 focus:border-[#9E4930] transition"
              />

              <p className="text-xs text-[#8A7D85] mt-2">
                Please provide enough information for the maintenance team
                to understand the issue.
              </p>

            </div>


            {/* IMAGE */}

            <div>

              <label className="block text-sm font-semibold text-[#40353D] mb-2">

                📷 Upload Photo

                <span className="font-normal text-[#9B9098]">
                  {" "} (Optional)
                </span>

              </label>


              <div className="border-2 border-dashed border-[#D8CDD0] rounded-xl p-5 bg-[#FFFDFC]">

                {!imagePreview ? (

                  <div className="text-center">

                    <div className="text-3xl mb-2">
                      📷
                    </div>

                    <p className="text-sm text-[#756A72] mb-3">
                      Add a photo showing the problem
                    </p>

                    <label className="inline-block cursor-pointer bg-[#F3E5DA] text-[#9E4930] px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#EED8CA] transition">

                      Choose Image

                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />

                    </label>

                    <p className="text-xs text-[#9B9098] mt-2">
                      JPG, PNG, WEBP • Maximum 5 MB
                    </p>

                  </div>

                ) : (

                  <div>

                    <img
                      src={imagePreview}
                      alt="Complaint preview"
                      className="w-full max-h-80 object-contain rounded-xl bg-[#F4EEE9] border border-[#E8D8CC]"
                    />

                    <div className="flex items-center justify-between mt-3 gap-3">

                      <p className="text-sm text-[#756A72] truncate">
                        📎 {image?.name}
                      </p>

                      <button
                        type="button"
                        onClick={removeImage}
                        className="text-sm text-red-600 font-semibold hover:underline shrink-0"
                      >
                        Remove
                      </button>

                    </div>

                  </div>

                )}

              </div>

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-bold text-white shadow-lg transition-all duration-300 ${
                loading
                  ? "bg-[#AFA5A9] cursor-not-allowed"
                  : "bg-[#9E4930] hover:bg-[#873D2A] hover:-translate-y-0.5 hover:shadow-xl"
              }`}
            >
              {loading
                ? "Submitting..."
                : "Submit Complaint"}
            </button>

          </form>

        </div>

      </main>


      {/* =====================================================
          SUCCESS POPUP
      ====================================================== */}

      {success && (

        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#120E13]/75 backdrop-blur-sm px-6">

          <div className="w-full max-w-md bg-[#FFF9F2] rounded-3xl shadow-2xl border border-[#F1E4D8] p-8 text-center animate-[popup_0.35s_ease-out]">

            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-3xl text-emerald-600 mb-5">
              ✓
            </div>

            <h3 className="text-2xl font-extrabold text-[#29232B]">
              Complaint Submitted!
            </h3>

            <p className="text-[#756A72] mt-2">
              Your complaint has been successfully submitted to the
              maintenance team.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-7">

              <button
                onClick={() => setSuccess("")}
                className="flex-1 border border-[#D8CDD0] text-[#5E505A] font-semibold py-3 rounded-xl hover:bg-[#F3E5DA] transition"
              >
                Submit Another
              </button>

              <button
                onClick={() => navigate("/complaints")}
                className="flex-1 bg-[#9E4930] text-white font-semibold py-3 rounded-xl hover:bg-[#873D2A] transition shadow-md"
              >
                View My Complaints
              </button>

            </div>

          </div>

        </div>

      )}


      {/* POPUP ANIMATION */}

      <style>
        {`
          @keyframes popup {
            0% {
              opacity: 0;
              transform: scale(0.85) translateY(20px);
            }

            100% {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
        `}
      </style>

    </div>
  );
}