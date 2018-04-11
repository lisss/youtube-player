import * as React from 'react'
import { Search } from '../search'
import { Player } from '../player'
import { SearchModel } from '../search'
import { WatchHistory } from '../history'
import './index.css'

export class Main extends React.Component<{}, {}> {
  render() {
    const searchModel = new SearchModel()

    return (
      <div className="mainContainer">
        <Search model={searchModel} />
        <div className="playerContainer">
          <WatchHistory model={searchModel} />
          <Player model={searchModel} />
        </div>
      </div>
    )
  }
}
