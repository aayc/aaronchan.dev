import { useState, useEffect } from "react";
import Head from "next/head";

interface Post {
  slug: string;
  title: string;
  date: string;
  description?: string;
  content?: string;
  tags?: string[];
}

interface FieldError {
  field: string;
  message: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Editor state
  const [editing, setEditing] = useState<Post | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [formData, setFormData] = useState({
    slug: "",
    title: "",
    date: "",
    description: "",
    content: "",
  });
  const [saving, setSaving] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/posts", {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      } else {
        setError("Failed to fetch posts");
      }
    } catch {
      setError("Failed to fetch posts");
    }
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/admin/posts", {
        headers: { Authorization: `Bearer ${password}` },
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setIsAuthenticated(true);
        setPosts(data);
        sessionStorage.setItem("adminPassword", password);
      } else if (res.status === 401) {
        setError("Invalid password");
      } else {
        // Show the actual error (e.g., GitHub not configured)
        setError(data.error || "Failed to authenticate");
      }
    } catch {
      setError("Failed to authenticate");
    }
    setLoading(false);
  };

  const handleEdit = async (slug: string) => {
    setLoading(true);
    setFieldErrors({});
    try {
      const res = await fetch(`/api/admin/posts?slug=${slug}`, {
        headers: { Authorization: `Bearer ${password}` },
      });
      if (res.ok) {
        const post = await res.json();
        setEditing(post);
        setIsNew(false);
        setFormData({
          slug: post.slug,
          title: post.title,
          date: post.date,
          description: post.description || "",
          content: post.content || "",
        });
      }
    } catch {
      setError("Failed to load post");
    }
    setLoading(false);
  };

  const handleNew = () => {
    setIsNew(true);
    setEditing(null);
    setFieldErrors({});
    setError("");
    setFormData({
      slug: "",
      title: "",
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      description: "",
      content: "",
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setFieldErrors({});
    
    try {
      const res = await fetch("/api/admin/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${password}`,
        },
        body: JSON.stringify(formData),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setEditing(null);
        setIsNew(false);
        fetchPosts();
      } else {
        // Handle field-level errors
        if (data.errors && Array.isArray(data.errors)) {
          const errors: Record<string, string> = {};
          data.errors.forEach((err: FieldError) => {
            errors[err.field] = err.message;
          });
          setFieldErrors(errors);
        }
        setError(data.error || "Failed to save");
      }
    } catch {
      setError("Failed to save post");
    }
    setSaving(false);
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`Delete "${slug}"?`)) return;
    
    try {
      const res = await fetch(`/api/admin/posts?slug=${slug}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${password}` },
      });
      
      if (res.ok) {
        fetchPosts();
      } else {
        setError("Failed to delete post");
      }
    } catch {
      setError("Failed to delete post");
    }
  };

  const handleCancel = () => {
    setEditing(null);
    setIsNew(false);
    setFieldErrors({});
    setError("");
  };

  // Auto-generate slug from title
  const handleTitleChange = (title: string) => {
    setFormData((prev) => {
      const newData = { ...prev, title };
      // Only auto-generate slug for new posts and if slug is empty or matches previous auto-generated
      if (isNew && (!prev.slug || prev.slug === slugify(prev.title))) {
        newData.slug = slugify(title);
      }
      return newData;
    });
  };

  const slugify = (text: string) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .substring(0, 100);
  };

  // Check for saved session
  useEffect(() => {
    const saved = sessionStorage.getItem("adminPassword");
    if (saved) {
      setPassword(saved);
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts();
    }
  }, [isAuthenticated]);

  const inputClass = (field: string) =>
    `w-full px-4 py-2 border rounded-lg bg-white/50 focus:outline-none focus:ring-2 ${
      fieldErrors[field]
        ? "border-red-400 focus:ring-red-300"
        : "border-[var(--color-border)] focus:ring-[var(--color-accent)]"
    }`;

  // Login screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Head>
          <title>Admin — Aaron Chan</title>
        </Head>
        <form onSubmit={handleLogin} className="w-full max-w-sm p-8">
          <h1 className="text-2xl font-heading font-semibold mb-6">Admin</h1>
          {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 border border-[var(--color-border)] rounded-lg mb-4 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
            autoFocus
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[var(--color-text)] text-white rounded-lg font-heading font-medium hover:bg-[var(--color-accent)] transition-colors disabled:opacity-50"
          >
            {loading ? "..." : "Login"}
          </button>
        </form>
      </div>
    );
  }

  // Editor screen
  if (editing || isNew) {
    return (
      <div className="min-h-screen">
        <Head>
          <title>{isNew ? "New Post" : `Edit: ${editing?.title}`} — Admin</title>
        </Head>
        <main className="max-w-4xl mx-auto px-6 py-16">
          <button
            onClick={handleCancel}
            className="text-sm text-muted hover:text-text transition-colors mb-8"
          >
            ← Back to posts
          </button>
          
          <h1 className="text-2xl font-heading font-semibold mb-8">
            {isNew ? "New Post" : "Edit Post"}
          </h1>
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm font-medium">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSave} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Post Title"
                className={inputClass("title")}
              />
              {fieldErrors.title && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.title}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Slug</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
                  placeholder="my-post-slug"
                  className={inputClass("slug")}
                  disabled={!!editing}
                />
                {fieldErrors.slug && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.slug}</p>
                )}
                {isNew && !fieldErrors.slug && (
                  <p className="mt-1 text-xs text-muted">Auto-generated from title. Edit if needed.</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Date</label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  placeholder="January 5, 2026"
                  className={inputClass("date")}
                />
                {fieldErrors.date && (
                  <p className="mt-1 text-sm text-red-600">{fieldErrors.date}</p>
                )}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Description <span className="text-muted font-normal">(optional)</span>
              </label>
              <input
                type="text"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Brief description for previews"
                className={inputClass("description")}
              />
              {fieldErrors.description && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.description}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Content (MDX)</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your post content here...

# Heading

Paragraph text with **bold** and *italic*.

- Bullet point
- Another point

```javascript
const code = 'highlighted';
```"
                rows={20}
                className={`${inputClass("content")} font-mono text-sm`}
              />
              {fieldErrors.content && (
                <p className="mt-1 text-sm text-red-600">{fieldErrors.content}</p>
              )}
            </div>
            
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2 bg-[var(--color-text)] text-white rounded-lg font-heading font-medium hover:bg-[var(--color-accent)] transition-colors disabled:opacity-50"
              >
                {saving ? "Committing to GitHub..." : "Save & Publish"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-[var(--color-border)] rounded-lg font-heading font-medium hover:bg-white/50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </main>
      </div>
    );
  }

  // Posts list
  return (
    <div className="min-h-screen">
      <Head>
        <title>Admin — Aaron Chan</title>
      </Head>
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-heading font-semibold">Posts</h1>
          <button
            onClick={handleNew}
            className="px-4 py-2 bg-[var(--color-text)] text-white rounded-lg font-heading font-medium hover:bg-[var(--color-accent)] transition-colors"
          >
            + New Post
          </button>
        </div>
        <p className="text-sm text-muted mb-8">
          Changes are committed to GitHub and trigger a site rebuild.
        </p>
        
        {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}
        
        {loading ? (
          <p className="text-muted">Loading...</p>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 text-muted">
            <p>No posts yet.</p>
            <p className="mt-2">Create your first post to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {posts.map((post) => (
              <div
                key={post.slug}
                className="p-4 border border-[var(--color-border)] rounded-lg bg-white/30 flex items-center justify-between"
              >
                <div>
                  <h2 className="font-heading font-medium">{post.title}</h2>
                  <p className="text-sm text-muted mt-1">{post.date} · /{post.slug}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(post.slug)}
                    className="px-3 py-1 text-sm border border-[var(--color-border)] rounded hover:bg-white/50 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(post.slug)}
                    className="px-3 py-1 text-sm border border-red-300 text-red-600 rounded hover:bg-red-50 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-12 pt-8 border-t border-[var(--color-border)]">
          <button
            onClick={() => {
              sessionStorage.removeItem("adminPassword");
              setIsAuthenticated(false);
              setPassword("");
            }}
            className="text-sm text-muted hover:text-text transition-colors"
          >
            Logout
          </button>
        </div>
      </main>
    </div>
  );
}

