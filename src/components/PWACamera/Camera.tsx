/**
 * @file HomePage.tsx
 * HomePage for the Store Demo.
 *
 * Created by T2 on 08/22/2017
 *
 * T2 PWA Starter
 *
 * Copyright © 2009-2017 United States Government as represented by
 * the Chief Information Officer of the National Center for Telehealth
 * and Technology. All Rights Reserved.
 *
 * Copyright © 2009-2017 Contributors. All Rights Reserved.
 *
 * THIS OPEN SOURCE AGREEMENT ("AGREEMENT") DEFINES THE RIGHTS OF USE,
 * REPRODUCTION, DISTRIBUTION, MODIFICATION AND REDISTRIBUTION OF CERTAIN
 * COMPUTER SOFTWARE ORIGINALLY RELEASED BY THE UNITED STATES GOVERNMENT
 * AS REPRESENTED BY THE GOVERNMENT AGENCY LISTED BELOW ("GOVERNMENT AGENCY").
 * THE UNITED STATES GOVERNMENT, AS REPRESENTED BY GOVERNMENT AGENCY, IS AN
 * INTENDED THIRD-PARTY BENEFICIARY OF ALL SUBSEQUENT DISTRIBUTIONS OR
 * REDISTRIBUTIONS OF THE SUBJECT SOFTWARE. ANYONE WHO USES, REPRODUCES,
 * DISTRIBUTES, MODIFIES OR REDISTRIBUTES THE SUBJECT SOFTWARE, AS DEFINED
 * HEREIN, OR ANY PART THEREOF, IS, BY THAT ACTION, ACCEPTING IN FULL THE
 * RESPONSIBILITIES AND OBLIGATIONS CONTAINED IN THIS AGREEMENT.
 *
 * Government Agency: The National Center for Telehealth and Technology
 * User Registration Requested. Please send email
 * with your contact information to: robert.a.kayl.civ@mail.mil
 * Government Agency Point of Contact for
 * Original Software: robert.a.kayl.civ@mail.mil
 */
import * as React from 'react';
/*import Card, { CardActions, CardContent } from 'material-ui/Card';*/
/*import { withStyles } from 'material-ui/styles';*/
/*import RaisedButton from 'material-ui/RaisedButton';*/

declare module 'react' { //See https://github.com/zilverline/react-tap-event-plugin/issues/58
    interface HTMLProps<T> {
        onTouchTap?: React.EventHandler<React.TouchEvent<T>>;
    }
}

export interface Props {
  /*classes?: any;*/
}

export interface State {
  photo: any;
  height: number;
  width: number;
}

export default class Camera extends React.Component<Props, State> {

  constructor(props) {
    super(props);

    this.state = {
      photo: null,
      height: null,
      width: null,
    }

    this.captureImage = this.captureImage.bind(this);
    this.closeCamera = this.closeCamera.bind(this);
  }

  componentDidMount() {
    const fileInput = document.getElementById('file-input');
    fileInput.addEventListener('change', (e : any) => this.captureImage(e.target.files));
  }

  /*
    Capture the image taken in the camera

    Uses a polyfill to use getUserMedia in older browsers provided by the mozilla developer network
   */
  captureImage = (image) => {
    console.log(image);

      const that = this;
      var n : any = navigator;

      // Older browsers might not implement mediaDevices at all, so we set an empty object first
      if (n.mediaDevices === undefined) {
        n.mediaDevices = {};
      }

      // Some browsers partially implement mediaDevices. We can't just assign an object
      // with getUserMedia as it would overwrite existing properties.
      // Here, we will just add the getUserMedia property if it's missing.
      if (n.mediaDevices.getUserMedia === undefined) {
        n.mediaDevices.getUserMedia = function(constraints) {

          // First get ahold of the legacy getUserMedia, if present
          var getUserMedia = n.webkitGetUserMedia || n.mozGetUserMedia;

          // Some browsers just don't implement it - return a rejected promise with an error
          // to keep a consistent interface
          if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
          }

          // Otherwise, wrap the call to the old n.getUserMedia with a Promise
          return new Promise(function(resolve, reject) {
            getUserMedia.call(n, constraints, resolve, reject);
          });
        }
      }

      n.mediaDevices.getUserMedia({ audio: false, video: true })
      .then(function(stream) {
        var video = document.querySelector('video');
        // Older browsers may not have srcObject
        if ("srcObject" in video) {
          video.srcObject = stream;
        } else {
          // Avoid using this in new browsers, as it is going away.
          video.src = window.URL.createObjectURL(stream);
        }
        video.onloadedmetadata = function(e) {
          video.play();
          const button : any = document.getElementById('open');
          button.disabled = true;

          const scale = 0.25; // scale down height for canvas display
          that.setState({
            height: video.videoHeight * scale,
            width: video.videoWidth * scale
          });
        };
      })
      .catch(function(err) {
        console.log(err.name + ": " + err.message);
      });
  }

  /* Stop camera from running */
  closeCamera = () => {
    const button : any = document.getElementById('open'); // enabled open camera button
    button.disabled = false;

    // pause video && set canvas size to take photo
    const video : any = document.querySelector('video');

    const canvas = document.querySelector('canvas');
    var context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const data = canvas.toDataURL("image/png");
    this.setState({ photo: data });
  }

  render() {
    return (
      <div>
        Take a photo by pressing the button below<br /><br />
        Simple HTML solution for mobile with no javascript:<br />
        <input type="file" accept="image/*;capture=camera" id="file-input" capture /><br /><br />
        <video id="camera" style={{ width: '100%', maxWidth: 500 }}/><br />
        <button id="open" onClick={this.captureImage}>Open Camera</button>
        <button id="close" onClick={this.closeCamera}>Take Photo</button>
        <canvas style={{ height: this.state.height, width: this.state.width  }} hidden={true} />
        <br />
        {this.state.photo &&
          <div style={{ padding: 10 }}>
          Your image: <br />
          <img src={this.state.photo} />
          </div>
        }
      </div>
   );
  }
}
