import { Container, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import data from "../mocks/basic-timeline-data.mock";
import ChainsChart from "../components/ChainsChart";
import { useState } from "react";

export interface GrowthIndexData {
    date: string;
    value: number;
}

export interface ChainsData {
    blockchain: {
        tg_growth_index: GrowthIndexData[]
    },
    cumulative: {
        tg_growth_index: GrowthIndexData[]
    }
}

function MainView() {
    const blockchainName = "Ethereum";
    const cumulativeName = "Solana";
    const [weekGranularity, setWeekGranularity] = useState(1);
    
    return (
        <Container sx={{ minWidth: '100vw', minHeight: '100vh', backgroundColor: '#121212' }}>
            <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', paddingTop: '2em' }} >
                <Typography variant="h2" component="h1" color={'#fff'} align='center' marginBottom={'.5em'}>
                    L1 Chains Chart
                </Typography>
                <Typography variant="subtitle1" component="p" color={'#fff'} align='justify' marginBottom={'2em'}>
                    This is the Single Page Application that allows user to display chart comparing growth indices of two specific Blockchains.
                </Typography>
                <Container sx={{ display: 'flex' }}>
                    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
                        <InputLabel id="week-granurality-label">Week granurality</InputLabel>
                        <Select
                            labelId="week-granurality-label"
                            id="week-granurality-select"
                            value={weekGranularity}
                            onChange={(e) => setWeekGranularity(parseInt(e.target.value as string))}
                            sx={{ width: 200, color: '#fff' }}
                        >
                            <MenuItem value={1}>1 week</MenuItem>
                            <MenuItem value={2}>2 weeks</MenuItem>
                            <MenuItem value={4}>4 weeks</MenuItem>
                        </Select>
                    </Container>
                </Container>
                <ChainsChart
                    data={data}
                    blockchainName={blockchainName}
                    cumulativeName={cumulativeName}
                    weekGranularity={weekGranularity}
                />
            </Container>
        </Container>
    );
  }
  
  export default MainView;
  