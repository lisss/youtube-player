import * as React from 'react'
import { BehaviorSubject, Observable } from 'rxjs'
import { Some, Option, None } from 'funfix'
import { UserSettings, HISTORY_PREFIX } from '../../utils/settings'
import { isOptionEqual, getVideoPrefix } from '../../utils/utils'
import { SearchModel, SearchResult } from '../search'
import './index.css'

const storedWatchHistory = UserSettings.getKeys()
  .filter(k => k.startsWith(HISTORY_PREFIX))
  .map(k => UserSettings.read<SearchResult>(k))

const history = []

export class WatchHistory extends React.Component<
  { model: SearchModel },
  { history: Option<SearchResult>[] }
> {
  componentWillMount() {
    this.setState({ history: storedWatchHistory })
  }

  // TODO: rewrite
  componentDidMount() {
    Observable.of(storedWatchHistory)
      .startWith(storedWatchHistory)
      .combineLatest(this.props.model.currentVideo.filter(v => !v.isEmpty()))
      .subscribe(([items, curr]) => {
        if (!items.some(i => isOptionEqual(i, curr))) items.push(curr)
        this.setState({ history: items })
      })

    this.props.model.removedVideo.subscribe(video => {
      const it = document.getElementById(video.get().id) //TODO: get rid of Option???
      it.classList.add('historyListItemHidden')
      this.state.history.splice(this.state.history.indexOf(video), 1)
      setTimeout(() => this.setState({ history: this.state.history }), 200)
    })
  }

  render() {
    return (
      <div className="historyContainer">
        <div className="historyTitle">Watch History</div>
        <ul className="historyList">
          {this.state.history.map(item =>
            item.fold(
              () => null,
              it => (
                <li key={it.id} id={it.id}>
                  <div className="historyListItem">
                    <span
                      className="historyItemDetails"
                      title="Click to play"
                      onClick={() => this.props.model.currentVideo.next(item)}
                    >
                      {it.name}
                    </span>
                    <a
                      className="deleteBtn"
                      onClick={() => {
                        UserSettings.remove(getVideoPrefix(it.id))
                        this.props.model.removedVideo.next(item)
                      }}
                    >
                      Delete
                    </a>
                  </div>
                </li>
              )
            )
          )}
        </ul>
      </div>
    )
  }
}
