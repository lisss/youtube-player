interface YoutubeVideoThumbnail {
  height: number
  url: string
  width: number
}

interface YoutubeSearchItem {
  kind: string
  etag: string
  id: {
    id: string
    videoId: string
  }
  snippet: {
    title: string
    thumbnails: {
      default: YoutubeVideoThumbnail
      high: YoutubeVideoThumbnail
      medium: YoutubeVideoThumbnail
    }
  }
}

interface YoutubeVideoStatistics {
  commentCount: string
  dislikeCount: string
  favoriteCount: string
  likeCount: string
  viewCount: string
}

interface YoutubeVideoItem {
  etag: string
  id: string
  kind: string
  statistics: YoutubeVideoStatistics
}

export interface YoutubeSearchResponse {
  items: YoutubeSearchItem[]
}

export interface YoutubVideoResponse {
  items: YoutubeVideoItem[]
}

export interface Video {
  id: string
  name: string
  thumbnailUrl: string
  likes: number
}
