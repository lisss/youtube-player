import * as React from 'react'
import { SearchModel, Video } from '../search'
import { HistoryModel } from './history-model'
import './index.css'

export class WatchHistory extends React.Component<
  { searchModel: SearchModel; historyModel: HistoryModel },
  { history: Video[] }
> {
  componentWillMount() {
    this.setState({ history: [] })
  }

  componentDidMount() {
    this.props.historyModel.items.subscribe(items => this.setState({ history: items }))
  }

  render() {
    const containerClass = `historyContainer ${
      this.state.history.length > 0 ? 'historyEnabled' : 'historyDisabled'
    }`

    return (
      <div className={containerClass}>
        <div className="historyTitle">Watch History</div>
        <div className="scrollTop" />
        <ul className="historyList">
          {this.state.history.map(
            it =>
              it ? (
                <li key={it.id} id={it.id}>
                  <div className="historyListItem">
                    <span
                      className="historyItemDetails"
                      title="Click to play"
                      onClick={() => this.props.searchModel.currentVideo.next(it)}
                    >
                      {it.name}
                    </span>
                    <a
                      className="deleteBtn"
                      onClick={() => this.props.historyModel.removeVideo(it)}
                    >
                      Delete
                    </a>
                  </div>
                </li>
              ) : null
          )}
        </ul>
        <div className="scrollBottom" />
      </div>
    )
  }
}
