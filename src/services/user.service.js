import axios from "axios"

class User {
  url = 'http://localhost:3000/users'

  async createUser(data) {
    try {
      const users = await axios.get(this.url)

      if(users.data.find(user => user.login === data.login))
        throw new Error('Пользователь с таким логином уже сущуствует')

      data.role = 'user'
      data.posts = []
      return await axios.post(this.url, data)
    } catch (e) {
      console.warn(e)
      throw new Error(e.message)
    }
  }

  async getUser({ login, password }) {
    try {
      const user = await axios.get(`${this.url}?login=${login}&password=${password}`)

      if(!user.data || user.data.length === 0)
        throw new Error('Неправильный логин или пароль')

      return user
    } catch (e) {
      console.warn(e)
      throw new Error(e.message)
    }
  }
}

export const userService = new User()