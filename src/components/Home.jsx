import { useState, useEffect } from "react";

export const Home = () => {
  const [newsFeed, setNewsFeed] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState();

  const loadingFeed = () => {
    fetch("https://anderspink.com/code-test/data/sports.json")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNewsFeed(data);
        setLoading(false);
        setError(undefined);
      })
      .catch((er) => {
        console.error("Error:", er);
        setError(er.message);
        setLoading(false);
        setNewsFeed([]);
      });
  };

  useEffect(() => {
    loadingFeed();
  }, []);

  console.log(newsFeed);

  return (
    <div className="App">
      {error && <div>{error}</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {newsFeed.length !== 0
            ? newsFeed.map((news) => {
                return (
                  <li key={news.id}>
                    <>{news.title}</>
                  </li>
                );
              })
            : null}
        </ul>
      )}
    </div>
  );
};
