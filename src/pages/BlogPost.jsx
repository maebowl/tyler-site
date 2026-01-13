import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import './BlogPost.css'

// Sample blog posts content - you can replace with real content or fetch from an API
const postsContent = {
  'hello-world': {
    title: 'Hello World',
    date: '2026-01-12',
    content: `
      <p>Welcome to my blog! I'm excited to finally have a space to share my thoughts and projects.</p>

      <p>Here's what you can expect to find here:</p>

      <ul>
        <li>Updates on my Blender projects and 3D art</li>
        <li>Music recommendations and playlists</li>
        <li>Random thoughts and musings</li>
        <li>Maybe some tutorials if I figure out something cool</li>
      </ul>

      <p>Stay tuned for more posts coming soon!</p>
    `,
  },
}

function BlogPost() {
  const { slug } = useParams()
  const post = postsContent[slug]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  if (!post) {
    return (
      <section className="blog-post-page">
        <div className="section-container">
          <h1 className="page-title">Post Not Found</h1>
          <p className="page-intro">Sorry, that post doesn't exist.</p>
          <Link to="/blog" className="back-link">Back to Blog</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="blog-post-page">
      <div className="section-container">
        <Link to="/blog" className="back-link">Back to Blog</Link>
        <article className="post-content">
          <header className="post-header">
            <time className="post-date">
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </time>
            <h1 className="post-title">{post.title}</h1>
          </header>
          <div
            className="post-body"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </div>
    </section>
  )
}

export default BlogPost
