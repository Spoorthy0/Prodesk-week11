import { useState, useRef } from 'react';

export default function PostForm({ onSubmit, showToast }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileRef = useRef();

  const handleImage = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const removeImage = () => {
    setFile(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      showToast('Title and content are required', 'error');
      return;
    }
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append('title', title.trim());
      fd.append('content', content.trim());
      fd.append('authorId', '6a227413f783ded92c3ab9cc'); // my user id. no auth is implemented,so hardcoded.
      if (file) fd.append('image', file);
      await onSubmit(fd);
      setTitle('');
      setContent('');
      removeImage();
      setOpen(false);
    } catch (e) {
      showToast(e.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    borderColor: 'var(--card-border)',
    backgroundColor: 'var(--input-bg)',
    color: 'var(--text)',
  };

  return (
    <div
      className="mb-8 rounded-xl border overflow-hidden"
      style={{
        borderColor: 'var(--card-border)',
        backgroundColor: 'var(--card)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full px-5 py-4 flex items-center justify-between text-sm font-medium transition-all hover:opacity-80"
        style={{ color: 'var(--text)' }}
      >
        <span>Create New Post</span>
        <span
          className="w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold"
          style={{ backgroundColor: 'var(--primary)', color: '#1a0f00' }}
        >
          {open ? '−' : '+'}
        </span>
      </button>

      {open && (
        <form
          onSubmit={handleSubmit}
          className="px-5 pb-5 flex flex-col gap-4 border-t"
          style={{ borderColor: 'var(--divider)' }}
        >
          <div className="pt-4 flex flex-col gap-1">
            <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              Title <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title..."
              className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none focus:ring-2"
              style={{ ...inputStyle, '--tw-ring-color': 'var(--primary)' }}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              Content <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content..."
              rows={4}
              className="w-full px-3 py-2.5 rounded-lg border text-sm outline-none resize-none"
              style={inputStyle}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
              Thumbnail{' '}
              <span className="font-normal" style={{ color: 'var(--text-muted)' }}>
                (optional · max 5MB)
              </span>
            </label>
            <div
              onClick={() => fileRef.current.click()}
              className="w-full rounded-lg border-2 border-dashed p-5 text-center cursor-pointer transition-all hover:opacity-80"
              style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--upload-bg)' }}
            >
              {preview ? (
                <img
                  src={preview}
                  alt="preview"
                  className="h-36 mx-auto object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <span className="text-2xl">🖼</span>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    Click to upload image
                  </p>
                </div>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
            </div>
            {file && (
              <button
                type="button"
                onClick={removeImage}
                className="text-xs self-end mt-1"
                style={{ color: '#ef4444' }}
              >
                Remove image
              </button>
            )}
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={() => { setOpen(false); removeImage(); setTitle(''); setContent(''); }}
              className="flex-1 py-2.5 rounded-lg text-sm border transition-all hover:opacity-80"
              style={{ borderColor: 'var(--card-border)', color: 'var(--text-muted)' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all"
              style={{
                backgroundColor: loading ? 'var(--bg-alt)' : 'var(--primary)',
                color: loading ? 'var(--text-muted)' : '#1a0f00',
              }}
            >
              {loading ? 'Publishing...' : 'Publish Post'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
