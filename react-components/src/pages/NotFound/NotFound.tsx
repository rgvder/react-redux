import React from 'react';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <>
      <main>
        <h2>Sorry, page not found!</h2>
        <p>
          You can see our
          <Link to="/">catalog</Link>.
        </p>
      </main>
    </>
  );
}
