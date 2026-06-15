export default function TopRecentPosts({ posts, loading }) {
  if (loading) {
    return (
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <h2 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>
            Top Recent Posts
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="animate-pulse rounded-xl h-28"
              style={{ backgroundColor: 'var(--bg-alt)' }}
            />
          ))}
        </div>
      </section>
    );
  }

  if (!posts.length) return null;

  return (
    <section className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-xl font-semibold" style={{ color: 'var(--text)' }}>
          Top Recent Posts
        </h2>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post._id}
            className="rounded-xl border p-4 animate-fade-in"
            style={{
              backgroundColor: 'var(--primary-light)',
              borderColor: 'var(--primary)',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-20 object-cover rounded-lg mb-2"
              />
            )}
            <h3
              className="font-semibold text-sm line-clamp-1 mb-1"
              style={{ color: 'var(--text)' }}
            >
              {post.title}
            </h3>
            <p className="text-xs line-clamp-2" style={{ color: 'var(--text-muted)' }}>
              {post.content}
            </p>
            <p className="text-xs mt-2 font-medium" style={{ color: 'var(--primary-dark)' }}>
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
