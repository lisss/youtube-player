import * as React from 'react'
import { Search } from '../search'
import { Player } from '../player'
import { SearchModel } from '../search'
import { WatchHistory } from '../history'
import { HistoryModel } from '../history/history-model'
import { PlayerModel } from '../player/player-model'
import './index.css'

export class Main extends React.Component<{}, {}> {
  render() {
    const playerModel = new PlayerModel()
    const searchModel = new SearchModel(playerModel)
    const historyModel = new HistoryModel(playerModel)

    return (
      <div className="mainContainer">
        <Search {...{ searchModel }} />
        <div className="playerContainer">
          <WatchHistory {...{ searchModel, historyModel }} />
          <Player {...{ playerModel }} />
        </div>
      </div>
    )
  }
}
