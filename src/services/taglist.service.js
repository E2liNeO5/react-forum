import axios from 'axios'

class TagList {
  url = 'http://localhost:3000/tags'

  async getTags() {
    try {
      const {data} = await axios.get(`${this.url}?_sort=name`)
      return data || []
    } catch (e) {
      console.warn(e)
      throw new Error(e.message)
    }
  }

  async createTag(data) {
    try {
      data = {
        ...data, post_amount: 0 
      }
      return await axios.post(this.url, data)
    } catch (e) {
      console.warn(e)
      throw new Error(e.message)
    }
  }

  async deleteTag(id) {
    try {
      return await axios.delete(`${this.url}/${id}`)
    } catch (e) {
      console.warn(e)
      throw new Error(e.message)
    }
  }

  async editTag({id, name}) {
    try { 
      const tag = await axios.get(`${this.url}/${id}`)
      if(!tag || !tag.data)
        throw new Error(`Тэг с id "${id}" не найден`)

      return await axios.put(`${this.url}/${id}`, { ...tag.data, name })
    } catch (e) {
      console.warn(e)
      throw new Error(e.message)
    }
  }
}

export const tagListService = new TagList()