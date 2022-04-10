import { useEffect, useState } from 'react'

import { likeBlogMutation, unlikeBlogMutation, viewBlogMutation } from '~lib'

const LOCAL_STORAGE_BLOG_KEY = 'blog'

const getBlogState = () =>
  typeof window !== 'undefined' && localStorage.getItem(LOCAL_STORAGE_BLOG_KEY)
    ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_BLOG_KEY))
    : { views: [], likes: [] }

export const useBlog = blog => {
  const [hasLiked, setHasLiked] = useState(getBlogState().likes.some(id => id === blog?.id))
  const [isViewed, setIsViewed] = useState(getBlogState().views.some(id => id === blog.id))
  const [blogState, setBlogState] = useState(getBlogState())

  useEffect(() => {
    let timer
    if (blog) {
      if (!isViewed) {
        timer = setTimeout(async () => {
          const result = await viewBlogMutation(blog)
          setBlogState({ ...blogState, views: [...blogState.views, result.id] })
          setIsViewed(true)
        }, 10000)
      }
    }

    return () => {
      clearTimeout(timer)
    }
  }, [blog, isViewed, blogState])

  useEffect(() => {
    setHasLiked(blogState.likes.some(id => id === blog?.id))

    localStorage.setItem(LOCAL_STORAGE_BLOG_KEY, JSON.stringify(blogState))
  }, [blogState, blog])

  const likeBlog = async () => {
    const result = await likeBlogMutation(blog)
    setBlogState({ ...blogState, likes: [...blogState.likes, result.id] })
  }

  const unlikeBlog = async () => {
    const result = await unlikeBlogMutation(blog)

    const filteredLikes = blogState.likes.filter(id => id !== result.id)
    setBlogState({ ...blogState, likes: filteredLikes })
  }

  const toggleLike = async () => {
    hasLiked ? unlikeBlog() : likeBlog()
  }

  return { hasLiked, toggleLike, likes: blogState.likes.length, views: blogState.views.length }
}
