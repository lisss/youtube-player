import * as React from 'react'
import { Observable, Subscription } from 'rxjs'
import { SearchModel } from './search-model'
import { SearchResult, SearchResults } from './search-result'

export { SearchModel, SearchResult }

import './index.css'

export class Search extends React.Component<
  { model: SearchModel },
  { searchString: string; searchResults: SearchResult[] }
> {
  componentWillMount() {
    this.setState({ searchString: '', searchResults: [] })
  }

  componentDidMount() {
    this.props.model.searchResults.subscribe(res => {
      this.setState({
        searchString: this.state.searchString,
        searchResults: res
      })
    })
  }

  render() {
    const { model } = this.props

    const updateInput = (searchString: string) => {
      if (!searchString) {
        this.props.model.searchResults.next([])
        this.setState({ searchString })
        return
      }
      this.setState({ searchString })
      model.search(searchString).then(res => {
        res
          .json()
          .then(resJson =>
            resJson.items.filter(item => item.id.videoId !== undefined).map(item => {
              return model.getStats(item.id.videoId).then(stats =>
                stats.json().then(res => {
                  return {
                    id: item.id.videoId,
                    name: item.snippet.title,
                    thumbnailUrl: item.snippet.thumbnails.default.url,
                    likes: res.items[0].statistics.likeCount
                  } as SearchResult
                })
              )
            })
          )
          .then(async res => {
            const searchResults = (await Promise.all(res)) as any // TODO: types!
            this.props.model.searchResults.next(searchResults)
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
          <SearchResults results={this.state.searchResults} model={this.props.model} />
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
