import { mutation } from '../request'

export const viewBlogMutation = async blog =>
  mutation.put('api/blogs', blog.id, {
    data: { views: blog.views + 1 },
  })
