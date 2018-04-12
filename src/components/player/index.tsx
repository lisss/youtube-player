import * as React from 'react'
import YouTube from 'react-youtube'
import { Observable } from 'rxjs'
import { PlayerModel } from './player-model'
import { SearchModel, Video } from '../search'
import { UserSettings } from '../../utils/settings'
import { getVideoPrefix } from '../../utils/utils'

export class Player extends React.Component<{ playerModel: PlayerModel }, { video: Video }> {
  componentWillMount() {
    this.setState({ video: null })
  }

  componentDidMount() {
    this.props.playerModel.currentVideo.subscribe(video => this.setState({ video }))
  }

  render() {
    const opts = {
      height: '360',
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
