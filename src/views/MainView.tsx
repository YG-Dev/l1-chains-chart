import { Alert, CircularProgress, Container, InputLabel, MenuItem, Select, Typography } from "@mui/material";
//import mockData from "../mocks/basic-timeline-data.mock";
import ChainsChart from "../components/ChainsChart";
import { useEffect, useState } from "react";

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
    const [blockchainName, setBlockchainName] = useState("ethereum");
    const [cumulativeName, setCumulativeName] = useState("solana");
    const [weekGranularity, setWeekGranularity] = useState(1);
    const [data, setData] = useState<ChainsData>();
    const [isLoading, setIsLoading] = useState(false);
    const [errorData, setErrorData] = useState<string | null>(null);

    const fetchGrowthData = async (chain: string, cumulative: string) => {
        setIsLoading(true);
        try {
            await fetch('https://api-proxy-dm.onrender.com/tokenguard-growth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chainName: chain,
                    period: "last year",
                    metric: "tg_growth_index",
                    compareWith: [cumulative]
                })
            })
            .then(res => res.json())
            .then((res) => {
                console.log('response ', res);
                setData(res);
            })
            .catch((err: any) => {
                setErrorData(err instanceof Error ? err.message : 'Something went wrong');
            });
        } catch(err) {
            setErrorData(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setIsLoading(false);
        }
        
    }

    useEffect(() => {
        fetchGrowthData(blockchainName, cumulativeName);
    }, [blockchainName, cumulativeName])
    
    return (
        <Container sx={{ minWidth: '100vw', minHeight: '100vh', backgroundColor: '#121212' }}>
            <Container sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', paddingTop: '2em' }} >
                <Typography variant="h2" component="h1" color={'#fff'} align='center' marginBottom={'.5em'}>
                    L1 Chains Chart
                </Typography>
                <Typography variant="subtitle1" component="p" color={'#fff'} align='justify' marginBottom={'2em'}>
                    This is the Single Page Application that allows user to display chart comparing growth indices of two specific Blockchains.
                </Typography>
                <Container sx={{ display: 'flex', marginBottom: 20 }}>
                    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
                        <InputLabel id="blockchain-label">Blockchain</InputLabel>
                        <Select
                            labelId="blockchain-label"
                            id="blockchain-select"
                            value={blockchainName}
                            onChange={(e) => setBlockchainName(e.target.value)}
                            sx={{ width: 200, color: '#fff' }}
                        >
                            <MenuItem value={'solana'} disabled={cumulativeName === 'solana'}>Solana</MenuItem>
                            <MenuItem value={'fantom'} disabled={cumulativeName === 'fantom'}>Fantom</MenuItem>
                            <MenuItem value={'ethereum'} disabled={cumulativeName === 'ethereum'}>Ethereum</MenuItem>
                        </Select>
                    </Container>
                    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
                        <InputLabel id="cumulative-label">Compare with</InputLabel>
                        <Select
                            labelId="cumulative-label"
                            id="cumulative-select"
                            value={cumulativeName}
                            onChange={(e) => setCumulativeName(e.target.value)}
                            sx={{ width: 200, color: '#fff' }}
                        >
                            <MenuItem value={'solana'} disabled={blockchainName === 'solana'}>Solana</MenuItem>
                            <MenuItem value={'fantom'} disabled={blockchainName === 'fantom'}>Fantom</MenuItem>
                            <MenuItem value={'ethereum'} disabled={blockchainName === 'ethereum'}>Ethereum</MenuItem>
                        </Select>
                    </Container>
                    <Container sx={{ display: 'flex', flexDirection: 'column' }}>
                        <InputLabel id="week-granularity-label">Week granularity</InputLabel>
                        <Select
                            labelId="week-granularity-label"
                            id="week-granularity-select"
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
                {
                    //(isLoading || errorData) &&
                    //<Button variant="contained" disableRipple onClick> // potential mock button if API should be acting depressed
                    //    Want to see mocked version instead?
                    //</Button>
                }
                {
                    isLoading && <CircularProgress sx={{
                        minWidth: '200px',
                        minHeight: '200px',
                        margin: 'auto',
                        marginTop: '1em',
                        marginBottom: '1em'
                    }}/>
                }
                {
                    !isLoading && errorData &&
                    <Alert sx={{ padding: 2, marginY: 2, }} severity='error'>
                        {errorData}
                    </Alert>
                }
                {
                    !isLoading && !errorData && data &&
                    <ChainsChart
                        data={data}
                        blockchainName={blockchainName}
                        cumulativeName={cumulativeName}
                        weekGranularity={weekGranularity}
                    />
                }
            </Container>
        </Container>
    );
  }
  
  export default MainView;
  