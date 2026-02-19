import React from 'react';
import { createBrowserRouter } from 'react-router';
import Home from './Home';
import Layout from './Layout';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';

export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ThemeProvider>
        <LanguageProvider>
          <Layout />
        </LanguageProvider>
      </ThemeProvider>
    ),
    children: [
      { index: true, Component: Home },
    ],
  },
]);
