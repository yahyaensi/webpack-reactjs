import React from 'react';

class User extends React.Component {
  onNavigateHome = () => this.props.history.push('/');

  render() {
    const { params } = this.props.match;
    return (
      <div>
        <h3>The User Page</h3>
        <p>
          User ID:
          {params.id}
        </p>
        <button onClick={this.onNavigateHome} className="btn btn-primary">
          Go Home!
        </button>
      </div>
    );
  }
}

export default User;
