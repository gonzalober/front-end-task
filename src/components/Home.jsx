import { useState, useEffect } from "react";

const urls = [
  "https://anderspink.com/code-test/data/sports.json",
  "https://anderspink.com/code-test/data/marketing.json",
  "https://anderspink.com/code-test/data/environment.json",
];

export const Home = () => {
  const [newsFeed, setNewsFeed] = useState([]);

  const loadingFeed = async () => {
    const results = await Promise.all(urls.map((url) => fetch(url)));
    console.log(results);
    const news = await Promise.all(
      results.map((res) => {
        if (!res.ok) {
          throw Error("could not fetch data for the resource");
        }
        return res.json();
      })
    ).catch((err) => {
      console.log(err.message);

      setNewsFeed([]);
    });
    console.log(news);
    setNewsFeed(news);
  };

  useEffect(() => {
    loadingFeed();
  }, []);

  console.log(newsFeed);

  return (
    <div className="App">
      <div>
        <table>
          <tr>
            <th>Title</th>
            <th>Domain</th>
            <th>Date</th>
            <th>Content</th>
            <th>Image</th>
            <th>Category</th>
          </tr>
          {newsFeed.length !== 0
            ? newsFeed.map((newsFirst) => {
                return (
                  <div>
                    {newsFirst !== undefined
                      ? newsFirst.map((news) => {
                          return (
                            <div>
                              <tbody key={news.id}>
                                <tr>
                                  <td>
                                    {" "}
                                    <a
                                      href={news.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      {news.title}
                                    </a>
                                  </td>
                                  <td> {news.domain}</td>
                                  <td> {news.date}</td>
                                  <td> {news.content}</td>
                                  <td>
                                    {" "}
                                    <img src={news.image} alt="new"></img>
                                  </td>
                                  <td> {news.content}</td>
                                </tr>
                              </tbody>
                            </div>
                          );
                        })
                      : null}
                  </div>
                );
              })
            : null}
        </table>
      </div>
    </div>
  );
};
