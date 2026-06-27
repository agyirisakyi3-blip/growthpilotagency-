"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare, Send, ArrowLeft, Phone, Mail, Building2,
  ChevronRight, RefreshCw, Tag, LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

interface Contact {
  id: string;
  waId: string;
  name: string;
  email: string;
  company: string;
  phone: string;
  status: string;
  serviceInterest: string;
  createdAt: string;
  conversations: Conversation[];
}

interface Message {
  id: string;
  conversationId: string;
  fromMe: boolean;
  content: string;
  type: string;
  createdAt: string;
}

interface Conversation {
  id: string;
  contactId: string;
  status: string;
  intent: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
  contact: Contact;
}

function ChatBubble({ msg }: { msg: Message }) {
  const isBot = msg.fromMe;
  return (
    <div className={`flex ${isBot ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isBot
            ? "bg-primary text-primary-foreground rounded-br-md"
            : "bg-muted text-foreground rounded-bl-md"
        }`}
      >
        {msg.content.startsWith("[Button:") ? (
          <span className="italic text-xs opacity-70">Button interaction</span>
        ) : (
          msg.content
        )}
        <p className={`text-[10px] mt-1 ${isBot ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
          {new Date(msg.createdAt).toLocaleTimeString("en-US", {
            hour: "2-digit", minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    new: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    qualified: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    active: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    collecting_name: "bg-violet-500/10 text-violet-500 border-violet-500/20",
    collecting_email: "bg-violet-500/10 text-violet-500 border-violet-500/20",
    collecting_company: "bg-violet-500/10 text-violet-500 border-violet-500/20",
    qualified_lead: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  };
  return (
    <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium ${colors[status] || "bg-neutral-500/10 text-neutral-500"}`}>
      {status.replace(/_/g, " ")}
    </span>
  );
}

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) onLogin();
      else { const d = await res.json(); setError(d.message || "Invalid credentials"); }
    } catch { setError("Something went wrong"); }
    finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center mx-auto mb-3">
            <MessageSquare size={20} className="text-white" />
          </div>
          <h1 className="text-lg font-semibold">WhatsApp Chat</h1>
          <p className="text-xs text-muted-foreground mt-1">Admin access required</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" autoFocus className="h-10 text-sm" />
          {error && <p className="text-xs text-red-500">{error}</p>}
          <Button type="submit" className="w-full h-10 text-sm" disabled={loading || !password}>
            {loading ? "Verifying..." : "Sign in"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
}

export default function WhatsAppChatPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/admin/verify");
      setAuthenticated(res.ok);
      if (res.ok) fetchContacts();
      else setLoading(false);
    })();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConversation?.messages]);

  async function fetchContacts() {
    setLoading(true);
    const res = await fetch("/api/whatsapp/conversations");
    const data = await res.json();
    if (data.success) setContacts(data.data);
    setLoading(false);
  }

  async function selectContact(contact: Contact) {
    setSelectedContact(contact);
    const res = await fetch(`/api/whatsapp/conversations?contactId=${contact.id}`);
    const data = await res.json();
    if (data.success && data.data.length > 0) {
      setActiveConversation(data.data[0]);
    }
  }

  async function sendMessage() {
    if (!messageInput.trim() || !activeConversation || sending) return;
    setSending(true);
    const res = await fetch("/api/whatsapp/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId: activeConversation.id, message: messageInput.trim() }),
    });
    const data = await res.json();
    setMessageInput("");

    if (data.success) {
      const c = activeConversation;
      setActiveConversation({
        ...c,
        messages: [...c.messages, {
          id: Date.now().toString(),
          conversationId: c.id,
          fromMe: true,
          content: messageInput.trim(),
          type: "text",
          createdAt: new Date().toISOString(),
        }],
      });
    }
    setSending(false);
  }

  if (authenticated === false) return <LoginForm onLogin={() => { setAuthenticated(true); window.location.reload(); }} />;
  if (authenticated === null) return <div className="min-h-screen bg-background" />;

  return (
    <div className="h-screen flex bg-background">
      {/* Sidebar */}
      <div className="w-80 border-r border-border flex flex-col shrink-0 bg-card">
        <div className="h-14 border-b border-border flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#25D366] flex items-center justify-center">
              <MessageSquare size={14} className="text-white" />
            </div>
            <span className="text-sm font-semibold">WhatsApp Chat</span>
          </div>
          <button onClick={fetchContacts} className="p-1.5 rounded-md text-muted-foreground hover:bg-accent">
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {contacts.length === 0 && !loading && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <MessageSquare size={28} className="text-muted-foreground/40 mb-3" />
              <p className="text-sm text-muted-foreground">No conversations yet</p>
              <p className="text-xs text-muted-foreground/60 mt-1">Messages from WhatsApp will appear here</p>
            </div>
          )}
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => selectContact(contact)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                selectedContact?.id === contact.id
                  ? "bg-primary/10 border border-primary/20"
                  : "hover:bg-accent border border-transparent"
              }`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-semibold ${
                contact.name ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
              }`}>
                {contact.name ? contact.name.charAt(0).toUpperCase() : "?"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium truncate">{contact.name || "Unknown"}</span>
                  <StatusBadge status={contact.status} />
                </div>
                <p className="text-xs text-muted-foreground truncate mt-0.5">
                  {contact.conversations?.[0]?.messages?.[0]?.content || "No messages yet"}
                </p>
              </div>
            </button>
          ))}
        </div>
        <div className="p-3 border-t border-border">
          <Link
            href="/admin"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-muted-foreground hover:bg-accent transition-all"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col">
        {activeConversation ? (
          <>
            {/* Chat header */}
            <div className="h-14 border-b border-border flex items-center justify-between px-5 shrink-0 bg-card">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary">
                  {activeConversation.contact.name?.charAt(0).toUpperCase() || "?"}
                </div>
                <div>
                  <p className="text-sm font-medium">{activeConversation.contact.name || "Unknown"}</p>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
                    {activeConversation.contact.company && (
                      <span className="flex items-center gap-1"><Building2 size={10} />{activeConversation.contact.company}</span>
                    )}
                    {activeConversation.contact.serviceInterest && (
                      <span className="flex items-center gap-1"><Tag size={10} />{activeConversation.contact.serviceInterest}</span>
                    )}
                    <StatusBadge status={activeConversation.status} />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {activeConversation.contact.email && (
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Mail size={12} />{activeConversation.contact.email}</span>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3">
              {activeConversation.messages.map((msg) => (
                <ChatBubble key={msg.id} msg={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border bg-card">
              <form
                onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
                className="flex items-center gap-3"
              >
                <Input
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="Type a message..."
                  className="h-10 text-sm flex-1"
                  disabled={sending}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!messageInput.trim() || sending}
                  className="h-10 w-10 shrink-0 bg-[#25D366] hover:bg-[#20bd5a]"
                >
                  <Send size={16} />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#25D366]/10 flex items-center justify-center mx-auto mb-4">
                <MessageSquare size={32} className="text-[#25D366]" />
              </div>
              <h2 className="text-lg font-semibold mb-1">WhatsApp Chat</h2>
              <p className="text-sm text-muted-foreground max-w-[280px]">
                Select a conversation from the sidebar to view and reply to messages.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
