import { useState, useEffect } from "react";

const urls = [
  "https://anderspink.com/code-test/data/sports.json",
  "https://anderspink.com/code-test/data/marketing.json",
  "https://anderspink.com/code-test/data/environment.json",
];
const getEvenDaysDiff = (d) => {
  let now = new Date();
  now.setHours(0, 0, 0, 0);
  let then = new Date(d);
  then.setHours(0, 0, 0, 0);
  return Math.round((now - then) / 8.64e7);
};

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
          <thead>
            <th>Title</th>
            <th>Domain</th>
            <th>Date</th>
            <th>Content</th>
            <th>Image</th>
            <th>Category</th>
          </thead>
          <tbody>
            {newsFeed.length !== 0
              ? newsFeed.flat().map((news) => {
                  return (
                    <tr key={news.id}>
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
                      <td> {getEvenDaysDiff(news.date)} days ago</td>
                      <td> {news.content}</td>
                      <td>
                        {" "}
                        <img src={news.image} alt="new"></img>
                      </td>
                      <td> {news.content}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};
