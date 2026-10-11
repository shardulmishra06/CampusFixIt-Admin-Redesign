import { initialComplaints } from "./mockData";

const USE_MOCK = true;

const BACKEND_URL = "http://localhost:5000/api/complaints";

// Temporary in-memory database
let mockDb = [...initialComplaints];


// =====================================================
// CURRENT USER
// =====================================================

const getCurrentStudentEmail = () => {
  return localStorage.getItem("studentEmail");
};


// =====================================================
// GET COMPLAINTS
// =====================================================

export const getComplaints = async () => {

  if (USE_MOCK) {

    const studentEmail = getCurrentStudentEmail();

    console.log("Current student:", studentEmail);
    console.log("Mock complaints:", mockDb);

    return mockDb.filter(
      (item) => item.studentEmail === studentEmail
    );
  }


  const response = await fetch(BACKEND_URL, {
    headers: {
      "Content-Type": "application/json",
    },
  });


  if (!response.ok) {
    throw new Error("Failed to fetch complaints");
  }


  return response.json();
};


// =====================================================
// CREATE COMPLAINT
// =====================================================

export const createComplaint = async (newComplaintData) => {

  if (USE_MOCK) {

    const studentEmail = getCurrentStudentEmail();

    const mockCreatedItem = {
      id: `COMP-${Date.now().toString().slice(-3)}`,

      ...newComplaintData,

      studentEmail,

      status: "Pending",

      date: new Date()
        .toISOString()
        .split("T")[0],
    };


    mockDb = [
      mockCreatedItem,
      ...mockDb,
    ];


    return mockCreatedItem;
  }


  const response = await fetch(BACKEND_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(newComplaintData),
  });


  if (!response.ok) {
    throw new Error("Failed to create complaint");
  }


  return response.json();
};


// =====================================================
// UPDATE COMPLAINT
// =====================================================

export const updateComplaint = async (id, updatedData) => {

  if (USE_MOCK) {

    const studentEmail = getCurrentStudentEmail();


    const index = mockDb.findIndex(
      (item) =>
        String(item.id) === String(id) &&
        item.studentEmail === studentEmail
    );


    if (index === -1) {

      console.error("Complaint update failed");

      console.log("ID:", id);
      console.log("Student:", studentEmail);
      console.log("Database:", mockDb);

      throw new Error("Complaint not found");
    }


    mockDb[index] = {
      ...mockDb[index],
      ...updatedData,
    };


    return mockDb[index];
  }


  const response = await fetch(`${BACKEND_URL}/${id}`, {
    method: "PUT",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(updatedData),
  });


  if (!response.ok) {
    throw new Error("Failed to update complaint");
  }


  return response.json();
};


// =====================================================
// DELETE COMPLAINT
// =====================================================

export const deleteComplaint = async (id) => {

  if (USE_MOCK) {

    const studentEmail = getCurrentStudentEmail();


    const exists = mockDb.some(
      (item) =>
        String(item.id) === String(id) &&
        item.studentEmail === studentEmail
    );


    if (!exists) {
      throw new Error("Complaint not found");
    }


    mockDb = mockDb.filter(
      (item) =>
        !(
          String(item.id) === String(id) &&
          item.studentEmail === studentEmail
        )
    );


    return {
      success: true,
    };
  }


  const response = await fetch(`${BACKEND_URL}/${id}`, {
    method: "DELETE",
  });


  if (!response.ok) {
    throw new Error("Failed to delete complaint");
  }


  return response.json();
};