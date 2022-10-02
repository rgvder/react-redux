import React, { Component } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import Footer from './Footer/Footer';

class Layout extends Component {
  render() {
    return (
      <>
        <Header />
        <main className="wrapper">
          <Outlet />
        </main>
        <Footer />
      </>
    );
  }
}

export default Layout;
