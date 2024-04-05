import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainView from './views/MainView';

export const ThemeApp = () => {
  const theme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <MainView />
    </ThemeProvider>
  )
}


function App() {
  return (
      <ThemeApp/>
  );
}

export default App;