"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText, Plus, Trash2, RefreshCw, ArrowLeft,
  Eye, EyeOff, ExternalLink, Pencil,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  getBlogPosts, createBlogPost, updateBlogPost,
  deleteBlogPost, toggleBlogPost, getBlogPost,
} from "@/app/actions/blog";
import type { BlogPost } from "@/lib/types";

type View = "list" | "edit";

const CATEGORIES = ["SEO", "GEO", "AI", "Web Design", "Lead Generation", "WhatsApp", "Marketing", "Other"];

function fullDate(date: Date) {
  return new Date(date).toLocaleString("en-US", {
    month: "short", day: "numeric", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<View>("list");
  const [editId, setEditId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const formDefaults = { title: "", slug: "", excerpt: "", content: "", category: "SEO", image: "", author: "Agyiri Sakyi", published: false };
  const [form, setForm] = useState(formDefaults);
  const [saving, setSaving] = useState(false);

  async function fetchPosts() {
    setLoading(true);
    const res = await getBlogPosts();
    if (res.success) setPosts(res.data as BlogPost[]);
    setLoading(false);
  }

  useEffect(() => { fetchPosts(); }, []);

  async function handleEdit(id: string) {
    setEditId(id);
    const res = await getBlogPost(id);
    if (res.success && res.data) {
      const p = res.data as BlogPost;
      setForm({ title: p.title, slug: p.slug, excerpt: p.excerpt, content: p.content, category: p.category, image: p.image, author: p.author, published: p.published });
    }
    setView("edit");
  }

  function handleNew() {
    setEditId(null);
    setForm(formDefaults);
    setView("edit");
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.set(k, String(v)));
    const res = editId ? await updateBlogPost(editId, fd) : await createBlogPost(fd);
    setSaving(false);
    if (res.success) { setView("list"); fetchPosts(); }
  }

  async function handleToggle(id: string, published: boolean) {
    await toggleBlogPost(id, !published);
    setPosts((p) => p.map((post) => post.id === id ? { ...post, published: !published } : post));
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this post?")) return;
    await deleteBlogPost(id);
    setPosts((p) => p.filter((post) => post.id !== id));
  }

  const q = search.toLowerCase();
  const filtered = posts.filter((p) =>
    [p.title, p.excerpt, p.category, p.author].some((f) => f.toLowerCase().includes(q))
  );

  if (view === "edit") {
    return (
      <div className="min-h-screen bg-background p-4 sm:p-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => setView("list")} className="p-1.5 rounded-md text-muted-foreground hover:bg-accent">
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-semibold">{editId ? "Edit Post" : "New Post"}</h1>
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
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Excerpt</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              required
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 min-h-[60px]"
            />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground mb-1 block">Content (HTML)</label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
              className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30 min-h-[300px] font-mono"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              >
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground mb-1 block">Author</label>
              <Input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
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
              {saving ? "Saving..." : editId ? "Update Post" : "Create Post"}
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
          <h1 className="text-lg font-semibold">Blog Posts</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={fetchPosts} className="p-2 rounded-lg text-muted-foreground hover:bg-accent">
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
          </button>
          <Button onClick={handleNew} size="sm" className="gap-1.5 text-xs h-8">
            <Plus size={13} /> New Post
          </Button>
        </div>
      </div>

      <div className="relative mb-4 max-w-xs">
        <Input
          placeholder="Search posts..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 text-xs"
        />
      </div>

      {loading ? (
        <div className="space-y-2">{[1, 2, 3].map((i) => <div key={i} className="h-16 bg-muted rounded-lg animate-pulse" />)}</div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center py-24 text-muted-foreground">
          <FileText size={28} className="mb-3" />
          <p className="text-sm font-medium mb-1">No posts yet</p>
          <p className="text-xs">Create your first blog post.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((post) => (
            <div key={post.id} className="flex items-center gap-3 p-3 rounded-lg border border-border/60 hover:border-border hover:bg-accent/20 transition-all group">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <FileText size={16} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium truncate">{post.title}</p>
                  <span className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-medium text-muted-foreground shrink-0">{post.category}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{fullDate(post.createdAt)}</span>
                  <span>·</span>
                  <span>{post.author}</span>
                  <span>·</span>
                  <span className={post.published ? "text-emerald-500" : "text-amber-500"}>
                    {post.published ? "Published" : "Draft"}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all">
                <button
                  onClick={() => handleToggle(post.id, post.published)}
                  className="p-1.5 rounded-md text-muted-foreground/40 hover:text-foreground hover:bg-accent"
                  title={post.published ? "Unpublish" : "Publish"}
                >
                  {post.published ? <EyeOff size={13} /> : <Eye size={13} />}
                </button>
                <button
                  onClick={() => handleEdit(post.id)}
                  className="p-1.5 rounded-md text-muted-foreground/40 hover:text-foreground hover:bg-accent"
                >
                  <Pencil size={13} />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
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
