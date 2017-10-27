/**
 * @file HomePage.tsx
 * Home page for the store demo.
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
import {AppPageInterface} from '../Main';
import Checkbox from 'material-ui-next/Checkbox';
import { FormGroup, FormControlLabel } from 'material-ui-next/Form';
export interface Props {
  appPage: AppPageInterface;
}


export default class HomePage extends React.Component<Props, {}>{

  render(){
    const {appPage} = this.props;
    const versionChanged = appPage.version !== '0.0.0';
    return <div>
              <div>
                <FormGroup row>
                  <FormControlLabel control={<Checkbox checked={versionChanged} />} label={'Version: ' + appPage.version} />
                </FormGroup>

              
                {!versionChanged && <div>Please change from the default version number in your webpack config<br />
                  You will need to restart webpack
                  </div>}
              </div>
              <div>
                  <h3>View Port Dimensions</h3>
                  <p>Handy for RWD</p>
                  {appPage.screen.orientation}: {appPage.screen.width} X {appPage.screen.height}
              </div>
    </div>;
  }
}
