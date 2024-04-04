import { useEffect } from 'react';

function App() {
  const fetchChainsGrowthIndex = async () => {
    const url = '/growth-index/basic-timeline-data';

    const data = '{"chainName":"ethereum","period":"last year","metric":"tg_growth_index","compareWith":["solana"]}';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data,
    });

    const text = await response.text();

    console.log("RES ", text);
  }

  useEffect(() => {
    fetchChainsGrowthIndex();
  })

  return (
    <div className="App">
      yeyeyeye this is my (short)app and now on Firebase!
    </div>
  );
}

export default App;
