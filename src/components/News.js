import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {

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
    let url = "https://newsapi.org/v2/top-headlines?country=us&apiKey=6fcc4c3e572641a1a82dbe9573cd2131&page=1&pageSize=20"
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData)
    this.setState({ articles: parsedData.articles,totalResults:parsedData.totalResults})
  }


  handlePrevClick = async () => {
    console.log("previous")

    let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=6fcc4c3e572641a1a82dbe9573cd2131&page=${this.state.page - 1}&pageSize=20`
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
    if(this.state.page+1 > Math.ceil(this.state.totalResults/20)){

    }
    else{   
      let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=6fcc4c3e572641a1a82dbe9573cd2131&page=${this.state.page + 1}&pageSize=20`
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData)
      
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles
      })
    }
      
  }

  render() {
    return (
      <div className="container my-3">
        <h2>News1 - Top headlines</h2>

        <div className="row">
          {this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} />
            </div>

          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
          <button type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr; </button>

        </div>

      </div>
    )
  }
}

export default News
