/**
 * Component for rendering the GoogleSignIn widget;
 */
import React from 'react';
const ReactPropTypes = React.PropTypes;
import * as TictactoeActions from '../tictactoeActions';

/**
 * Initializes the Google Sign-In client.
 */
var initClient = function(cb) {
  gapi.load('auth2', function() {
    /**
     * Retrieve the singleton for the GoogleAuth library and set up the
     * client.
     */
    gapi.auth2.init({
      client_id: '295072230631-gs1jpbkvvt8fg0j54n7eslrp940iplqd.apps.googleusercontent.com',
    })
    .then(function(auth2) {
      if (auth2.isSignedIn.get()) {
        return cb(null, auth2.currentUser.get());
      } else {
        auth2.isSignedIn.listen(function(isSignedIn) {
          return cb(null, auth2.currentUser.get());
        });
        window.gapi.signin2.render('google-sign-in-button');  
      }
    });
  });
};

var GoogleSignIn = React.createClass({

  propTypes: {
   user: ReactPropTypes.object.isRequired,
   stateRefUpdater: ReactPropTypes.func.isRequired
  },

  componentDidMount: function() {
    var that = this;
    initClient(function(err, googleUser) {
      TictactoeActions.onSignIn(googleUser, that.props.stateRefUpdater);
    });
  },

  render: function() {
    return (
      <section>
        <div id="google-sign-in-button" data-theme="dark"></div>
      </section>
    );
  }
});

module.exports = GoogleSignIn;

