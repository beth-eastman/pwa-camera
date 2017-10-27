/**
 * @file src/index.tsx
 * Renders the application.
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
import SvgIcon from 'material-ui-next/SvgIcon';
(global as any).__MUI_SvgIcon__ = SvgIcon;
import {compose, createStore,applyMiddleware} from 'redux';
import {persistStore, autoRehydrate} from 'redux-persist';
import * as localForage from "localforage";

import thunk from 'redux-thunk';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import * as injectTapEventPlugin from 'react-tap-event-plugin';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './containers/Main';
import { MuiThemeProvider,createMuiTheme} from 'material-ui-next/styles';
import reducer from './reducers';
import {setUserPlatform} from './actions';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();
const theme = createMuiTheme();
injectTapEventPlugin();

require('./index.html'); //load and emit index.html to destination directory
require('./manifest.json'); //load and emit manifest.json to destination directory
require("file-loader?name=[name].[ext]!./favicon.ico"); //tell webpack to use file-loader to process the favicon

const render = (RootComponent: any) => {

  //thunkArgs is passed in as the 3rd argument for all redux-thunks action
  //This allows thunk actions to access app level information and features
  // @see [Function] "searchProducts" in <rootDir>/src/actions/storeDemo.ts 
  // @see https://github.com/gaearon/redux-thunk#injecting-a-custom-argument

  const thunkArgs = {
    isCordova: __IS_CORDOVA_BUILD__, //__IS_CORDOVA_BUILD__ is set in <rootDir>/webpack.*.js files
    platform: __IS_CORDOVA_BUILD__ ? (window as any).device.platform.toLowerCase() : 'browser',
    nativeSettings: __IS_CORDOVA_BUILD__  ? (window as any).cordova.plugins.settings : null,
    appPrefix: __REDUX_PERSIST_PREFIX__
  }
  
  //here we add the reducer to createStore which establishes the redux state tree.
  const store = createStore(
      reducer,
      undefined,
      compose(
        applyMiddleware(thunk.withExtraArgument(thunkArgs)),
        autoRehydrate()
      ) as any
    );

  //this sets up the redux-persist module to work with redux
  persistStore(store,{
    blacklist: ['view'], //establishes which tables must NOT be persisted
    //whitelist: [], //establishes which tables are saved
    storage: localForage,//You can choose a diffrent engine
    keyPrefix: __REDUX_PERSIST_PREFIX__ 
    // __REDUX_PERSIST_PREFIX__ is set in <rootDir>/app.config.js.
    // Prefixes a string each table so that you can host multiple apps
    // on the same origin without accidently using the wrong table when multiple apps share
    // the same table names

  });

  if(__DEVTOOLS__){ 
    //__DEVTOOLS__ is set in <rootDir>/webpack.*.js files.
    //If __DEVTOOLS__ = false, which is the case in production, this code within this block will be stripped from the build
    store.subscribe(() => {
       console.log(store.getState()); // list entire redux state of app
    });
  }

  //set the platform in redux state (state.user.platform) 
  //This is more usefull for cordova projects
  store.dispatch(setUserPlatform(thunkArgs.platform));


  const cordovaPause = () => {
     // store.dispatch(someAction());
  }

  const cordovaResume = () => {
      // store.dispatch(someAction());
  }

  if(__IS_CORDOVA_BUILD__){
    document.addEventListener("pause", cordovaPause, false);
    document.addEventListener("resume", cordovaResume, false);
  }

    ReactDOM.render(
        <AppContainer>
         <MuiThemeProvider theme={theme}>

              <Provider store={store}>
                <HashRouter>
                  <RootComponent version={__APP_VERSION__} defaultTitle={__APP_NAME__} />
                </HashRouter>
              </Provider>
          </MuiThemeProvider>
        </AppContainer>,
        document.getElementById("spaApp")
    );
}


if(__IS_CORDOVA_BUILD__){
  // If __IS_CORDOVA_BUILD__ = true Then we don't want to render any React compoents until
  // cordova and all platform plugins are ready as indicated when the "deviceready" event is triggered.
  document.addEventListener("deviceready", function(){

       render(App);
  })
} else {
  //Rendering in the broswer
  render(App);


  // Hot Module Replacement API. Only used when running the dev server.
  if ((module as any).hot) {
    (module as any).hot.accept('./containers/Main', () => {
      render(App);
    });
  }

}
