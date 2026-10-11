export const tickets = [
  {
    id: "CF126",
    student: "Rahul Singh",
    location: "Hostel A - 201",
    category: "Network",
    complaint: "Wi-Fi not working",
    priority: "HIGH",
    status: "OPEN",
    technician: "Unassigned",
    sla: "3h 45m left",
    createdAt: "31 May 2024, 08:30 AM"
  },

  {
    id: "CF125",
    student: "Priya Patel",
    location: "Hostel B - 105",
    category: "Electrical",
    complaint: "Ceiling fan not working",
    priority: "MEDIUM",
    status: "RESOLVED",
    technician: "Amit Kumar",
    sla: "Completed",
    createdAt: "31 May 2024, 08:10 AM"
  },

  {
    id: "CF124",
    student: "Vivek Yadav",
    location: "Academic Block - 3",
    category: "Plumbing",
    complaint: "Water leakage",
    priority: "HIGH",
    status: "IN_PROGRESS",
    technician: "Raj Verma",
    sla: "1h 20m left",
    createdAt: "31 May 2024, 09:15 AM"
  },

  {
    id: "CF123",
    student: "Anjali Mehta",
    location: "Library",
    category: "Furniture",
    complaint: "Broken study table",
    priority: "LOW",
    status: "IN_PROGRESS",
    technician: "Priya Sharma",
    sla: "5h 10m left",
    createdAt: "31 May 2024, 09:00 AM"
  },

  {
    id: "CF122",
    student: "Arjun Nair",
    location: "Sports Complex",
    category: "HVAC",
    complaint: "AC not cooling",
    priority: "MEDIUM",
    status: "OPEN",
    technician: "Unassigned",
    sla: "6h 30m left",
    createdAt: "31 May 2024, 08:20 AM"
  },

  {
    id: "CF121",
    student: "Sneha Kapoor",
    location: "Hostel C - 302",
    category: "Electrical",
    complaint: "Tube light flickering",
    priority: "LOW",
    status: "RESOLVED",
    technician: "Amit Kumar",
    sla: "Completed",
    createdAt: "30 May 2024, 06:40 PM"
  },

  {
    id: "CF120",
    student: "Rohan Das",
    location: "Cafeteria",
    category: "Plumbing",
    complaint: "Sink blockage",
    priority: "MEDIUM",
    status: "IN_PROGRESS",
    technician: "Raj Verma",
    sla: "2h 40m left",
    createdAt: "30 May 2024, 05:20 PM"
  },

  {
    id: "CF119",
    student: "Neha Sharma",
    location: "Hostel A - 405",
    category: "Network",
    complaint: "Internet disconnecting",
    priority: "HIGH",
    status: "OPEN",
    technician: "Unassigned",
    sla: "1h 55m left",
    createdAt: "30 May 2024, 04:45 PM"
  }
];


export const technicians = [
  {
    id: "TECH001",
    name: "Amit Kumar",
    department: "Electrical",
    activeTickets: 4,
    completedTickets: 42,
    status: "AVAILABLE"
  },

  {
    id: "TECH002",
    name: "Raj Verma",
    department: "Plumbing",
    activeTickets: 3,
    completedTickets: 38,
    status: "BUSY"
  },

  {
    id: "TECH003",
    name: "Priya Sharma",
    department: "Furniture",
    activeTickets: 2,
    completedTickets: 31,
    status: "AVAILABLE"
  }
];


export const slaRules = {
  HIGH: 4,
  MEDIUM: 8,
  LOW: 24
};