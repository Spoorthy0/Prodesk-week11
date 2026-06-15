import { useState, useEffect } from 'react';

export default function EditModal({ post, onSave, onClose }) {
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setTitle(post.title);
    setContent(post.content);
    setError('');
  }, [post._id]);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      setError('Title and content are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await onSave(post._id, { title: title.trim(), content: content.trim() });
    } catch (e) {
      setError(e.message);
      setSaving(false);
    }
  };

  const inputStyle = {
    borderColor: 'var(--card-border)',
    backgroundColor: 'var(--input-bg)',
    color: 'var(--text)',
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="w-full max-w-md rounded-2xl p-6 flex flex-col gap-4 animate-fade-in"
        style={{
          backgroundColor: 'var(--card)',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--card-border)',
        }}
      >
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-base" style={{ color: 'var(--text)' }}>
            Edit Post
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-lg transition-all hover:opacity-70"
            style={{ backgroundColor: 'var(--bg-alt)', color: 'var(--text-muted)' }}
          >
            ×
          </button>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
            Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none"
            style={inputStyle}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
            Content
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={5}
            className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none resize-none"
            style={inputStyle}
          />
        </div>

        {error && (
          <p
            className="text-xs px-3 py-2 rounded-lg"
            style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}
          >
            {error}
          </p>
        )}

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-lg text-sm border transition-all hover:opacity-80"
            style={{ borderColor: 'var(--card-border)', color: 'var(--text-muted)' }}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all"
            style={{
              backgroundColor: saving ? 'var(--bg-alt)' : 'var(--primary)',
              color: saving ? 'var(--text-muted)' : '#1a0f00',
            }}
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
