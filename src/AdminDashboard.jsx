
import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Bot,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardList,
  Clock3,
  Download,
  LayoutDashboard,
  MapPin,
  Menu,
  MessageSquare,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
  Wrench,
  X,
} from "lucide-react";
import "./AdminDashboard.css";

const initialComplaints = [
  { id: "CF-302", title: "Water leakage near washroom", category: "Plumbing", location: "E Block · Floor 2", priority: "High", status: "Pending", reporter: "Aarav Sharma", date: "2026-10-11" },
  { id: "CF-301", title: "Wi-Fi not working in laboratory", category: "Network", location: "C Block · Lab 204", priority: "Medium", status: "In Progress", reporter: "Diya Patel", date: "2026-10-11" },
  { id: "CF-300", title: "Broken classroom projector", category: "Electrical", location: "A Block · Room 105", priority: "High", status: "In Progress", reporter: "Rohan Mehta", date: "2026-10-10" },
  { id: "CF-299", title: "Damaged corridor light", category: "Electrical", location: "B Block · Floor 1", priority: "Low", status: "Resolved", reporter: "Ananya Rao", date: "2026-10-10" },
  { id: "CF-298", title: "Air conditioning issue", category: "HVAC", location: "D Block · Room 310", priority: "Medium", status: "Pending", reporter: "Ishaan Gupta", date: "2026-10-09" },
  { id: "CF-297", title: "Broken library chair", category: "Furniture", location: "Library · Floor 2", priority: "Low", status: "Resolved", reporter: "Meera Nair", date: "2026-10-09" },
];

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Complaints", icon: ClipboardList },
  { label: "Technicians", icon: Users },
  { label: "Departments", icon: Building2 },
  { label: "Campus Locations", icon: MapPin },
  { label: "AI Assistant", icon: Bot },
  { label: "Analytics & Reports", icon: Activity },
];

function Badge({ children, type = "neutral" }) {
  return <span className={`admin-badge admin-badge-${type}`}>{children}</span>;
}

export default function AdminDashboard() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [activePage, setActivePage] = useState("Overview");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    { role: "assistant", text: "Hello, Admin! I'm CampusFix AI. I can summarize complaints, find urgent tickets and explain the dashboard data. This first version uses demo data." },
  ]);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const filteredComplaints = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return complaints.filter((item) => {
      const matchesQuery = !normalizedQuery || [
        item.id, item.title, item.category, item.location, item.reporter,
      ].some((value) => value.toLowerCase().includes(normalizedQuery));
      const matchesStatus = statusFilter === "All" || item.status === statusFilter;
      const matchesPriority = priorityFilter === "All" || item.priority === priorityFilter;
      return matchesQuery && matchesStatus && matchesPriority;
    });
  }, [complaints, query, statusFilter, priorityFilter]);

  const stats = useMemo(() => [
    { label: "Total complaints", value: complaints.length, icon: ClipboardList, tone: "violet", note: "All recorded tickets" },
    { label: "Pending", value: complaints.filter((c) => c.status === "Pending").length, icon: Clock3, tone: "amber", note: "Awaiting action" },
    { label: "In progress", value: complaints.filter((c) => c.status === "In Progress").length, icon: Wrench, tone: "blue", note: "Being worked on" },
    { label: "Resolved", value: complaints.filter((c) => c.status === "Resolved").length, icon: CheckCircle2, tone: "green", note: "Completed tickets" },
  ], [complaints]);

  function updateStatus(id, status) {
    setComplaints((current) => current.map((item) => item.id === id ? { ...item, status } : item));
    setSelectedComplaint((current) => current?.id === id ? { ...current, status } : current);
  }

  function exportComplaints() {
    const headers = ["Ticket ID", "Title", "Category", "Location", "Priority", "Status", "Reporter", "Date"];
    const rows = filteredComplaints.map((c) => [c.id, c.title, c.category, c.location, c.priority, c.status, c.reporter, c.date]);
    const csv = [headers, ...rows].map((row) => row.map((value) => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8;" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "campusfixit-complaints-demo.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  }

  function sendChatMessage(event) {
    event.preventDefault();
    const question = chatInput.trim();
    if (!question) return;

    const lower = question.toLowerCase();
    let answer;

    if (lower.includes("overdue") || lower.includes("urgent") || lower.includes("critical")) {
      const urgent = complaints.filter((c) => c.priority === "High" && c.status !== "Resolved");
      answer = urgent.length
        ? `There are ${urgent.length} high-priority unresolved demo tickets: ${urgent.map((c) => `${c.id} (${c.title})`).join("; ")}. Please verify their actual deadlines before treating them as overdue.`
        : "No high-priority unresolved demo tickets were found.";
    } else if (lower.includes("technician") || lower.includes("workload")) {
      answer = "Technician records have not been connected yet. The technician management module will need real technician data before I can calculate actual workloads.";
    } else if (lower.includes("category") || lower.includes("common") || lower.includes("trend")) {
      const counts = complaints.reduce((acc, c) => ({ ...acc, [c.category]: (acc[c.category] || 0) + 1 }), {});
      answer = `Complaint categories in this demo: ${Object.entries(counts).map(([name, count]) => `${name}: ${count}`).join(", ")}. These figures are sample data, not live campus statistics.`;
    } else if (lower.includes("pending") || lower.includes("summary") || lower.includes("today")) {
      answer = `Demo summary: ${complaints.length} tickets total, ${complaints.filter((c) => c.status === "Pending").length} pending, ${complaints.filter((c) => c.status === "In Progress").length} in progress and ${complaints.filter((c) => c.status === "Resolved").length} resolved. The dataset is illustrative.`;
    } else {
      answer = "I can summarize pending tickets, identify high-priority unresolved complaints, and describe demo category trends. For genuine AI answers, we'll connect a secure AI backend in a later phase.";
    }

    setChatMessages((current) => [...current, { role: "user", text: question }, { role: "assistant", text: answer }]);
    setChatInput("");
  }

  return (
    <div className="admin-shell">
      {mobileNavOpen && <button className="admin-mobile-backdrop" aria-label="Close navigation" onClick={() => setMobileNavOpen(false)} />}
      <aside className={`admin-sidebar ${mobileNavOpen ? "admin-sidebar-open" : ""}`}>
        <div className="admin-brand">
          <div className="admin-brand-mark">CF</div>
          <div><strong>CampusFixIt</strong><span>Operations Center</span></div>
          <button className="admin-icon-button admin-mobile-close" aria-label="Close menu" onClick={() => setMobileNavOpen(false)}><X size={19} /></button>
        </div>

        <div className="admin-workspace-label">WORKSPACE</div>
        <nav className="admin-nav">
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} className={`admin-nav-item ${activePage === label ? "active" : ""}`} onClick={() => { setActivePage(label); setMobileNavOpen(false); if (label === "AI Assistant") setShowChat(true); }}>
              <Icon size={19} strokeWidth={1.8} /><span>{label}</span>
              {label === "Complaints" && <span className="admin-nav-count">{complaints.length}</span>}
            </button>
          ))}
        </nav>

        <div className="admin-sidebar-bottom">
          <div className="admin-security-card"><ShieldCheck size={19} /><div><strong>Admin workspace</strong><span>Demo environment</span></div></div>
          <div className="admin-profile"><div className="admin-avatar">A</div><div><strong>Administrator</strong><span>Campus operations</span></div><ChevronDown size={16} /></div>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <button className="admin-icon-button admin-menu-button" aria-label="Open navigation" onClick={() => setMobileNavOpen(true)}><Menu size={21} /></button>
          <div className="admin-breadcrumb">CampusFixIt <ChevronRight size={15} /> <strong>{activePage}</strong></div>
          <label className="admin-global-search"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search tickets, locations, reporters..." /><kbd>⌘ K</kbd></label>
          <button className="admin-icon-button admin-notification-button" aria-label="Notifications" onClick={() => setShowNotifications((value) => !value)}><Bell size={20} /><i /></button>
          <div className="admin-live-label"><span /> Demo data</div>
        </header>

        {showNotifications && <div className="admin-notification-popover"><strong>Notifications</strong><p><AlertTriangle size={16} /> Review high-priority demo tickets.</p><p><MessageSquare size={16} /> Notifications are currently local demo messages.</p><button onClick={() => setShowNotifications(false)}>Dismiss</button></div>}

        <div className="admin-page-content">
          <div className="admin-welcome-row">
            <div><div className="admin-eyebrow"><Sparkles size={14} /> CAMPUS OPERATIONS</div><h1>{activePage === "Overview" ? "Good day, Administrator" : activePage}</h1><p>Monitor service requests and keep campus operations moving.</p></div>
            <div className="admin-welcome-actions"><span className="admin-date-label"><CalendarDays size={16} /> October 2026 · Demo</span><button className="admin-primary-button" onClick={() => setShowChat(true)}><Bot size={17} /> Ask CampusFix AI</button></div>
          </div>

          <div className="admin-demo-notice"><span><Activity size={17} /></span><div><strong>Demonstration environment</strong><p>These sample records are interactive but are not connected to your live Supabase database yet.</p></div><Badge type="info">Demo mode</Badge></div>

          <section className="admin-stat-grid">
            {stats.map(({ label, value, icon: Icon, tone, note }, index) => (
              <article className="admin-stat-card" key={label}>
                <div className={`admin-stat-icon tone-${tone}`}><Icon size={21} /></div>
                <div className="admin-stat-label">{label}</div>
                <div className="admin-stat-value">{value}</div>
                <div className="admin-stat-note">{index === 0 ? <ArrowUpRight size={15} /> : <Activity size={15} />}{note}</div>
              </article>
            ))}
          </section>

          <section className="admin-content-grid">
            <article className="admin-panel admin-complaints-panel">
              <div className="admin-panel-heading"><div><h2>Complaint operations</h2><p>Search, filter and manage maintenance tickets.</p></div><button className="admin-secondary-button" onClick={exportComplaints}><Download size={16} /> Export CSV</button></div>
              <div className="admin-filter-row">
                <label className="admin-table-search"><Search size={16} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search complaints..." /></label>
                <select aria-label="Filter by status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}><option>All</option><option>Pending</option><option>In Progress</option><option>Resolved</option></select>
                <select aria-label="Filter by priority" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}><option>All</option><option>High</option><option>Medium</option><option>Low</option></select>
              </div>

              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead><tr><th>Ticket</th><th>Category / Location</th><th>Priority</th><th>Status</th><th>Details</th></tr></thead>
                  <tbody>
                    {filteredComplaints.map((item) => (
                      <tr key={item.id}>
                        <td><strong className="admin-ticket-id">{item.id}</strong><span className="admin-cell-subtitle">{item.date}</span></td>
                        <td><strong>{item.category}</strong><span className="admin-cell-subtitle">{item.location}</span></td>
                        <td><Badge type={item.priority.toLowerCase()}>{item.priority}</Badge></td>
                        <td><Badge type={item.status === "Resolved" ? "success" : item.status === "Pending" ? "warning" : "info"}>{item.status}</Badge></td>
                        <td><button className="admin-view-button" onClick={() => setSelectedComplaint(item)}>View <ChevronRight size={15} /></button></td>
                      </tr>
                    ))}
                    {filteredComplaints.length === 0 && <tr><td colSpan="5" className="admin-empty-state">No tickets match these filters.</td></tr>}
                  </tbody>
                </table>
              </div>
              <div className="admin-table-footer">Showing {filteredComplaints.length} of {complaints.length} demo tickets</div>
            </article>

            <aside className="admin-side-column">
              <article className="admin-panel admin-priority-panel"><div className="admin-panel-heading"><div><h2>Needs attention</h2><p>High-priority unresolved tickets</p></div><AlertTriangle size={20} /></div>
                {complaints.filter((c) => c.priority === "High" && c.status !== "Resolved").map((item) => <button className="admin-priority-item" key={item.id} onClick={() => setSelectedComplaint(item)}><span className="admin-priority-dot" /><span><strong>{item.title}</strong><small>{item.id} · {item.location}</small></span><ChevronRight size={16} /></button>)}
                {complaints.every((c) => c.priority !== "High" || c.status === "Resolved") && <p className="admin-empty-inline">No high-priority unresolved tickets.</p>}
              </article>
              <article className="admin-panel admin-ai-card"><div className="admin-ai-orb"><Bot size={26} /></div><div className="admin-eyebrow">YOUR OPERATIONS COPILOT</div><h2>Ask CampusFix AI</h2><p>Explore the demo data, summarize tickets and identify maintenance priorities.</p><button className="admin-primary-button admin-ai-open" onClick={() => setShowChat(true)}>Open AI Assistant <ChevronRight size={17} /></button><div className="admin-ai-footnote"><Sparkles size={13} /> Demo responses · No live AI connection yet</div></article>
              <article className="admin-panel admin-activity-panel"><div className="admin-panel-heading"><div><h2>Operations pulse</h2><p>Current demo workload</p></div><Activity size={18} /></div><div className="admin-pulse-row"><span>Open workload</span><strong>{complaints.filter((c) => c.status !== "Resolved").length} tickets</strong></div><div className="admin-progress-track"><div style={{ width: `${Math.round((complaints.filter((c) => c.status === "Resolved").length / Math.max(complaints.length, 1)) * 100)}%` }} /></div><div className="admin-pulse-caption">{Math.round((complaints.filter((c) => c.status === "Resolved").length / Math.max(complaints.length, 1)) * 100)}% of demo tickets resolved</div></article>
            </aside>
          </section>
        </div>
      </main>

      {selectedComplaint && <div className="admin-modal-backdrop" onClick={() => setSelectedComplaint(null)}><section className="admin-detail-modal" role="dialog" aria-modal="true" aria-label="Complaint details" onClick={(e) => e.stopPropagation()}><div className="admin-modal-heading"><div><span className="admin-eyebrow">COMPLAINT DETAILS</span><h2>{selectedComplaint.id}</h2></div><button className="admin-icon-button" aria-label="Close details" onClick={() => setSelectedComplaint(null)}><X size={20} /></button></div><h3>{selectedComplaint.title}</h3><p className="admin-detail-description">Reported by {selectedComplaint.reporter} on {selectedComplaint.date}. This is a demonstration record.</p><div className="admin-detail-fields"><div><span>Category</span><strong>{selectedComplaint.category}</strong></div><div><span>Location</span><strong>{selectedComplaint.location}</strong></div><div><span>Priority</span><Badge type={selectedComplaint.priority.toLowerCase()}>{selectedComplaint.priority}</Badge></div><div><span>Status</span><Badge type={selectedComplaint.status === "Resolved" ? "success" : selectedComplaint.status === "Pending" ? "warning" : "info"}>{selectedComplaint.status}</Badge></div></div><label className="admin-status-label">Update demo status<select value={selectedComplaint.status} onChange={(e) => updateStatus(selectedComplaint.id, e.target.value)}><option>Pending</option><option>In Progress</option><option>Resolved</option></select></label><p className="admin-demo-helper">Status changes are held in this browser session only. Live database persistence will be added after the schema and permissions are verified.</p><button className="admin-primary-button admin-modal-done" onClick={() => setSelectedComplaint(null)}>Done</button></section></div>}

      {showChat && <div className="admin-chat-backdrop" onClick={() => setShowChat(false)}><section className="admin-chat-panel" role="dialog" aria-modal="true" aria-label="CampusFix AI Assistant" onClick={(e) => e.stopPropagation()}><header className="admin-chat-header"><div className="admin-chat-avatar"><Bot size={22} /></div><div><strong>CampusFix AI</strong><span><i /> Demo assistant · Sample data</span></div><button className="admin-icon-button" aria-label="Close assistant" onClick={() => setShowChat(false)}><X size={20} /></button></header><div className="admin-chat-context"><Sparkles size={15} /> Ask about tickets, priorities or demo trends.</div><div className="admin-chat-messages">{chatMessages.map((message, index) => <div key={index} className={`admin-chat-message ${message.role === "user" ? "user" : ""}`}><div className="admin-chat-message-icon">{message.role === "user" ? "A" : <Bot size={17} />}</div><p>{message.text}</p></div>)}</div><div className="admin-chat-suggestions">{["Summarize pending tickets", "Show urgent complaints", "Which categories are common?"].map((suggestion) => <button key={suggestion} onClick={() => setChatInput(suggestion)}>{suggestion}</button>)}</div><form className="admin-chat-form" onSubmit={sendChatMessage}><input value={chatInput} onChange={(e) => setChatInput(e.target.value)} placeholder="Ask CampusFix AI..." aria-label="Message CampusFix AI" /><button type="submit" disabled={!chatInput.trim()} aria-label="Send message"><Send size={18} /></button></form><div className="admin-chat-disclaimer">Demo assistant, not a live AI model. Verify all operational decisions.</div></section></div>}
    </div>
  );
}
