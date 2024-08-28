class Storage {
  set(key, data) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  get(key) {
    return JSON.parse(localStorage.getItem(key))
  }

  update(key, data) {
    const currentData = this.get(key)

    if(!currentData)
      return

    for(k in data) {
      currentData[k] = data[k]
    }

    this.set(ket, currentData)
  }

  delete(key) {
    localStorage.removeItem(key)
  }
}

export const storageService = new Storage()