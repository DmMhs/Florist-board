import React, { Component } from 'react';

class Contacts extends Component {
  render() {
    return (
      <div className="Contacts">
        <div
          className="mapouter"
          style={{
            position: 'relative',
            textAlign: 'right',
            height: '400px',
            width: '300px'
          }}
        >
          <div
            className="gmap_canvas"
            style={{
              overflow: 'hidden',
              background: 'none!important',
              height: '400px',
              width: '300px'
            }}
          >
            <iframe
              width="300"
              height="400"
              id="gmap_canvas"
              src="https://maps.google.com/maps?q=Lviv%2C%20Rynok%20Square&t=&z=13&ie=UTF8&iwloc=&output=embed"
              frameBorder="0"
              scrolling="no"
              marginHeight={0}
              marginWidth={0}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Contacts;
