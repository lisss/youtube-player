export namespace UserSettings {
  const ls = window.localStorage

  export const read = <T extends {}>(key: string): T | undefined => {
    try {
      const item = ls.getItem(key)
      return item && JSON.parse(item)
    } catch (e) {
      console.error
    }
  }

  export const write = (key: string, data: any): void => {
    try {
      return ls.setItem(key, JSON.stringify(data))
    } catch (e) {
      console.error
    }
  }

  export const remove = (key: string): void => {
    try {
      ls.removeItem(key)
    } catch (e) {
      console.error
    }
  }

  export const getKeys = () => {
    try {
      return Object.keys(ls)
    } catch (e) {
      console.error
    }
  }
}
