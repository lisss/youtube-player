import { Option } from 'funfix'
import { HISTORY_PREFIX } from './settings'

export const getVideoPrefix = (id: string) => HISTORY_PREFIX + id

export const isOptionEqual = (a: Option<any>, b: Option<any>) => {
  return (a.isEmpty() && b.isEmpty()) || (a.isEmpty() || b.isEmpty()) || a.get().id === b.get().id
}
