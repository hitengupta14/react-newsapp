import React, { Component } from "react";
import NewsItem from "./NewsItem";
export class News extends Component {
  map = {
    indiaBusiness:
      "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=a0ceb7a3cdfc417bb0746b53995c1d24",
    techNews:
      "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=a0ceb7a3cdfc417bb0746b53995c1d24",
  };
  constructor() {
    super();
    this.state = { articles: [], loading: false };
  }

  async componentDidMount() {
    const apiKey = this.map["indiaBusiness"];
    const data = await fetch(apiKey);
    const parsedData = await data.json();
    this.setState({ articles: parsedData?.articles });
  }
  render() {
    return (
      <div className="container my-2">
        <h4>Top News</h4>
        <div className="row">
          {this.state?.articles.map((artile) => (
            <div className="col-md-3 m-2" key={artile?.url}>
              <NewsItem
                title={artile?.title?.slice(0, 20)}
                desc={artile?.description?.slice(0, 50)}
                url={artile?.urlToImage}
                newsUrl={artile?.url}
              ></NewsItem>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default News;
