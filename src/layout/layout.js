import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NavBar from 'components/navBar/navBar';
import Footer from 'components/footer';
import ThemeContext from 'store/themeContext';
import useTheme from 'hooks/useTheme';
import styledTheme from 'styles/theme';
import GlobalStyle from 'styles/globalStyle';

const Layout = ({ children }) => {
  const [theme, themeToggler] = useTheme();
  return (
    <ThemeProvider theme={styledTheme}>
      <ThemeContext.Provider value={theme}>
        <GlobalStyle />
        <Container>
          <NavBar themeToggler={themeToggler} />
          {children}
        </Container>
        <Footer/>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - var(--footer-height));
  background-color: var(--color-post-background);
`;

export default Layout;
