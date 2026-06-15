import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TopRecentPosts from './components/TopRecentPosts';
import PostForm from './components/PostForm';
import PostCard from './components/PostCard';
import EditModal from './components/EditModal';
import * as api from './api';

export default function App() {
  const [tab, setTab] = useState('posts');
  const [dark, setDark] = useState(false);

  const [posts, setPosts] = useState([]);
  const [topPosts, setTopPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [topLoading, setTopLoading] = useState(true);
  const [postsError, setPostsError] = useState(null);

  const [editingPost, setEditingPost] = useState(null);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchPosts = async () => {
    try {
      setPostsLoading(true);
      setPostsError(null);
      const data = await api.getPosts();
      setPosts(Array.isArray(data) ? data : []);
    } catch (e) {
      setPostsError(e.message);
    } finally {
      setPostsLoading(false);
    }
  };

  const fetchTopPosts = async () => {
    try {
      setTopLoading(true);
      const data = await api.getTopRecentPosts();
      setTopPosts(Array.isArray(data) ? data : []);
    } catch {
      setTopPosts([]);
    } finally {
      setTopLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    fetchTopPosts();
  }, []);

  const handleCreate = async (formData) => {
    const result = await api.createPost(formData);
    if (!result.data) throw new Error(result.message || 'Failed to create post');
    setPosts((prev) => [result.data, ...prev]);
    setTopPosts((prev) => [result.data, ...prev].slice(0, 3));
    showToast('Post published!');
  };

  const handleDelete = async (id) => {
    await api.deletePost(id);
    setPosts((prev) => prev.filter((p) => p._id !== id));
    setTopPosts((prev) => prev.filter((p) => p._id !== id));
    showToast('Post deleted.');
  };

  const handleEdit = async (id, data) => {
    const result = await api.updatePost(id, data);
    if (!result.data) throw new Error(result.message || 'Update failed');
    const updater = (prev) => prev.map((p) => (p._id === id ? result.data : p));
    setPosts(updater);
    setTopPosts(updater);
    setEditingPost(null);
    showToast('Post updated!');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg)', color: 'var(--text)' }}>
      <Navbar tab={tab} setTab={setTab} dark={dark} setDark={setDark} />

      {toast && (
        <div
          className="fixed top-16 right-4 z-50 px-4 py-3 rounded-xl text-sm font-medium shadow-lg animate-fade-in"
          style={
            toast.type === 'error'
              ? { backgroundColor: '#fef2f2', color: '#dc2626', border: '1px solid #fca5a5' }
              : { backgroundColor: 'var(--primary-light)', color: 'var(--chip-text)', border: '1px solid var(--primary)' }
          }
        >
          {toast.msg}
        </div>
      )}

      <main className="max-w-5xl mx-auto px-4 py-8">
          <>
            <TopRecentPosts posts={topPosts} loading={topLoading} />

            <PostForm onSubmit={handleCreate} showToast={showToast} />

            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>
                  All Posts
                </h2>
                {!postsLoading && !postsError && (
                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{ backgroundColor: 'var(--chip-bg)', color: 'var(--chip-text)' }}
                  >
                    {posts.length} {posts.length === 1 ? 'post' : 'posts'}
                  </span>
                )}
              </div>

              {postsLoading ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="animate-pulse rounded-xl h-52"
                      style={{ backgroundColor: 'var(--bg-alt)' }}
                    />
                  ))}
                </div>
              ) : postsError ? (
                <div
                  className="p-8 rounded-xl text-center border"
                  style={{ borderColor: '#fca5a5', backgroundColor: '#fef2f2', color: '#dc2626' }}
                >
                  <p className="text-2xl mb-2">⚠</p>
                  <p className="font-semibold">Connection Error</p>
                  <p className="text-sm mt-1 opacity-80">{postsError}</p>
                  <p className="text-xs mt-1 opacity-60">
                    Make sure the Express server is running on port 5000.
                  </p>
                  <button
                    onClick={fetchPosts}
                    className="mt-4 px-5 py-2 rounded-lg text-sm font-medium"
                    style={{ backgroundColor: '#dc2626', color: '#fff' }}
                  >
                    Retry
                  </button>
                </div>
              ) : posts.length === 0 ? (
                <div
                  className="py-20 text-center rounded-xl border-2 border-dashed"
                  style={{ borderColor: 'var(--card-border)', color: 'var(--text-muted)' }}
                >
                  <p className="text-3xl mb-3">✦</p>
                  <p className="font-medium">No posts yet</p>
                  <p className="text-sm mt-1">Create the first one above!</p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {posts.map((post) => (
                    <PostCard
                      key={post._id}
                      post={post}
                      onEdit={setEditingPost}
                      onDelete={handleDelete}
                      showToast={showToast}
                    />
                  ))}
                </div>
              )}
            </section>
          </>
      </main>

      {editingPost && (
        <EditModal
          post={editingPost}
          onSave={handleEdit}
          onClose={() => setEditingPost(null)}
        />
      )}
    </div>
  );
}
