import { useState } from 'react';

export default function PostCard({ post, onEdit, onDelete, showToast }) {
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = async () => {
    if (!confirmDelete) {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
      return;
    }
    setDeleting(true);
    try {
      await onDelete(post._id);
    } catch (e) {
      showToast(e.message, 'error');
      setDeleting(false);
      setConfirmDelete(false);
    }
  };

  return (
    <div
      className="rounded-xl border overflow-hidden flex flex-col animate-fade-in"
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--card-border)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-40 object-cover"
        />
      )}

      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3
          className="font-semibold text-sm leading-snug line-clamp-2"
          style={{ color: 'var(--text)' }}
        >
          {post.title}
        </h3>
        <p
          className="text-xs leading-relaxed line-clamp-3 flex-1"
          style={{ color: 'var(--text-muted)' }}
        >
          {post.content}
        </p>

        <div
          className="flex items-center justify-between mt-1 pt-2 border-t"
          style={{ borderColor: 'var(--divider)' }}
        >
          {post.authorId?.name ? (
            <span
              className="px-2 py-0.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: 'var(--chip-bg)', color: 'var(--chip-text)' }}
            >
              {post.authorId.name}
            </span>
          ) : (
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Anonymous
            </span>
          )}
          <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="flex gap-2 mt-1">
          <button
            onClick={() => onEdit(post)}
            className="flex-1 py-1.5 rounded-lg text-xs font-medium border transition-all hover:opacity-75"
            style={{ borderColor: 'var(--primary)', color: 'var(--primary)', backgroundColor: 'transparent' }}
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="flex-1 py-1.5 rounded-lg text-xs font-medium transition-all"
            style={
              confirmDelete
                ? { backgroundColor: '#dc2626', color: '#fff' }
                : { backgroundColor: 'var(--bg-alt)', color: '#ef4444' }
            }
          >
            {deleting ? '...' : confirmDelete ? 'Confirm?' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
