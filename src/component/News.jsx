import React, {useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News =(props)=> {
  
  const [articles,setArticle] = useState([])
  const [loading,setLoading] = useState(true)
  const [page,setPage] = useState(1)
  const [totalResults,setTotalResults] = useState(0)

  const capitalizeFirstLetter =(string)=>{
    return string[0].toUpperCase() + string.slice(1);
  }


const newsUpdate = async ()=>{
  props.setProgress(10);
  // const url = `https://newsapi.org/v2/top-headlines?country =${props.country}&category=${props.category}&apiKey=fe7dc4952957473688d443d9169b99d1&page =${page}&pageSize =${props.pageSize}`;
  const url = `https://newsapi.org/v2/top-headlines?country =${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
  setLoading(true);
  let data = await fetch(url);
  props.setProgress(30);
  let parsedData = await data.json();
  props.setProgress(70);
  // console.log(parsedData);
  setArticle(parsedData.articles);
  setTotalResults(parsedData.totalResults);
  setLoading(false);
  props.setProgress(100);
}

useEffect(() => {
  document.title = `${capitalizeFirstLetter(props.category)}-NewsDesk`;
  newsUpdate();
   // eslint-disable-next-line
}, []);


  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country =${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    // const url = `https://newsapi.org/v2/top-headlines?country =${props.country}&category=${props.category}&apiKey=fe7dc4952957473688d443d9169b99d1&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page+1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setArticle(articles.concat(parsedData.articles));
    setTotalResults(parsedData.totalResults);
  };   

    return (
      <>
        <h1 className='text-center' style={{margin:'35px',marginTop:'90px'}}>NewsDesk - Top Headline On {capitalizeFirstLetter(props.category)}</h1>

        {loading &&<Spinner/>}
        <InfiniteScroll
          dataLength = {articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
        
        <div className="container">

        <div className="row">
        {articles.map((element)=>{
          return <div className="col-md-4" key={element.url}>
          <NewsItem  title ={element.title?element.title:" "} discription = {element.description ? element.description:" "} imgUrl ={element.urlToImage} newsUrl ={element.url} date={element.publishedAt} source={element.source.name} author={element.author}/>
          </div>
        })}
        </div>
 
        </div>
        </InfiniteScroll>
        </>
    )
}
// News.defaultProps = {
//   country:"in",
//   pageSize: 8,
//   category:"general"
// }

News.PropsType = {
  name: PropTypes.string,
  page : PropTypes.number,
  category: PropTypes.string,
}
export default News