import React from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { GlobalStyles } from './styles/GlobalStyles';
import { Header } from './components/Header/Header';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';
import { Footer } from './components/Footer/Footer';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles/>
      <AuthProvider>
        <BrowserRouter>
        <AppContainer>
          <Header/>
          <ContentWrapper>
            <AppRoutes/>
          </ContentWrapper>
          <Footer />
        </AppContainer>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;