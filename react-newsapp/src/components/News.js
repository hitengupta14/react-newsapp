import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import InfiniteScroll from "react-infinite-scroll-component";

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
    await this.setApiData();
  };
  handleNextClick = async () => {
    this.setState({ page: this.state.page + 1 });
    await this.setApiData();
  };
  async componentDidMount() {
    await this.setApiData();
  }
  async componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.setState({ category: this.props?.category });
      await this.setApiData(this.props.category);
    }
  }
  render() {
    return (
      <div className="container my-2">
        <h4>Top News</h4>
        <InfiniteScroll
          dataLength={this.state?.articles?.length}
          next={this.fetchMoreData}
          hasMore={this.state?.articles?.length <= this.state?.totalResults}
          loader={<Spinner />}
        >
          <div className="row">
            <>{this.item()}</>
          </div>
        </InfiniteScroll>
      </div>
    );
  }
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    const data = await this.getApiData(this.state.category);
    const other = [...this.state?.articles, ...data?.articles];
    this.setState({ articles: other });
  };
  item() {
    return this.state?.articles?.map((artile, length) => (
      <div className="col-md-3 m-2" key={`${length}${artile?.url}`}>
        <NewsItem
          title={artile?.title?.slice(0, 20)}
          desc={artile?.description?.slice(0, 50)}
          url={artile?.urlToImage}
          newsUrl={artile?.url}
        ></NewsItem>
      </div>
    ));
  }
  async setApiData(category) {
    const parsedData = await this.getApiData(category);

    this.setState({
      articles: parsedData?.articles,
      totalResults: parsedData?.totalResults,
    });
  }

  async getApiData(category) {
    const apiKey = this.map["indiaBusiness"];
    const key = `${apiKey}&page=${this.state.page}&category=${
      category ?? "general"
    }&pageSize=20`;
    const data = await fetch(key);
    return data.json();
  }
}

export default News;
