import { appConfig } from '../base/config'

export const getVideoPrefix = (id: string) => appConfig.userSettings.historyPrefix + id
