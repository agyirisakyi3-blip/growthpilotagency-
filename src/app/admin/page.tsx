"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users, Trash2, Download, RefreshCw, Search, Eye,
  Mail, LogOut, Lock, TrendingUp, Inbox, Send, AlertTriangle,
  X, Menu, LayoutDashboard, Calendar, ChevronRight, Bell, MessageSquare, FileText, Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import { getLeads, deleteLead, updateLeadStatus } from "@/app/actions/leads";
import { getContacts, deleteContact } from "@/app/actions/contact";
import { getSubscribers, deleteSubscriber, getEmailLogs, deleteEmailLog } from "@/app/actions/admin";
import type { Lead, ContactSubmission, Subscriber, EmailLog } from "@/lib/types";

type TabView = "leads" | "contacts" | "subscribers" | "email-logs";

const TABS: { key: TabView; label: string; icon: typeof Users }[] = [
  { key: "leads", label: "Leads", icon: TrendingUp },
  { key: "contacts", label: "Messages", icon: Inbox },
  { key: "subscribers", label: "Subscribers", icon: Mail },
  { key: "email-logs", label: "Email Logs", icon: Send },
];

interface Data {
  leads: Lead[];
  contacts: ContactSubmission[];
  subscribers: Subscriber[];
  emailLogs: EmailLog[];
}

function fullDate(date: Date) {
  return new Date(date).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function shortDate(date: Date) {
  const d = new Date(date);
  const now = new Date();
  const diff = now.getTime() - d.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  if (hours < 24) return `${hours}h`;
  if (days < 7) return `${days}d`;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function StatusDot({ status, size = "sm" }: { status: string; size?: "sm" | "md" }) {
  const s = size === "md" ? "w-2.5 h-2.5" : "w-2 h-2";
  const colors: Record<string, string> = {
    new: "bg-blue-500", contacted: "bg-amber-500", qualified: "bg-emerald-500",
    converted: "bg-violet-500", lost: "bg-neutral-400", sent: "bg-emerald-500",
    failed: "bg-red-500",
  };
  return <span className={`inline-block ${s} rounded-full ${colors[status] || "bg-neutral-400"}`} />;
}

const DOWNLOAD_CONFIGS: Record<string, { headers: string[]; rows: (items: unknown[]) => string[][] }> = {
  leads: {
    headers: ["Name", "Email", "Phone", "Company", "Website", "Status", "Source", "Date"],
    rows: (items) => (items as Lead[]).map((l) => [
      `"${l.name}"`, `"${l.email}"`, `"${l.phone}"`, `"${l.company}"`,
      `"${l.website}"`, l.status, l.source, new Date(l.createdAt).toLocaleDateString(),
    ]),
  },
  contacts: {
    headers: ["Name", "Email", "Phone", "Subject", "Message", "Date"],
    rows: (items) => (items as ContactSubmission[]).map((c) => [
      `"${c.name}"`, `"${c.email}"`, `"${c.phone}"`, `"${c.subject}"`, `"${c.message}"`,
      new Date(c.createdAt).toLocaleDateString(),
    ]),
  },
  subscribers: {
    headers: ["Email", "Source", "Date"],
    rows: (items) => (items as Subscriber[]).map((s) => [
      `"${s.email}"`, s.source, new Date(s.createdAt).toLocaleDateString(),
    ]),
  },
  "email-logs": {
    headers: ["Recipient", "Subject", "Type", "Status", "Error", "Date"],
    rows: (items) => (items as EmailLog[]).map((l) => [
      `"${l.recipient}"`, `"${l.subject}"`, l.type, l.status,
      l.error ? `"${l.error}"` : "", new Date(l.createdAt).toLocaleDateString(),
    ]),
  },
};

function downloadCsv(tab: string, items: unknown[]) {
  const config = DOWNLOAD_CONFIGS[tab];
  if (!config) return;
  const csv = [config.headers.join(","), ...config.rows(items).map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${tab}-${new Date().toISOString().split("T")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function EmptyState({ icon: Icon, title, description }: { icon: typeof Users; title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="w-14 h-14 rounded-xl border border-dashed border-border flex items-center justify-center mb-4 text-muted-foreground">
        <Icon size={24} />
      </div>
      <p className="text-sm font-medium mb-1">{title}</p>
      <p className="text-xs text-muted-foreground max-w-[220px] text-center">{description}</p>
    </div>
  );
}

function ConfirmDialog({ open, onConfirm, onCancel }: {
  open: boolean; onConfirm: () => void; onCancel: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40"
          onClick={onCancel}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.96 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-xl border border-border bg-card p-6 shadow-xl"
          >
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center mb-3">
              <AlertTriangle size={20} className="text-red-500" />
            </div>
            <h3 className="text-sm font-semibold mb-1">Delete entry?</h3>
            <p className="text-xs text-muted-foreground mb-5">This action cannot be undone.</p>
            <div className="flex gap-2.5">
              <Button size="sm" variant="outline" className="flex-1" onClick={onCancel}>Cancel</Button>
              <Button size="sm" variant="destructive" className="flex-1" onClick={onConfirm}>Delete</Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) { onLogin(); }
      else { const d = await res.json(); setError(d.message || "Invalid credentials"); }
    } catch { setError("Something went wrong"); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center mx-auto mb-3 shadow-sm">
            <Lock size={20} className="text-white" />
          </div>
          <h1 className="text-lg font-semibold">Admin access</h1>
          <p className="text-xs text-muted-foreground mt-1">Enter your password to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              autoFocus
              className="pl-9 h-10 text-sm"
            />
          </div>
          {error && <p className="text-xs text-red-500">{error}</p>}
          <Button type="submit" className="w-full h-10 text-sm" disabled={loading || !password}>
            {loading ? "Verifying..." : "Sign in"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <div className="hidden lg:flex w-56 h-screen border-r border-border p-4 flex-col gap-4">
          <div className="h-8 w-28 bg-muted rounded-md animate-pulse" />
          <div className="space-y-1.5 mt-6">
            {[1, 2, 3, 4].map((i) => <div key={i} className="h-9 bg-muted rounded-lg animate-pulse" />)}
          </div>
        </div>
        <div className="flex-1 p-6 space-y-5">
          <div className="h-8 w-48 bg-muted rounded-md animate-pulse" />
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => <div key={i} className="h-24 bg-muted rounded-xl animate-pulse" />)}
          </div>
          <div className="h-10 w-full bg-muted rounded-lg animate-pulse" />
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => <div key={i} className="h-12 bg-muted rounded-lg animate-pulse" />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [data, setData] = useState<Data>({ leads: [], contacts: [], subscribers: [], emailLogs: [] });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<TabView>("leads");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{ type: TabView; id: string } | null>(null);
  const [updatingLead, setUpdatingLead] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/admin/verify");
        setAuthenticated(res.ok);
        if (!res.ok) return;
      } catch { setAuthenticated(false); return; }
      setLoading(true);
      const [leadsRes, contactsRes, subsRes, logsRes] = await Promise.all([
        getLeads(), getContacts(), getSubscribers(), getEmailLogs(),
      ]);
      if (cancelled) return;
      setData({
        leads: leadsRes.success ? (leadsRes.data as Lead[]) : [],
        contacts: contactsRes.success ? (contactsRes.data as ContactSubmission[]) : [],
        subscribers: subsRes.success ? (subsRes.data as Subscriber[]) : [],
        emailLogs: logsRes.success ? (logsRes.data as EmailLog[]) : [],
      });
      setLoading(false);
    })();
    return () => { cancelled = true; };
  }, []);

  async function fetchData() {
    setLoading(true);
    const [leadsRes, contactsRes, subsRes, logsRes] = await Promise.all([
      getLeads(), getContacts(), getSubscribers(), getEmailLogs(),
    ]);
    setData({
      leads: leadsRes.success ? (leadsRes.data as Lead[]) : [],
      contacts: contactsRes.success ? (contactsRes.data as ContactSubmission[]) : [],
      subscribers: subsRes.success ? (subsRes.data as Subscriber[]) : [],
      emailLogs: logsRes.success ? (logsRes.data as EmailLog[]) : [],
    });
    setLoading(false);
  }

  function handleDelete() {
    if (!confirmDelete) return;
    const { type, id } = confirmDelete;
    if (type === "leads") deleteLead(id).then((r) => { if (r.success) { setData((d) => ({ ...d, leads: d.leads.filter((l) => l.id !== id) })); toast.success("Lead deleted"); } else { toast.error("Failed to delete lead"); } });
    else if (type === "contacts") deleteContact(id).then((r) => { if (r.success) { setData((d) => ({ ...d, contacts: d.contacts.filter((c) => c.id !== id) })); toast.success("Message deleted"); } else { toast.error("Failed to delete message"); } });
    else if (type === "subscribers") deleteSubscriber(id).then((r) => { if (r.success) { setData((d) => ({ ...d, subscribers: d.subscribers.filter((s) => s.id !== id) })); toast.success("Subscriber deleted"); } else { toast.error("Failed to delete subscriber"); } });
    else if (type === "email-logs") deleteEmailLog(id).then((r) => { if (r.success) { setData((d) => ({ ...d, emailLogs: d.emailLogs.filter((l) => l.id !== id) })); toast.success("Log deleted"); } else { toast.error("Failed to delete log"); } });
    setConfirmDelete(null);
  }

  function filtered<T>(items: T[], fields: (keyof T)[], q: string): T[] {
    if (!q) return items;
    const query = q.toLowerCase();
    return items.filter((item) => fields.some((f) => String(item[f]).toLowerCase().includes(query)));
  }

  const q = search;
  const filteredLeads = filtered(
    statusFilter === "all" ? data.leads : data.leads.filter((l) => l.status === statusFilter),
    ["name", "email", "company", "phone", "website", "source"], q,
  );
  const filteredContacts = filtered(data.contacts, ["name", "email", "subject", "phone"], q);
  const filteredSubs = filtered(data.subscribers, ["email", "source"], q);
  const filteredLogs = filtered(data.emailLogs, ["recipient", "subject", "status", "type"], q);

  const stats = [
    { label: "Leads", value: data.leads.length, icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "New", value: data.leads.filter((l) => l.status === "new").length, icon: Eye, color: "text-emerald-500", bg: "bg-emerald-500/10" },
    { label: "Messages", value: data.contacts.length, icon: Inbox, color: "text-amber-500", bg: "bg-amber-500/10" },
    { label: "Subscribers", value: data.subscribers.length, icon: Mail, color: "text-violet-500", bg: "bg-violet-500/10" },
  ];

  if (authenticated === false) return <LoginForm onLogin={() => { setAuthenticated(true); window.location.reload(); }} />;
  if (authenticated === null) return <Skeleton />;

  const SIDEBAR = (
    <nav className="flex flex-col h-full">
      <div className="px-5 h-14 flex items-center border-b border-border shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shrink-0">
            <LayoutDashboard size={14} className="text-white" />
          </div>
          <span className="text-sm font-semibold">GrowthPilot</span>
        </div>
      </div>
      <div className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.key;
          const count = tab.key === "leads" ? data.leads.length
            : tab.key === "contacts" ? data.contacts.length
            : tab.key === "subscribers" ? data.subscribers.length
            : data.emailLogs.length;
          return (
            <button
              key={tab.key}
              onClick={() => { setActiveTab(tab.key); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                isActive
                  ? "bg-primary/10 text-foreground font-medium"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              <tab.icon size={16} className={isActive ? "text-primary" : ""} />
              <span className="flex-1 text-left">{tab.label}</span>
              {count > 0 && (
                <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-medium ${
                  isActive ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                }`}>{count}</span>
              )}
            </button>
          );
        })}
        <div className="pt-2 mt-2 border-t border-border space-y-0.5">
          <Link
            href="/admin/blog"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-all"
          >
            <FileText size={16} />
            <span>Blog Posts</span>
          </Link>
          <Link
            href="/admin/case-studies"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-foreground transition-all"
          >
            <Briefcase size={16} />
            <span>Case Studies</span>
          </Link>
          <Link
            href="/admin/whatsapp"
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-[#25D366]/10 hover:text-[#25D366] transition-all"
          >
            <MessageSquare size={16} />
            <span>WhatsApp Chat</span>
          </Link>
        </div>
      </div>
      <div className="p-3 border-t border-border">
        <button
          onClick={async () => { await fetch("/api/admin/logout", { method: "POST" }); setAuthenticated(false); }}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-red-500/10 hover:text-red-500 transition-all"
        >
          <LogOut size={16} />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );

  function renderTable() {
    if (activeTab === "leads") {
      if (!filteredLeads.length) return <EmptyState icon={TrendingUp} title="No leads yet" description="Leads from your website forms will appear here." />;
      const statuses = ["all", "new", "contacted", "qualified", "converted", "lost"];
      const statusCounts: Record<string, number> = {};
      data.leads.forEach((l) => { statusCounts[l.status] = (statusCounts[l.status] || 0) + 1; });
      return (
        <div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  statusFilter === s
                    ? "bg-foreground text-background shadow-sm"
                    : s === "all" ? "text-muted-foreground hover:bg-accent"
                    : `text-muted-foreground hover:bg-accent`
                }`}
              >
                {s === "all" ? "All" : s.charAt(0).toUpperCase() + s.slice(1)}
                {s !== "all" && (
                  <span className={`text-[10px] ${statusFilter === s ? "opacity-70" : "text-muted-foreground/50"}`}>
                    {statusCounts[s] || 0}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="overflow-x-auto -mx-4 sm:-mx-0">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-muted-foreground border-b border-border">
                  <th className="pb-3 font-medium text-xs tracking-wider uppercase pl-4 sm:pl-0">Name</th>
                  <th className="pb-3 font-medium text-xs tracking-wider uppercase hidden sm:table-cell">Contact</th>
                  <th className="pb-3 font-medium text-xs tracking-wider uppercase hidden md:table-cell">Company</th>
                  <th className="pb-3 font-medium text-xs tracking-wider uppercase">Status</th>
                  <th className="pb-3 font-medium text-xs tracking-wider uppercase hidden lg:table-cell pr-4 sm:pr-0">Date</th>
                  <th className="pb-3 w-10 pr-4 sm:pr-0"></th>
                </tr>
              </thead>
              <tbody>
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="border-b border-border/50 group hover:bg-accent/30 transition-colors">
                    <td className="py-2.5 pl-4 sm:pl-0">
                      <p className="font-medium text-sm">{lead.name}</p>
                      <span className="text-xs text-muted-foreground sm:hidden">{lead.email}</span>
                    </td>
                    <td className="py-2.5 hidden sm:table-cell">
                      <p className="text-sm">{lead.email}</p>
                      <p className="text-xs text-muted-foreground">{lead.phone}</p>
                    </td>
                    <td className="py-2.5 hidden md:table-cell">
                      <p className="text-sm">{lead.company}</p>
                      {lead.website && (
                        <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-xs text-primary/70 hover:text-primary">
                          {lead.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                        </a>
                      )}
                    </td>
                    <td className="py-2.5">
                      <select
                        value={lead.status}
                        onChange={async (e) => {
                          setUpdatingLead(lead.id);
                          const res = await updateLeadStatus(lead.id, e.target.value);
                          if (res.success) {
                            setData((d) => ({
                              ...d,
                              leads: d.leads.map((l) => l.id === lead.id ? { ...l, status: e.target.value } : l),
                            }));
                            toast.success(`Status updated to ${e.target.value}`);
                          } else {
                            toast.error("Failed to update status");
                          }
                          setUpdatingLead(null);
                        }}
                        disabled={updatingLead === lead.id}
                        className={`inline-flex items-center gap-1.5 rounded-md text-xs font-medium border-0 bg-transparent cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-50 ${
                          updatingLead === lead.id ? "animate-pulse" : ""
                        } ${lead.status === "new" ? "text-blue-600" : lead.status === "contacted" ? "text-amber-600" : lead.status === "qualified" ? "text-emerald-600" : lead.status === "converted" ? "text-violet-600" : "text-neutral-500"}`}
                        style={{ padding: "2px 16px 2px 0", backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: "right 2px center", backgroundRepeat: "no-repeat", backgroundSize: "14px" }}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="converted">Converted</option>
                        <option value="lost">Lost</option>
                      </select>
                    </td>
                    <td className="py-2.5 hidden lg:table-cell">
                      <p className="text-xs text-muted-foreground">{fullDate(lead.createdAt)}</p>
                      <p className="text-[11px] text-muted-foreground/60">via {lead.source}</p>
                    </td>
                    <td className="py-2.5 pr-4 sm:pr-0">
                      <button
                        onClick={() => setConfirmDelete({ type: "leads", id: lead.id })}
                        className="p-1.5 rounded-md text-muted-foreground/40 hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    if (activeTab === "contacts") {
      if (!filteredContacts.length) return <EmptyState icon={Inbox} title="No messages yet" description="Contact form submissions will appear here." />;
      return (
        <div className="space-y-2">
          {filteredContacts.map((contact) => (
            <div key={contact.id} className="group flex items-start gap-3 p-4 rounded-lg border border-border/50 hover:border-border hover:bg-accent/20 transition-all">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-xs font-semibold text-primary">
                {contact.name.charAt(0)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-medium">{contact.name}</span>
                  <span className="text-xs text-muted-foreground">· {shortDate(contact.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1.5">
                  <span>{contact.email}</span>
                  {contact.phone && <><span>·</span><span>{contact.phone}</span></>}
                  <span>·</span>
                  <Badge variant="outline" className="text-[10px] font-normal px-1.5 py-0">{contact.subject}</Badge>
                </div>
                <p className="text-xs leading-relaxed text-foreground/80 line-clamp-2">{contact.message}</p>
              </div>
              <button
                onClick={() => setConfirmDelete({ type: "contacts", id: contact.id })}
                className="p-1.5 rounded-md text-muted-foreground/40 hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all shrink-0"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      );
    }

    if (activeTab === "subscribers") {
      if (!filteredSubs.length) return <EmptyState icon={Mail} title="No subscribers yet" description="Newsletter subscribers will appear here." />;
      return (
        <div className="overflow-x-auto -mx-4 sm:-mx-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted-foreground border-b border-border">
                <th className="pb-3 font-medium text-xs tracking-wider uppercase pl-4 sm:pl-0">Email</th>
                <th className="pb-3 font-medium text-xs tracking-wider uppercase hidden sm:table-cell">Source</th>
                <th className="pb-3 font-medium text-xs tracking-wider uppercase hidden md:table-cell pr-4 sm:pr-0">Date</th>
                <th className="pb-3 w-10 pr-4 sm:pr-0"></th>
              </tr>
            </thead>
            <tbody>
              {filteredSubs.map((sub) => (
                <tr key={sub.id} className="border-b border-border/50 group hover:bg-accent/30 transition-colors">
                  <td className="py-2.5 pl-4 sm:pl-0 font-medium text-sm">{sub.email}</td>
                  <td className="py-2.5 hidden sm:table-cell text-xs text-muted-foreground">{sub.source}</td>
                  <td className="py-2.5 hidden md:table-cell text-xs text-muted-foreground pr-4 sm:pr-0">{fullDate(sub.createdAt)}</td>
                  <td className="py-2.5 pr-4 sm:pr-0">
                    <button
                      onClick={() => setConfirmDelete({ type: "subscribers", id: sub.id })}
                      className="p-1.5 rounded-md text-muted-foreground/40 hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                    >
                      <Trash2 size={13} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }

    if (!filteredLogs.length) return <EmptyState icon={Send} title="No email logs yet" description="Sent emails will be logged here." />;
    return (
      <div className="overflow-x-auto -mx-4 sm:-mx-0">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-muted-foreground border-b border-border">
              <th className="pb-3 font-medium text-xs tracking-wider uppercase pl-4 sm:pl-0">Recipient</th>
              <th className="pb-3 font-medium text-xs tracking-wider uppercase hidden sm:table-cell">Subject</th>
              <th className="pb-3 font-medium text-xs tracking-wider uppercase hidden md:table-cell">Type</th>
              <th className="pb-3 font-medium text-xs tracking-wider uppercase">Status</th>
              <th className="pb-3 font-medium text-xs tracking-wider uppercase hidden lg:table-cell pr-4 sm:pr-0">Date</th>
              <th className="pb-3 w-10 pr-4 sm:pr-0"></th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id} className="border-b border-border/50 group hover:bg-accent/30 transition-colors">
                <td className="py-2.5 pl-4 sm:pl-0 font-medium text-sm">{log.recipient}</td>
                <td className="py-2.5 hidden sm:table-cell text-xs text-muted-foreground max-w-[200px] truncate">{log.subject}</td>
                <td className="py-2.5 hidden md:table-cell"><span className="text-[11px] bg-muted px-1.5 py-0.5 rounded font-medium">{log.type}</span></td>
                <td className="py-2.5">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium">
                    <StatusDot status={log.status} />
                    {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                  </span>
                  {log.error && <p className="text-[10px] text-red-500 mt-0.5">{log.error}</p>}
                </td>
                <td className="py-2.5 hidden lg:table-cell text-xs text-muted-foreground pr-4 sm:pr-0">{fullDate(log.createdAt)}</td>
                <td className="py-2.5 pr-4 sm:pr-0">
                  <button
                    onClick={() => setConfirmDelete({ type: "email-logs", id: log.id })}
                    className="p-1.5 rounded-md text-muted-foreground/40 hover:text-red-500 hover:bg-red-500/10 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 size={13} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ConfirmDialog
        open={!!confirmDelete}
        onConfirm={handleDelete}
        onCancel={() => setConfirmDelete(null)}
      />

      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between px-4 h-12 border-b border-border bg-background sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center">
            <LayoutDashboard size={12} className="text-white" />
          </div>
          <span className="text-sm font-semibold">GrowthPilot</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={fetchData} className="p-1.5 rounded-md text-muted-foreground hover:bg-accent">
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          </button>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-md text-muted-foreground hover:bg-accent">
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <motion.aside
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              onClick={(e) => e.stopPropagation()}
              className="w-60 h-full bg-background border-r shadow-xl"
            >
              {SIDEBAR}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="hidden lg:flex w-56 h-screen sticky top-0 border-r border-border flex-col bg-background">
          {SIDEBAR}
        </aside>

        {/* Main */}
        <main className="flex-1 min-h-screen">
          {/* Top bar */}
          <div className="hidden lg:flex items-center justify-between px-6 h-14 border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-30">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span className="text-foreground font-medium">Dashboard</span>
              <ChevronRight size={12} />
              <span className="capitalize">{activeTab.replace("-", " ")}</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="relative p-2 rounded-lg text-muted-foreground hover:bg-accent transition-colors">
                <Bell size={16} />
              </button>
              <button
                onClick={fetchData}
                className="p-2 rounded-lg text-muted-foreground hover:bg-accent transition-colors"
                disabled={loading}
              >
                <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
              </button>
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center text-[10px] font-bold text-white ml-1">
                A
              </div>
            </div>
          </div>

          <div className="px-4 sm:px-6 lg:px-8 py-5 lg:py-6 max-w-6xl mx-auto">
            {/* Page header */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <div>
                <h1 className="text-xl font-semibold tracking-tight">Overview</h1>
                <p className="text-xs text-muted-foreground mt-0.5">Monitor your leads, messages, and subscribers</p>
              </div>
              <Button variant="outline" size="sm" onClick={async () => {
                await fetch("/api/admin/logout", { method: "POST" });
                setAuthenticated(false);
              }} className="gap-2 text-xs h-8 text-muted-foreground">
                <LogOut size={13} /> Logout
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {stats.map((s) => (
                <div key={s.label} className="flex items-center gap-3 p-3.5 rounded-xl border border-border/60 bg-card">
                  <div className={`w-9 h-9 rounded-lg ${s.bg} flex items-center justify-center shrink-0`}>
                    <s.icon size={17} className={s.color} />
                  </div>
                  <div>
                    <p className="text-lg font-bold tracking-tight">{s.value}</p>
                    <p className="text-[11px] text-muted-foreground">{s.label}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Search + CSV */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="relative flex-1 max-w-[280px]">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={`Search ${activeTab === "email-logs" ? "email logs" : activeTab}...`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-8 h-9 text-xs"
                />
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const map: Record<string, unknown[]> = { leads: data.leads, contacts: data.contacts, subscribers: data.subscribers, "email-logs": data.emailLogs };
                  downloadCsv(activeTab, map[activeTab] || []);
                }}
                className="gap-1.5 text-xs h-9"
              >
                <Download size={13} /> CSV
              </Button>
            </div>

            {/* Tabs */}
            <div className="flex gap-0.5 mb-5 p-0.5 bg-muted/50 rounded-lg w-fit">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                      isActive ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <tab.icon size={14} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Content */}
            <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}>
              {loading ? (
                <div className="space-y-2">
                  {[1, 2, 3, 4, 5].map((i) => <div key={i} className="h-11 bg-muted rounded-lg animate-pulse" />)}
                </div>
              ) : renderTable()}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
