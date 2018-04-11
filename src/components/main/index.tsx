import * as React from 'react'
import { Search } from '../search'
import { Player } from '../player'
import { SearchModel } from '../search'
import { WatchHistory } from '../history'
import { HistoryModel } from '../history/history-model'
import './index.css'

export class Main extends React.Component<{}, {}> {
  render() {
    const searchModel = new SearchModel()
    const historyModel = new HistoryModel(searchModel)

    return (
      <div className="mainContainer">
        <Search {...{ searchModel }} />
        <div className="playerContainer">
          <WatchHistory {...{ searchModel, historyModel }} />
          <Player {...{ searchModel }} />
        </div>
      </div>
    )
  }
}
