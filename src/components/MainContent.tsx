/**
 * @file MainContent.tsx
 *
 * This component implements the content area of the app including routes and global components
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

import Bundle from './Bundle';
const  loadAppRoutes = require('bundle-loader?lazy!./AppRoutes');
const  loadGlobalComponents = require('bundle-loader?lazy!./GlobalComponents');

export default class MainContent extends React.Component<any,any> {

  render() {
    const defaultProps = {...this.props,basePath: '/'};
    return (
      <div>
        <Bundle load={loadAppRoutes}>
          {(AppRoutes) => (AppRoutes
            ? <AppRoutes {...defaultProps} />
            : null
          )}
        </Bundle>
        <Bundle load={loadGlobalComponents}>
          {(GlobalComponents) => (GlobalComponents
            ? <GlobalComponents />
            : null
          )}
        </Bundle>
      </div>
    );
  }
}
