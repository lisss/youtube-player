import { BehaviorSubject } from 'rxjs'
import { Video } from '../search'
import { UserSettings } from '../../utils/settings'
import { getVideoPrefix } from '../../utils/utils'
import { appConfig } from '../../base/config'
import { PlayerModel } from '../player/player-model'

export class HistoryModel {
  constructor(public playerModel: PlayerModel) {
    this.playerModel.currentVideo.filter(v => v !== null).subscribe(video => this.addVideo(video))
  }

  private _storedWatchHistory = UserSettings.getKeys()
    .filter(k => k.startsWith(appConfig.userSettings.historyPrefix))
    .map(k => UserSettings.read<Video>(k))

  items = new BehaviorSubject(this._storedWatchHistory)

  addVideo(video: Video) {
    if (!this._storedWatchHistory.some(i => i.id === video.id)) {
      this._storedWatchHistory.push(video)
      this.items.next(this._storedWatchHistory)
    }
  }

  removeVideo(video: Video) {
    UserSettings.remove(getVideoPrefix(video.id))

    this._storedWatchHistory.splice(this._storedWatchHistory.indexOf(video), 1)
    this.items.next(this._storedWatchHistory)
  }
}
