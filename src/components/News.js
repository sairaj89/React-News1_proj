import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'




export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category:"general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category:PropTypes.string

  }

  constructor() {
    super()
    console.log("Hello i am a constructor from news component")
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }



  async componentDidMount() {
    console.log("cdm")
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=6fcc4c3e572641a1a82dbe9573cd2131&page=1&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
  }


  handlePrevClick = async () => {
    console.log("previous")

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=6fcc4c3e572641a1a82dbe9573cd2131&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles
    })



  }

  handleNextClick = async () => {
    console.log("Next")
    if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)) {

    }
    else {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=6fcc4c3e572641a1a82dbe9573cd2131&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
      this.setState({ loading: true });
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData)

      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading: false
      })
    }

  }

  render() {
    console.log("rendering")
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{margin:'30px 0px'}}>News1 - Top headlines</h1>
        {this.state.loading && <Spinner />}

        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
            </div>

          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>

        </div>

      </div>
    )
  }
}

export default News
