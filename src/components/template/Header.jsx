import React from 'react';

import Navigation from '../common/Navigation';

const Header = props => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-xs-10 col-xs-offset-1">
          <Navigation />
        </div>
      </div>
      <hr />
    </div>
  );
};

export default Header;
