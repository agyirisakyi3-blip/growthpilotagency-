"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Briefcase, Plus, Trash2, RefreshCw, ArrowLeft,
  Eye, EyeOff, Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  getCaseStudies, createCaseStudy, updateCaseStudy,
  deleteCaseStudy, toggleCaseStudy,
} from "@/app/actions/case-studies";
import type { CaseStudy } from "@/lib/types";

type View = "list" | "edit";

const INDUSTRIES = ["E-commerce", "SaaS", "Healthcare", "Finance", "Real Estate", "Education", "Hospitality", "Other"];

function fullDate(date: Date) {
  return new Date(date).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function AdminCaseStudiesPage() {
  const [studies, setStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>("list");
  const [editId, setEditId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const formDefaults = { title: "", slug: "", client: "", industry: "E-commerce", challenge: "", solution: "", results: "", metrics: "{}", image: "", published: false };
  const [form, setForm] = useState(formDefaults);
  const [saving, setSaving] = useState(false);

  async function fetchStudies() {
    setLoading(true);
    const res = await getCaseStudies();
    if (res.success) setStudies(res.data as unknown as CaseStudy[]);
    setLoading(false);
  }

  useEffect(() => { fetchStudies(); }, []);

  function handleNew() {
    setEditId(null);
    setForm(formDefaults);
    setView("edit");
  }

  async function handleEdit(id: string) {
    setEditId(id);
    const res = await getCaseStudies();
    const study = res.data?.find((s) => s.id === id) as CaseStudy | undefined;
    if (study) {
      setForm({
        title: study.title, slug: study.slug, client: study.client,
        industry: study.industry, challenge: study.challenge,
        solution: study.solution, results: study.results,
        metrics: typeof study.metrics === "object" ? JSON.stringify(study.metrics) : study.metrics || "{}",
        image: study.image, published: study.published,
      });
    }
    setView("edit");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.set(k, String(v)));
    const res = editId ? await updateCaseStudy(editId, fd) : await createCaseStudy(fd);
    setSaving(false);
    if (res.success) { setView("list"); fetchStudies(); }
  }

  async function handleToggle(id: string, published: boolean) {
    await toggleCaseStudy(id, !published);
    setStudies((s) => s.map((st) => st.id === id ? { ...st, published: !published } : st));
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this case study?")) return;
    await deleteCaseStudy(id);
    setStudies((s) => s.filter((st) => st.id !== id));
  }

  const q = search.toLowerCase();
  const filtered = studies.filter((s) =>
    [s.title, s.client, s.industry].some((f) => f.toLowerCase().includes(q))
  );

  if (view === "edit") {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setView("list")} className="p-1.5 rounded-md text-muted-foreground hover:bg-accent">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-semibold">{editId ? "Edit Case Study" : "New Case Study"}</h1>
        </div>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Title</label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Slug</label>
              <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} required />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Client</label>
              <Input value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} required />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Industry</label>
              <select
                value={form.industry}
                onChange={(e) => setForm({ ...form, industry: e.target.value })}
                className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              >
                {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Challenge</label>
            <textarea
              value={form.challenge}
              onChange={(e) => setForm({ ...form, challenge: e.target.value })}
              required
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 min-h-[80px]"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Solution</label>
            <textarea
              value={form.solution}
              onChange={(e) => setForm({ ...form, solution: e.target.value })}
              required
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 min-h-[80px]"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Results</label>
            <textarea
              value={form.results}
              onChange={(e) => setForm({ ...form, results: e.target.value })}
              required
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 min-h-[80px]"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Metrics (JSON)</label>
              <Input value={form.metrics} onChange={(e) => setForm({ ...form, metrics: e.target.value })} />
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Image URL</label>
              <Input value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
            </div>
            <div className="flex items-end pb-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.published}
                  onChange={(e) => setForm({ ...form, published: e.target.checked })}
                  className="rounded border-border"
                />
                <span className="text-xs font-medium">Published</span>
              </label>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={saving} className="h-9 text-sm">
              {saving ? "Saving..." : editId ? "Update" : "Create"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setView("list")} className="h-9 text-sm">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <Link href="/admin" className="text-xs text-muted-foreground hover:text-foreground mb-1 block">&larr; Back to Dashboard</Link>
          <h1 className="text-lg font-semibold">Case Studies</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchStudies} className="p-2 rounded-lg text-muted-foreground hover:bg-accent">
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          </button>
          <Button onClick={handleNew} size="sm" className="gap-1.5 text-xs h-8">
            <Plus size={13} /> New Case Study
          </Button>
        </div>
      </div>

      <div className="relative mb-4 max-w-xs">
        <Input
          placeholder="Search case studies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 text-xs"
        />
      </div>

      {loading ? (
        <div className="space-y-2">{[1, 2, 3].map((i) => <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center py-24 text-muted-foreground">
          <Briefcase size={28} className="mb-3" />
          <p className="text-sm font-medium mb-1">No case studies yet</p>
          <p className="text-xs">Create your first case study.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((study) => (
            <div key={study.id} className="flex items-center gap-3 p-3 rounded-lg border border-border/60 hover:border-border hover:bg-accent/20 transition-all group">
              <div className="w-9 h-9 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
                <Briefcase size={16} className="text-violet-500" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">{study.title}</p>
                  <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-medium text-muted-foreground shrink-0">{study.industry}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{fullDate(study.createdAt)}</span>
                  <span>·</span>
                  <span>{study.client}</span>
                  <span>·</span>
                  <span className={study.published ? "text-emerald-500" : "text-amber-500"}>
                    {study.published ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                <button
                  onClick={() => handleToggle(study.id, study.published)}
                  className="p-1.5 rounded-md text-muted-foreground/40 hover:text-foreground hover:bg-accent"
                >
                  {study.published ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
                <button
                  onClick={() => handleEdit(study.id)}
                  className="p-1.5 rounded-md text-muted-foreground/40 hover:text-foreground hover:bg-accent"
                >
                  <Pencil size={13} />
                </button>
                <button
                  onClick={() => handleDelete(study.id)}
                  className="p-1.5 rounded-md text-muted-foreground/40 hover:text-red-500 hover:bg-red-500/10"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
