import React from 'react'

const NewsItem =(props)=> {

    let {title,discription,imgUrl,newsUrl,author,date,source} = props; // concept of destructuring in javascript
    return (
      <div className='my-3'>
        <div className="card">
        <div style = {
          {display:'flex', justifyContent:'flex-end',position:'absolute',right:'0'}
        }>
        <span className=" badge rounded-pill bg-danger">
            {source}
        </span>
        </div>
 
        <img src={imgUrl ? imgUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW2iWfzJuHuek02XJOI4w61AFwIeQ-_lLO5g&s"} className="card-img-top" alt="img"/>
            <div className="card-body">
              <h6 className="card-title">{title} </h6>
              <p className="card-text"> {discription}</p>
              <p className="card-text"><small className="text-body-secondary" >By {author ? author:"unknown"} On&nbsp;  
              {new Date(date).toGMTString()} </small></p>
              <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">read more</a>
            </div>
        </div>
      </div>
    )
}
export default NewsItem