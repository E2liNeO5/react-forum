import axios from "axios"
import { tagListService } from "./taglist.service"

function findAuthor(users, id) {
  const author = users.find(user => user.id === id)
  if(!author)
    throw new Error('Пользователь не найден')
  return author
}

const comments_limit = 1

class Posts {
  url_post = 'http://localhost:3000/posts'
  url_users = 'http://localhost:3000/users'
  url_comments = 'http://localhost:3000/comments'

  async getPosts() {
    try {
      const posts = await axios.get(this.url_post)
      const users = await axios.get(this.url_users)
      const comments = await axios.get(`${this.url_comments}?_limit=${comments_limit}`)

      const posts_data = posts.data.map(post => {
        const author = findAuthor(users.data, post.author)
        post.author = author.name

        if(post.comments.length > 0) {
          const post_comments = comments.data.filter(comment => post.comments.includes(comment.id))
          post.comments_count = post.comments.length
          post.comments = post_comments.map(comment => {
            const author = findAuthor(users.data, comment.author)
            comment.author = author.name
            return comment
          })
        } else
          post.comments_count = 0

        return post
      })

      return posts_data
    } catch (e) {
      console.warn(e)
      throw new Error(e.message)
    }
  }

  async getPostById(id) {
    try {
      let post = await axios.get(`${this.url_post}/${id}`)
      const tags = await tagListService.getTags()
      const users = await axios.get(this.url_users)
      const comments = await axios.get(this.url_comments)
      if(!post || !post.data)
        throw new Error(`Пост с id "${id}" не найден`)

      const post_data = post.data
      const author = findAuthor(users.data, post_data.author)
      post_data.author = author.name

      if(post_data.comments.length > 0) {
        const post_comments = comments.data.filter(comment => post_data.comments.includes(comment.id))
        post_data.comments_count = post_data.comments.length
        post_data.comments = post_comments.map(comment => {
          const author = findAuthor(users.data, comment.author)
          comment.author = author.name
          return comment
        })
      } else
        post_data.comments_count = 0

      post_data.tags_names = tags
      return post_data
    } catch (e) {
      console.warn(e)
      throw new Error(e.message)
    }
  }

  async getUsersPosts(user_id) {
    try {
      const posts = await axios.get(`${this.url_post}?author=${user_id}`)
      return posts.data
    } catch (e) {
      console.warn(e)
    }
  }
}

export const postsService = new Posts()