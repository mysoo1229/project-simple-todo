import { ThemeProvider } from "styled-components";
import GlobalStyle from './Styles/GlobalStyles';
import { darkTheme } from "./Styles/themes";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
    </ThemeProvider>
  );
}

export default App;
