/**
 * @file Main.tsx
 *
 * Provides common app-level information and functionality.
 * 
 * Contains the AppPageInterface, an interface that can be passed onto components
 * or containers in order to access common properties or functions such as
 * the router or screen information.
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
const loadLayout = require('bundle-loader?lazy!./Layout');
import Bundle from './Bundle';
import LeftMenuIcon from './LeftMenuIcon';

/**
 * This interface defines the api through which child components can do things like set
 * the page title, create/remove tabs, display Snackbar messages, etc.
 */
export interface AppPageInterface {
  /**
   * screen - Provides basic information on the current device screen size and orientation.
   *
   * Developers and us this info for RWD
   * 
   * @type {Object}
   */
  screen:{width: number, height: number, orientation: string};
  /**
   * setMainIcon sets the top Left icon of the AppBar
   * 
   * @param  {JSX.Element} icon
   */
  setMainIcon(icon: JSX.Element): void;
  /**
   * setRightIcon sets the top right icon of the AppBar. 
   *
   * Often this is used to create a context menu
   * 
   * @param {JSX.Element} icon
   */
  setRightIcon(icon: JSX.Element): void;
  /**
   * Allow child elements to set the page title
   * 
   * @param {string} title - The page title
   */
  setPageTitle(title:string): void;

  /**
   * setTitlePath Establishes which path is navigated when a user clicks/taps the AppBar title
   * If it is not set then clicking/tapping on the title is a noop
   * 
   * @param {string} titlePath - the route 
   */
  setTitlePath(titlePath:string):void;

  /**
   * Sets the active tab
   * This function is typically called automatically by the ./Page.tsx component
   * 
   * @param {string} tabsId - not Currently in use
   * @param {string} tabId - The "id" or "index" for the tab you want activate
   */
  selectTab(tabsId: string | number, tabIndex:number | false): void;
  /**
   * This object is furnished by the react-router-dom module
   * and provides methods with which to navigate throughout the app
   *
   * For example see the handleTitleClick method below wich uses push.
   * 
   * @type {object}
   */
  history: any;

  /**
   * Idealy this would be set to the semver version of the app which
   * is helpful for debugging and ensuring when a new version has been release on an app store.
   * It is set in <root>/app.config.js
   */
  version: string;

  /**
   * setTabs - Allow the user to set the navigation tabs which appear just below the AppBar.
   *
   * setting tabs this will will override any Tabs created by setDefaultTabs
   * 
   * @param  {JSX.Element[]} tabs - An array of tab elements
   */
  setTabs: (tabs: JSX.Element[]) => void;
  /**
   * setDefaultTabs  - This method esablishes the default/primary navigation tabs
   *
   * @param  {JSX.Element[]} tabs - An array of tab elements
   */
  setDefaultTabs: (tabs: JSX.Element[]) => void;
  /**
   * sendMessage - calling this with a string argument will cause a SnackBar notification to appear.
   *
   * @example <root>/src/components/StoreDemo/ProductDetails.tsx
   * @param {string} title
   */
  sendMessage(title:string): void;
  /* used internally */
  tabCount: number;
  /* used internally */
  tabRemoved: () => void;
  /* used internally */
  tabAdded: () => void;
  /**
   * Allows the user to dynamically set the bottom navigation items. This will override
   * bottom navs set by setMainBottomNavigation
   *
   * @param {JSX.Element[]} navigations - An array of bottom navigation items
   */
  setBottomNavigation: (navigations: JSX.Element[]) => void;
  /**
   * Used by other components like ./RouteGroup to establish the default bottom navigation items
   * 
   */
  setMainBottomNavigation: (navigations: JSX.Element[]) => void;
  /**
   * sets the current active bottom navigation element. 
   *
   * This is mostly an internal function used by ./Page.tsx but could also be used to dynamically
   * set the active navigation item.
   */
  setBottomNavigationId: (index: number) => void;

  /**
   * If applicable this will restore user defined tabs set by setBottomNavigation() with
   * the tabs established by setMainBottomNavigation()
   */

  setBottomNavigatioDefaults: () => void;
  /**
   * holds the current index value of the active buttom navigation item .
   * @type {string}
   */
  bnavId: string;
}

export interface Props {
  setPageTitle(title:string): void;
  sendMessage(title:string): void;
  history: any;
  version: string;
  leftIcon: JSX.Element;
  rightIcon: JSX.Element;
  title: string;
}

export interface State {
  screen:{width: number, height: number,orientation: string}
  title: string;
  leftIcon: JSX.Element;
  titlePath: string;
  rightIcon: JSX.Element;
  tabId: number | false;
  tabsId: string | number;
  mainTabs: JSX.Element[];
  tempTabs: JSX.Element[] | undefined;
  tabCount: number;
  bottomNavigationId: number;
  bottomNavigations: JSX.Element[] | undefined;
  mainBottomNavigations: JSX.Element[] | undefined;
  bnavigations: JSX.Element[],
  bnavId: string;
}

export default class Main extends React.Component<Props, State>{
  static defaultProps: Partial<Props> = {
    leftIcon: <LeftMenuIcon />,
    rightIcon: null
  }
  constructor(props){
    super(props);
    this.state = {
      screen: this.getScreenDimensions(),
      title: props.title,
      leftIcon: this.props.leftIcon,
      titlePath: '/',
      rightIcon: this.props.rightIcon,
      tabsId: null,
      tabId: 0,
      mainTabs: [],
      tempTabs: undefined,
      tabCount: 0,
      bottomNavigationId: 0,
      mainBottomNavigations:[],
      bottomNavigations: [],
      bnavigations: [],
      bnavId: 'default'
    }
  }


  
  /**
   * Allows user to dynamically set tabs
   * 
   * @param  {JSX.Element} tabs - The tabs you want to show below the AppBar
   * @return void     
   */
  handleSetTabs = (tabs: JSX.Element[]) => {
    this.setState({
      tempTabs: tabs
    });
  }
  /**
   * Increments state.tabCount  which can be used by child components for optimization
   * It is currently only used by ./RouteGroup
   * 
   * @return {void} 
   */
  handleTabAdded = () => {
    this.setState({
      tabCount: this.state.tabCount + 1
    });
  }
  /**
   * Decrements state.tabCount  which can be used by child components for optimization
   * It is currently only used by ./RouteGroup
   * 
   * @return {void} 
   */
  handleTabRemoved = () => {
    if(this.state.tabCount){
      this.setState({
        tabCount: this.state.tabCount - 1
      });
    }
  }

  /**
   * Is used by ./RouteGroup component to establish the primary tabs
   * @param  {JSX.Element[]} mainTabs - The tabs added by RouteGroup component
   * @return {void}
   */
  handleDefaultTabs = (mainTabs: JSX.Element[]) => {
    this.setState({
      mainTabs
    });
  }

  /**
   * Called by other components to indicate which tab is currently selected/active
   * @param  {string} - not currently in use
   * @param  {number} tabId - the index of the current active tab
   * @return {void}
   */
  handleSelectTab = (tabsId: string | number,tabId:number | false) => {
    this.setState({
      tabsId,
      tabId
    });
  }

  /**
   * Allows child components to set the main icon which is usually the left-most icon in the AppBar
   * @param  {JSX.Element} leftIcon - the icon to add
   * @return {void}
   */
  handleSetMainIcon = (leftIcon: JSX.Element) => {
    this.setState({leftIcon})
  }
  /**
   * Allows child components to set the right-most icon in the AppBar. 
   * Alot of times this will be a contect menu
   * 
   * @param  {JSX.Element} rightIcon - the icon to add
   * @return {void}
   */
  handleSetRightIcon = (rightIcon: JSX.Element) => {
    this.setState({rightIcon})
  }
  /**
   * allows the user to set the path for when the title in the AppBar is clicked
   * 
   * @param  {string} titlePath - The string the will be passed to history.push(...)
   * @return {void}
   */
  handleSetTitlePath = (titlePath: string) => {
    this.setState({titlePath})
  }

  /**
   * Allows user to dynamically set bottom nav items
   * 
   * @param  {JSX.Element} tabs - The tabs you want to show below the AppBar
   * @return void     
   */
  handleSetBottomNavigation = (navigations: JSX.Element[]) => {
    console.log(navigations);
    this.setState({
      bottomNavigations: navigations,
      bnavId: 'user'
    });
  }

  /**
   * Allows Router System to set bottom navigations
   * 
   * @param  {JSX.Element} tabs - The tabs you want to show below the AppBar
   * @return void     
   */
  handleSetMainBottomNavigation = (navigations: JSX.Element[]) => {
    console.log(navigations);
    this.setState({
      mainBottomNavigations: navigations,
      bnavId: 'default',
      bottomNavigations: []
    });
  }

  handleSetDefaultBottomNavigation = () => {
    this.setState({
      bottomNavigations: [],
      bnavId: 'default'
    });
  }

  handleSetBottomNavigationId = (bNavId: number) => {
    this.setState({
      bottomNavigationId: bNavId
    });
  }

  componentDidMount(){
    this.handlePageResize();
  }



  /**
   * Gets the current screen dimensions. This will allow components to implement custom RWD
   * @return {Object} A simple object containing the current width, height and orientation
   */
  getScreenDimensions = () => {
    const orientation = window.innerWidth >= window.innerHeight ? 'landscape' : 'portrait';

    return {
       width: window.innerWidth,
       height: window.innerHeight,
       orientation
    }
  }

  /**
   * Handles the behavior for with the AppBar title is clicked. If state.titlePath is not empty
   * the user will be navigated via history.push
   * 
   * @param  {Event} event - A standard click event object
   * @return {void}
   */
  handleTitleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const {history} = this.props;

    if(this.state.titlePath){
      history.push(this.state.titlePath);
    }
  }


  /**
   * Detects whether any change in dimension has occured. This is used to preven unecessary
   * rendering
   * 
   * @return {boolean}
   */
  hasScreenChanged = () => {
    const {width, height} = this.state.screen;
    const currentDims = this.getScreenDimensions();

    if(width !== currentDims.width){
      return true;
    }
    if(height !== currentDims.height){
      return true;
    }
    return false;
  }

  /**
   * Establishes the a listener for the onresize event so that child components that implement
   * RWD and respond appropriately
   *
   * @returns {void}
   */

  handlePageResize = () => {
    let resizeTimeoutId = null;
    window.onresize = () => {
       if(resizeTimeoutId){
         clearTimeout(resizeTimeoutId);
       }

       if(this.hasScreenChanged()){

         resizeTimeoutId = setTimeout(
                () => {

                 this.setState({
                   screen: this.getScreenDimensions()
                 });

                },
              100);
       }


    }
  }

  /**
   * This function returns on object that implements the AppPageInterface
   * @return {AppPageInterface}
   */
  
  getAppPageObject = ():AppPageInterface => {
    const {setPageTitle,history} = this.props;
    return {
      screen: this.state.screen,
      setMainIcon: this.handleSetMainIcon,
      setPageTitle,
      history,
      setTitlePath: this.handleSetTitlePath,
      version: this.props.version,
      setRightIcon: this.handleSetRightIcon,
      selectTab: this.handleSelectTab,
      setTabs: this.handleSetTabs,
      setDefaultTabs: this.handleDefaultTabs,
      sendMessage: this.props.sendMessage,
      tabAdded: this.handleTabAdded,
      tabRemoved: this.handleTabRemoved,
      tabCount: this.state.tabCount,
      setBottomNavigation: this.handleSetBottomNavigation,
      setMainBottomNavigation: this.handleSetMainBottomNavigation,
      setBottomNavigationId: this.handleSetBottomNavigationId,
      setBottomNavigatioDefaults: this.handleSetDefaultBottomNavigation,
      bnavId: this.state.bnavId
    }
  }
  render(){

    return <Bundle load={loadLayout} >
      {(Layout) => {
          return <Layout appPage={this.getAppPageObject()}  {...this.state} onTitleClick={this.handleTitleClick} />
        }}
    </Bundle>
  }
}
