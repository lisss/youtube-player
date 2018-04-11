import { BehaviorSubject } from 'rxjs'
import { Video } from '.'
import { Option, None } from 'funfix'

const URL = 'https://www.googleapis.com/youtube/v3'
const DEVELOPER_KEY = 'AIzaSyCIE-kYpDnEGVHFqTvBkOUVMQG6Lep4fT0'

export class SearchModel {
  searchResults = new BehaviorSubject<Video[]>([])
  currentVideo = new BehaviorSubject<Video>(null)

  search(searchString: string): Promise<Response> {
    return fetch(
      `${URL}/search?part=snippet&q=${searchString}&key=${DEVELOPER_KEY}&order=relevance&maxResults=3`
    )
  }

  getStats(videoId: string): Promise<Response> {
    return fetch(`${URL}/videos?part=statistics&id=${videoId}&key=${DEVELOPER_KEY}&order=relevance`)
  }
}
