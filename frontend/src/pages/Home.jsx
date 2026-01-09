import React, { useEffect, useState } from 'react'
import { fetchPosts, fetchComments } from '../api'

function PostCard({post, onToggle}){
  return (
    <article className="post-card">
      <h3>{post.title}</h3>
      <p className="meta">By {post.author || 'Unknown'} • {new Date(post.createdAt||Date.now()).toLocaleDateString()}</p>
      <p className="excerpt">{post.content ? post.content.slice(0,200) + (post.content.length>200 ? '…' : '') : ''}</p>
      <div className="actions">
        <button onClick={()=>onToggle(post._id)}>Show comments</button>
      </div>
    </article>
  )
}

export default function Home(){
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [commentsByPost, setCommentsByPost] = useState({})

  useEffect(()=>{
    fetchPosts().then(r=>{
      setPosts(r.data || [])
    }).catch(()=>{}).finally(()=>setLoading(false))
  },[])

  const toggleComments = async (postId)=>{
    if(commentsByPost[postId]){
      setCommentsByPost(prev=>({ ...prev, [postId]: undefined }))
      return
    }
    try{
      const res = await fetchComments(`postId=${postId}`)
      setCommentsByPost(prev=>({ ...prev, [postId]: res.data || [] }))
    }catch(e){
      setCommentsByPost(prev=>({ ...prev, [postId]: [] }))
    }
  }

  return (
    <div>
      <h2 style={{marginTop:8, marginBottom:14}}>Latest posts</h2>
      {loading && <p>Loading...</p>}
      <div className="posts-grid">
        {posts.map((p,i)=> (
          <div key={p._id || i} className="post-wrap">
            <article className="post-card">
              <div className="thumb">{p.imageTitle || 'Post'}</div>
              <h3>{p.title}</h3>
              <p className="meta">By {p.author || 'Unknown'} • {new Date(p.createdAt||Date.now()).toLocaleDateString()}</p>
              <p className="excerpt">{p.content ? (p.content.slice(0,160) + (p.content.length>160 ? '…' : '')) : ''}</p>
              <div className="post-footer">
                <div className="tag">{(p.tags && p.tags[0]) || 'General'}</div>
                <div className="actions"><button onClick={()=>toggleComments(p._id)}>Comments</button></div>
              </div>
            </article>

            {commentsByPost[p._id] && (
              <div className="comments">
                <h4>Comments</h4>
                {commentsByPost[p._id].length === 0 && <p className="muted">No comments</p>}
                {commentsByPost[p._id].map(c=> (
                  <div className="comment" key={c._id}>
                    <p className="comment-meta">{c.author || 'Anonymous'} • {new Date(c.createdAt||Date.now()).toLocaleDateString()}</p>
                    <p>{c.text}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
