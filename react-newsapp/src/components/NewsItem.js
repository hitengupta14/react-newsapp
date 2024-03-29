import React from "react";

const NewsItem = (props) => {
  let { title, desc, url, newsUrl } = props;
  const nullUrl =
    url ??
    "https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA";
  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={nullUrl}
          className="card-img-top"
          style={{ maxHeight: "160px",minHeight: "160px" }}
          alt="..."
        />
        <div
          className="card-body"
          style={{ maxHeight: "166px", minHeight: "166px" }}
        >
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{desc}...</p>
          <a
            href={newsUrl}
            target="_blank"
            rel="noreferrer"
            className="btn btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
