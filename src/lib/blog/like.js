import { mutation } from '../request'

export const likeBlogMutation = async blog =>
  mutation.put('api/blogs', blog.id, {
    data: { likes: blog.likes + 1 },
  })

export const unlikeBlogMutation = async blog =>
  await mutation.put('api/blogs', blog.id, {
    data: { likes: blog.likes - 1 },
  })
