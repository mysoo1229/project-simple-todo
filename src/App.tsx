import { ThemeProvider } from "styled-components";
import GlobalStyle from './Styles/GlobalStyles';
import { darkTheme } from "./Styles/themes";
import ToDoPage from "./Components/ToDoPage";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <ToDoPage />
    </ThemeProvider>
  );
}

export default App;
