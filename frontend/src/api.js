const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000'

async function request(path, opts = {}){
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...opts
  })
  const json = await res.json().catch(()=>null)
  if(!res.ok) throw json || { message: 'Network error' }
  return json
}

export const fetchPosts = (query='') => request(`/posts/getAllPosts${query ? ('?'+query) : ''}`)
export const fetchComments = (query='') => request(`/comments/getAllComments${query ? ('?'+query) : ''}`)
export const register = (payload) => request(`/auth/registerUser`, { method: 'POST', body: JSON.stringify(payload) })
export const login = (payload) => request(`/auth/login`, { method: 'POST', body: JSON.stringify(payload) })

export default { fetchPosts, fetchComments, register, login }
