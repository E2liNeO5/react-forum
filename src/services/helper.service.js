class Helper {
  getDateFormat(time) {
    const month = time.getMonth() + 1 < 10 ? `0${time.getMonth() + 1}` : time.getMonth() + 1
    const seconds = time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds()
    return `${time.getDate()}.${month}.${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}:${seconds}`
  }
}

export const helper = new Helper()