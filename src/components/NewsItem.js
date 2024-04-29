import React, { Component } from 'react'

export class NewsItem extends Component {


  render() {
    let { title, description,imageUrl,newsUrl} = this.props
    return (
      <div className='my-3'>
        <div className="card" style={{ width: "18rem" }}>
          <img src={!imageUrl?"https://a3.espncdn.com/combiner/i?img=%2Fphoto%2F2019%2F0111%2Fr487507_1296x729_16%2D9.jpg":imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <a href={newsUrl} target="noreferrer" className="btn btn-sm btn-dark">click to expand!</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
