import { useState } from 'react';
import useFetch from 'use-http';
import Countdown from 'react-countdown';

import HighChart from './components/HighChart';

import loader from './assets/loading.svg';
import './App.css';

const baseURL = process.env.REACT_APP_BASE_SERVER_URL;

function App() {
  const [isTimeDone, setIsTimeDone] = useState(true);
  const [chartDataURL, setChartDataURL] = useState(`${baseURL}/tweets/time`);
  const { data: chartData, loading, error } = useFetch(
    chartDataURL,
    {
      responseType: 'json',
    },
    [chartDataURL],
  );
  const { data: time } = useFetch(`${baseURL}/tweets/next-tweet`, null, [
    isTimeDone,
  ]);
  console.log(time);

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Big Orange Data</h1>
        <div>
          <button onClick={() => setChartDataURL(`${baseURL}/tweets/time`)}>
            Tweets over time
          </button>
          <button onClick={() => setChartDataURL(`${baseURL}/tweets/retweets`)}>
            Retweets over time
          </button>
          <button
            onClick={() => setChartDataURL(`${baseURL}/tweets/favorites`)}
          >
            Favorites over time
          </button>
          <button onClick={() => setChartDataURL(`${baseURL}/tweets/daytime`)}>
            Tweets by time of the day
          </button>
        </div>
        <div>
          Next tweet will be in:{' '}
          <Countdown
            date={new Date(time)}
            onComplete={() => setIsTimeDone((state) => !state)}
          />
        </div>
        {loading && <img src={loader} alt='loading' />}
        {!loading && !error && <HighChart data={chartData} />}
      </header>
    </div>
  );
}

export default App;
