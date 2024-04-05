import { LineChart } from '@mui/x-charts/LineChart';
import { ChainsData, GrowthIndexData } from '../views/MainView';

interface ChainsChartProps {
    data: ChainsData;
    blockchainName: string;
    cumulativeName: string;
    weekGranularity: number;
}

const mappedDates = (list: GrowthIndexData[], weekGranularity: number) => {
  const mappedResult = list.map((item) => new Date(item.date));

  if(weekGranularity === 1) { // Return the array, if there's no need for filtering
    return mappedResult;
  }

  return mappedResult.filter((e, i) => i % weekGranularity === weekGranularity - 1);
}

const mappedValues = (list: GrowthIndexData[], weekGranularity: number) => {
  const mappedResult = list.map((item) => item.value);

  if(weekGranularity === 1) { // Return the array, if there's no need for filtering
    return mappedResult;
  }

  return mappedResult.filter((e, i) => i % weekGranularity === weekGranularity - 1);
}

function ChainsChart({ data, blockchainName, cumulativeName, weekGranularity }: ChainsChartProps) {
    const dates = mappedDates(data.blockchain.tg_growth_index, weekGranularity);
    const blockchainValues = mappedValues(data.blockchain.tg_growth_index, weekGranularity);
    const cumulativeValues = mappedValues(data.cumulative.tg_growth_index, weekGranularity);

    console.log(dates)

    const customize = {
      height: 400,
      stackingOrder: 'descending',
    };

    return (
        <LineChart
            xAxis={[
                {
                id: 'Years',
                data: dates,
                scaleType: 'point',
                valueFormatter: (date) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
                },
            ]}
            series={[
              {
                id: blockchainName,
                label: blockchainName.charAt(0).toUpperCase() + blockchainName.slice(1),
                data: blockchainValues,
                area: true,
                showMark: true,
                color: '#72c50f'
              },
              {
                id: cumulativeName,
                label: cumulativeName.charAt(0).toUpperCase() + cumulativeName.slice(1),
                data: cumulativeValues,
                area: true,
                showMark: true,
                color: '#0a7538'
              }
            ]}
            {...customize}
        />
    );
  }
  
  export default ChainsChart;