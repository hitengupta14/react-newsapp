import React, { Component } from "react";
import NewsItem from "./NewsItem";
export class News extends Component {
  articleCount = 0;
  map = {
    indiaBusiness:
      "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=a0ceb7a3cdfc417bb0746b53995c1d24",
    techNews:
      "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=a0ceb7a3cdfc417bb0746b53995c1d24",
  };
  constructor() {
    super();
    this.state = { articles: [], loading: false, page: 1, totalResults: null };
  }
  handlePrevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    await this.getApiData();
  };
  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    await this.getApiData();
  };
  async componentDidMount() {
    await this.getApiData();
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
        <div className="d-grid gap-2 d-flex justify-content-between">
          <button
            disabled={this.state.page === 1}
            className="btn btn-outline-secondary me-md-2"
            type="button"
            onClick={this.handlePrevClick}
          >
            Prev
          </button>
          <button
            disabled={
              !(this.state.page <= Math.ceil(this.state.totalResults / 20))
            }
            className="btn btn-outline-success"
            type="button"
            onClick={this.handleNextClick}
          >
            Next
          </button>
        </div>
      </div>
    );
  }

  async getApiData() {
    const apiKey = this.map["indiaBusiness"];
    const key = `${apiKey}&page=${this.state.page}&pageSize=20`;
    const data = await fetch(key);
    const parsedData = await data.json();
    this.setState({
      articles: parsedData?.articles,
      totalResults: parsedData?.totalResults,
    });
  }
}

export default News;
