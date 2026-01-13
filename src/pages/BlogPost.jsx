import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useSiteData } from '../data/siteData'
import './BlogPost.css'

function BlogPost() {
  const { slug } = useParams()
  const { posts } = useSiteData()
  const post = posts.find(p => p.slug === slug)

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
