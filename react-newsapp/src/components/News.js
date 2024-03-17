import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
export class News extends Component {
  static defaultProps = {
    country: "in",
    category: "general",
  };

  articleCount = 0;
  map = {
    indiaBusiness:
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=a0ceb7a3cdfc417bb0746b53995c1d24",
    techNews:
      "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=a0ceb7a3cdfc417bb0746b53995c1d24",
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: null,
      category: "general",
    };
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
  async componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.setState({ category: this.props?.category });
      await this.getApiData(this.props.category);
    }
  }
  render() {
    return (
      <div className="container my-2">
        <h4>Top News</h4>
        <div className="row">
          {this.state?.articles?.map((artile) => (
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
            disabled={this.state.page === 1 || this.state.loading}
            className="btn btn-outline-secondary me-md-2"
            type="button"
            onClick={this.handlePrevClick}
          >
            {this.state.loading ? (
              <Spinner></Spinner>
            ) : (
              <span className="sr-only">Prev</span>
            )}
          </button>
          <button
            disabled={
              !(this.state.page <= Math.ceil(this.state?.totalResults / 20)) ||
              this.state.loading
            }
            className="btn btn-outline-success"
            type="button"
            onClick={this.handleNextClick}
          >
            {this.state.loading ? (
              <Spinner></Spinner>
            ) : (
              <span className="sr-only">Next</span>
            )}
          </button>
        </div>
      </div>
    );
  }

  async getApiData(category) {
    const apiKey = this.map["indiaBusiness"];
    this.setState({ loading: true });
    const key = `${apiKey}&page=${this.state.page}&category=${category}&pageSize=20`;
    const data = await fetch(key);
    const parsedData = await data.json();
    this.setState({ loading: false });

    this.setState({
      articles: parsedData?.articles,
      totalResults: parsedData?.totalResults,
    });
  }
}

export default News;
