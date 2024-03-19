import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";

const News = (props) => {
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState();

  useEffect(() => {
    setApiData(props?.category);
    // eslint-disable-next-line
  }, [props?.category]);

  const fetchMoreData = async () => {
    const data = await getApiData(props?.category);
    const other = [...articles, ...data?.articles];
    setArticles(other);
  };
  const item = () => {
    return articles?.map((artile, length) => (
      <div className="col-md-3 m-2" key={`${length}${artile?.url}`}>
        <NewsItem
          title={artile?.title?.slice(0, 20)}
          desc={artile?.description?.slice(0, 50)}
          url={artile?.urlToImage}
          newsUrl={artile?.url}
        ></NewsItem>
      </div>
    ));
  };
  const setApiData = async (category) => {
    const parsedData = await getApiData(category);
    setArticles(parsedData?.articles);
    setTotalResults(parsedData?.totalResults);
  };

  const getApiData = async (category) => {
    setPage(page + 1);
    let apiKey =
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=a0ceb7a3cdfc417bb0746b53995c1d24";
    let key = `${apiKey}&page=${page + 1}&category=${
      category ?? "general"
    }&pageSize=20`;
    if (category === "everthing") {
      apiKey =
        "https://newsapi.org/v2/everything?q=politics&apiKey=a0ceb7a3cdfc417bb0746b53995c1d24";
      key = `${apiKey}&page=${page + 1}&pageSize=20`;
    }
    const data = await fetch(key);
    return data?.json();
  };

  return (
    <div className="container" style={{ marginTop: "90px" }}>
      <h4>Top News</h4>
      <InfiniteScroll
        dataLength={articles?.length}
        next={fetchMoreData}
        hasMore={articles?.length <= totalResults}
        loader={<Spinner />}
      >
        <div className="row">
          <>{item()}</>
        </div>
      </InfiniteScroll>
    </div>
  );
};
News.defaultProps = {
  country: "in",
  category: "general",
};
News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
};
export default News;
