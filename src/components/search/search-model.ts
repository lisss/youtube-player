import { BehaviorSubject } from 'rxjs'
import { Video } from '.'
import { appConfig } from '../../base/config'

export class SearchModel {
  searchResults = new BehaviorSubject<Video[]>([])
  currentVideo = new BehaviorSubject<Video>(null)

  private _url = appConfig.urls.youtubeUrl
  private _key = appConfig.appSettings.googleDevKey

  search(searchString: string): Promise<Response> {
    return fetch(
      `${this._url}/search?part=snippet&q=${searchString}&key=${
        this._key
      }&order=relevance&maxResults=3`
    )
  }

  getStats(videoId: string): Promise<Response> {
    return fetch(
      `${this._url}/videos?part=statistics&id=${videoId}&key=${this._key}&order=relevance`
    )
  }
}
