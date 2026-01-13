import { Link } from 'react-router-dom'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { useSiteData } from '../data/siteData'
import './Blog.css'

function Blog() {
  const { posts } = useSiteData()
  const [ref, isVisible] = useScrollAnimation(0.1)

  return (
    <section className="blog-page">
      <div ref={ref} className={`section-container ${isVisible ? 'animate-in' : ''}`}>
        <h1 className="page-title">Blog</h1>
        <p className="page-intro">Thoughts, tutorials, and random musings.</p>

        <div className="posts-list">
          {posts.length === 0 ? (
            <p className="no-posts">No posts yet. Check back soon!</p>
          ) : (
            posts.map((post, index) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="post-card"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <time className="post-date">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                <h2 className="post-title">{post.title}</h2>
                <p className="post-excerpt">{post.excerpt}</p>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export default Blog
