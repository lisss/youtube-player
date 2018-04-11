import { Subject, BehaviorSubject } from 'rxjs'
import { Video, SearchModel } from '../search'
import { UserSettings, HISTORY_PREFIX } from '../../utils/settings'
import { getVideoPrefix } from '../../utils/utils'

export class HistoryModel {
  private _storedWatchHistory = UserSettings.getKeys()
    .filter(k => k.startsWith(HISTORY_PREFIX))
    .map(k => UserSettings.read<Video>(k))

  removedVideo = new Subject<Video>()
  items = new BehaviorSubject(this._storedWatchHistory)

  constructor(private _searchModel: SearchModel) {
    this._searchModel.currentVideo.filter(v => v !== null).subscribe(curr => {
      if (!this._storedWatchHistory.some(i => i.id === curr.id)) {
        this._storedWatchHistory.push(curr)
        this.items.next(this._storedWatchHistory)
      }
    })
  }

  addVideo(video: Video) {}

  removeVideo(video: Video) {
    UserSettings.remove(getVideoPrefix(video.id))

    const it = document.getElementById(video.id)
    it.classList.add('historyListItemHidden')

    this._storedWatchHistory.splice(this._storedWatchHistory.indexOf(video), 1)
    this.items.next(this._storedWatchHistory)
  }
}
