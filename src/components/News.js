import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general"
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string

  }

  constructor() {
    super()
    console.log("Hello i am a constructor from news component")
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0

    }
  }

  async updateNews() {
    console.log("cdm")
    this.props.setProgress(10)
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=6fcc4c3e572641a1a82dbe9573cd2131&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    this.props.setProgress(30)
    let parsedData = await data.json()
    this.props.setProgress(70)
    console.log(parsedData)
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100)


  }



  async componentDidMount() {
    this.updateNews()
  }


  handlePrevClick = async () => {
   

    this.setState({ page: this.state.page - 1 });
    this.updateNews();



  }

  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 })

  }

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 })
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=6fcc4c3e572641a1a82dbe9573cd2131&page=${this.state.page}&pageSize=${this.props.pageSize}`
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults
    })

  };


  render() {
    console.log("rendering")
    return (
      <>
        <h1 className="text-center" style={{ margin: '30px 0px' }}>News1 - Top headlines</h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >

          <div className="container">

            <div className="row">
              {this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>

              })}
            </div>

          </div>
        </InfiniteScroll>


      </>
    )
  }
}

export default News
