/**
 * @file Main.tsx
 * Container for the AppPageInterface component.
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
import {connect} from 'react-redux';
import MainComponent from '../components/Main';
import {withRouter} from 'react-router-dom';
import {setPageTitle,sendMessage} from '../actions';

const stateToProps = (state,ownProps: OwnProps):StateToProps => {
  return {
    version: ownProps.version,
    title: ownProps.defaultTitle
  }
}

const dispatchToProps = (dispatch,ownProps) => {
  return {
    setPageTitle: (title:string) => {
      dispatch(setPageTitle(title));
    },
    sendMessage: (message: string) => {
      dispatch(sendMessage(message));
    }
  }
}

interface OwnProps {
  version: string;
  defaultTitle?: string;
}

interface DispPropsInterface{
}

interface StateToProps{
  version: string;
  title: string;
}

export default withRouter<{}>(connect<StateToProps,DispPropsInterface,OwnProps>(stateToProps,dispatchToProps)(MainComponent));
