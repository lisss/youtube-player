interface AppConfig {
  urls: {
    youtubeUrl: string
  }
  appSettings: {
    googleDevKey: string
  }
  userSettings: {
    historyPrefix: string
  }
}

export const appConfig: AppConfig = {
  urls: {
    youtubeUrl: 'https://www.googleapis.com/youtube/v3'
  },
  appSettings: {
    googleDevKey: 'AIzaSyCIE-kYpDnEGVHFqTvBkOUVMQG6Lep4fT0'
  },
  userSettings: {
    historyPrefix: 'ytp-'
  }
}
