import React, { Component } from 'react'

export class NewsItem extends Component {


  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props
    return (
      <div className='my-3'>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
            <span className=" badge rounded-pill bg-danger"> {source}</span>
          </div>
          
          <img src={!imageUrl ? "https://a3.espncdn.com/combiner/i?img=%2Fphoto%2F2019%2F0111%2Fr487507_1296x729_16%2D9.jpg" : imageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}  <span className="badge bg-secondary">New</span> </h5>
            <p className="card-text">{description}</p>
            <p className='card-text'><small className='text-muted'>By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} target="noreferrer" className="btn btn-sm btn-dark">click to expand!</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
