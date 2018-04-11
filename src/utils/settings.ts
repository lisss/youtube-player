import { Option, None } from 'funfix'

export const HISTORY_PREFIX = 'ytp-'

export namespace UserSettings {
  const ls = window.localStorage

  export const read = <T extends {}>(key: string): Option<T> => {
    try {
      const item = ls.getItem(key)
      return item ? Option.of(JSON.parse(item)) : None
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
