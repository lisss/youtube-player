import * as React from 'react'
import YouTube from 'react-youtube'
import { Observable } from 'rxjs'
import { Option, None, Some } from 'funfix'
import { SearchModel, SearchResult } from '../search'
import { UserSettings } from '../../utils/settings'
import { getVideoPrefix } from '../../utils/utils'

export class Player extends React.Component<
  { model: SearchModel },
  { video: Option<SearchResult> }
> {
  componentWillMount() {
    this.setState({ video: None }) //TODO: default state?
  }

  componentDidMount() {
    this.props.model.currentVideo.subscribe(video => this.setState({ video }))
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
        {vid.fold(
          () => <YouTube />,
          v => <YouTube videoId={v.id} opts={opts} onPlay={() => this._onPlay(v)} />
        )}
      </div>
    )
  }

  _onPlay(video: SearchResult) {
    UserSettings.write(getVideoPrefix(video.id), video)
  }
}
