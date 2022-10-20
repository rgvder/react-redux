import React, { Component } from 'react';
import Catalog from '../../components/main/Catalog/Catalog';

class Main extends Component<Record<string, never>, Record<string, never>> {
  render() {
    return (
      <>
        <Catalog />
      </>
    );
  }
}

export default Main;
