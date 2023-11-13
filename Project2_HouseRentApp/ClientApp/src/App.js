import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Layout } from './components/Layout';
import './custom.css';
import 'semantic-ui-css/semantic.min.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
>>>>>>> 8b234b5a28cab97d75abcd67f696018ceb8208e3
export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
        <Layout>
       
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
         
        </Routes>
         
      </Layout>
    );
  }
}
