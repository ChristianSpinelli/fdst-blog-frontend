import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <main style={{ padding: '2rem' }}>
        <h1>BLOG FIAP</h1>
      </main>
    </ThemeProvider>
  );
};

export default App;