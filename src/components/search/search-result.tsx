import * as React from 'react'
import { Observable, Subscription } from 'rxjs'
import { SearchModel } from './search-model'
import { ESC_CODE } from '../../utils/strings'

export interface Video {
  id: string
  name: string
  thumbnailUrl: string
  likes: number
}

export class SearchResults extends React.Component<
  { results: Video[]; model: SearchModel },
  { visible: boolean }
> {
  private _subs: Subscription[] = []

  componentWillMount() {
    this.setState({ visible: true })
  }

  componentDidMount() {
    const shouldHideOnClick = Observable.fromEvent<KeyboardEvent>(document, 'click').filter(e => {
      const list = document.getElementById('searchList')
      if (list) {
        return e.srcElement.id === 'playBtn' || !list.contains(e.srcElement)
      }
    })

    this._subs.push(
      this.props.model.searchResults.subscribe(() => this._show()),
      Observable.of(this.state.visible)
        .switchMap<boolean, KeyboardEvent>(
          visible => (visible ? Observable.fromEvent(document, 'keydown') : Observable.empty())
        )
        .filter(e => e.keyCode === ESC_CODE)
        .merge(shouldHideOnClick)
        .subscribe(() => this._hide())
    )
  }

  componentWillUnmount() {
    this._subs.forEach(s => s.unsubscribe())
  }

  private _show() {
    this.setState({ visible: true })
  }

  private _hide() {
    this.setState({ visible: false })
  }

  render() {
    const res = this.props.results

    return (
      <div>
        {res &&
          this.state.visible && (
            <ul className="searchList" id="searchList">
              {res.map(r => (
                <li className="searchListItem" key={r.id}>
                  {
                    <div className="searchItem">
                      <img src={r.thumbnailUrl} />
                      <div className="itemDetails">
                        <div className="itemDescription">
                          <div className="itemTitle">{r.name}</div>
                          <div className="itemVotes">{r.likes} Votes</div>
                        </div>
                        <button
                          className="playBtn"
                          id="playBtn"
                          onClick={() => this.props.model.currentVideo.next(r)}
                        >
                          Play
                        </button>
                      </div>
                    </div>
                  }
                </li>
              ))}
            </ul>
          )}
      </div>
    )
  }
}
