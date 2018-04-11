import * as React from 'react'
import YouTube from 'react-youtube'
import { Observable } from 'rxjs'
import { Option, None, Some } from 'funfix'
import { SearchModel, Video } from '../search'
import { UserSettings } from '../../utils/settings'
import { getVideoPrefix } from '../../utils/utils'

export class Player extends React.Component<{ searchModel: SearchModel }, { video: Video }> {
  componentWillMount() {
    this.setState({ video: null }) //TODO: default state?
  }

  componentDidMount() {
    this.props.searchModel.currentVideo.subscribe(video => this.setState({ video }))
  }

  render() {
    const opts = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 1 as 1
      }
    }

    const vid = this.state.video

    return (
      <div>
        {vid ? (
          <YouTube videoId={vid.id} opts={opts} onPlay={() => this._onPlay(vid)} />
        ) : (
          <YouTube />
        )}
      </div>
    )
  }

  _onPlay(video: Video) {
    UserSettings.write(getVideoPrefix(video.id), video)
  }
}
