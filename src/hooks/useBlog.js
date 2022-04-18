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
  const [blogStorage, setBlogStorage] = useState(getBlogState())
  const [views, setViews] = useState(blog.views)
  const [likes, setLikes] = useState(blog.likes)

  useEffect(() => {
    let timer
    if (blog) {
      if (!isViewed) {
        timer = setTimeout(async () => {
          const result = await viewBlogMutation(blog)
          setViews(prev => prev + 1)
          setBlogStorage({ ...blogStorage, views: [...blogStorage.views, result.id] })
          setIsViewed(true)
        }, 10000)
      }
    }

    return () => {
      clearTimeout(timer)
    }
  }, [blog, isViewed, blogStorage])

  useEffect(() => {
    setHasLiked(blogStorage.likes.some(id => id === blog?.id))

    localStorage.setItem(LOCAL_STORAGE_BLOG_KEY, JSON.stringify(blogStorage))
  }, [blogStorage, blog])

  const likeBlog = async () => {
    const result = await likeBlogMutation(blog)
    setLikes(prev => prev + 1)
    setBlogStorage({ ...blogStorage, likes: [...blogStorage.likes, result.id] })
  }

  const unlikeBlog = async () => {
    const result = await unlikeBlogMutation(blog)
    setLikes(prev => prev - 1)
    const filteredLikes = blogStorage.likes.filter(id => id !== result.id)
    setBlogStorage({ ...blogStorage, likes: filteredLikes })
  }

  const toggleLike = async () => {
    hasLiked ? unlikeBlog() : likeBlog()
  }

  return { hasLiked, toggleLike, likes, views }
}
