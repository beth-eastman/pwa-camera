/**
 * @file actions/index.ts
 * Contains actions constants and functions.
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
export const SET_PAGE_TITLE = 'T2.SET_PAGE_TITLE';
export const SET_USER_PLATFORM = 'T2.SET_USER_PLATFORM';
export const T2_APP_MESSAGE_START = 'T2.APP_MESSAGE_START';
export const T2_APP_MESSAGE_CLEAR = 'T2.APP_MESSAGE_CLEAR';
export const EULA_ACCEPTED = 'T2.EULA_ACCEPTED';
export const EULA_REJECTED = 'T2.EULA_REJECTED';


export const SORT_ALPHABETICAL = 'default';
export const SORT_DEFAULT = 'default';
export const SORT_LOCATION = 'current_location';
export const sorts = {
  SORT_ALPHABETICAL,
  SORT_DEFAULT,
  SORT_LOCATION
}


export const eulaAccepted = () => {
  return {
    type: EULA_ACCEPTED
  }
}

export const eulaRejected = () => {
  const localAction = {
    type: EULA_REJECTED
  }

  return (dispatch,getState,extraArgs) => {
    dispatch(localAction);
    if(extraArgs.platform.toLowerCase() === 'android'){
      (window as any).navigator.app.exitApp();
    }
  }
}

export const setUserPlatform = (platform: string) => {
  return {
    type: SET_USER_PLATFORM,
    platform
  }
}

export const setPageTitle = (title:string) => {
  return {
    type: SET_PAGE_TITLE,
    title: title
  }
}

export const messageStart = (message) => {
  return {
    type: T2_APP_MESSAGE_START,
    message
  };
}

export const messageClear = () => {
  return {
    type: T2_APP_MESSAGE_CLEAR
  };
}


var timeOutId = null
export const sendMessage = (message) => {

  return (dispatch,getState) => {
    dispatch(messageStart(message));

    if(timeOutId){
        clearTimeout(timeOutId)
    }

    timeOutId = setTimeout(
                    () => {dispatch(messageClear())}
                    ,3000
                )
  }
};
