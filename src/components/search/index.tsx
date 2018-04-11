import * as React from 'react'
import { Observable, Subscription } from 'rxjs'
import { SearchModel } from './search-model'
import { Video, SearchResults } from './search-result'

export { SearchModel, Video }

import './index.css'

export class Search extends React.Component<
  { searchModel: SearchModel },
  { searchString: string; searchResults: Video[] }
> {
  componentWillMount() {
    this.setState({ searchString: '', searchResults: [] })
  }

  componentDidMount() {
    this.props.searchModel.searchResults.subscribe(res => {
      this.setState({
        searchString: this.state.searchString,
        searchResults: res
      })
    })
  }

  render() {
    const { searchModel } = this.props

    const updateInput = (searchString: string) => {
      if (!searchString) {
        this.props.searchModel.searchResults.next([])
        this.setState({ searchString })
        return
      }
      this.setState({ searchString })
      searchModel.search(searchString).then(res => {
        res
          .json()
          .then(resJson =>
            resJson.items.filter(item => item.id.videoId !== undefined).map(item => {
              return searchModel.getStats(item.id.videoId).then(stats =>
                stats.json().then(res => {
                  return {
                    id: item.id.videoId,
                    name: item.snippet.title,
                    thumbnailUrl: item.snippet.thumbnails.default.url,
                    likes: res.items[0].statistics.likeCount
                  } as Video
                })
              )
            })
          )
          .then(async res => {
            const searchResults = (await Promise.all(res)) as any // TODO: types!
            this.props.searchModel.searchResults.next(searchResults)
          })
      })
    }

    return (
      <div className="searchContainer">
        <input
          className="searchInput"
          id="searchInput"
          placeholder="Search on YouTube..."
          value={this.state.searchString}
          onChange={x => updateInput(x.currentTarget.value)}
        />
        {this.state.searchResults.length > 0 && (
          <SearchResults results={this.state.searchResults} model={this.props.searchModel} />
        )}
      </div>
    )
  }
}

export class Overlay extends React.Component<{ visible?: boolean }, {}> {
  render() {
    return this.props.visible ? <div className="overlay" /> : null
  }
}
