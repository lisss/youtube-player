import { BehaviorSubject, Subject } from 'rxjs'
import { SearchResult } from '.'
import { Option, None } from 'funfix'

const URL = 'https://www.googleapis.com/youtube/v3'
const DEVELOPER_KEY = 'AIzaSyCIE-kYpDnEGVHFqTvBkOUVMQG6Lep4fT0'

export class SearchModel {
  searchResults = new BehaviorSubject<SearchResult[]>([])
  currentVideo = new BehaviorSubject<Option<SearchResult>>(None)
  removedVideo = new Subject<Option<SearchResult>>()

  search(searchString: string): Promise<Response> {
    return fetch(
      `${URL}/search?part=snippet&q=${searchString}&key=${DEVELOPER_KEY}&order=relevance&maxResults=3`
    )
  }

  getStats(videoId: string): Promise<Response> {
    return fetch(`${URL}/videos?part=statistics&id=${videoId}&key=${DEVELOPER_KEY}&order=relevance`)
  }
}
