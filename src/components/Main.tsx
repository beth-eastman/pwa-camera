/**
 * @file Main.tsx
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

export interface AppPageInterface {
  screen:{width: number, height: number, orientation: string};
  setMainIcon(icon: JSX.Element): void;
  setRightIcon(icon: JSX.Element): void;
  setPageTitle(title:string): void;
  setTitlePath(titlePath:string):void;
  selectTab(tabsId: string | number, tabId:number): void;
  history: any;
  version: string;
  setTabs: (tabs: JSX.Element[]) => void;
  setDefaultTabs: (tabs: JSX.Element[]) => void;
  sendMessage(title:string): void;
  tabCount: number;
  tabRemoved: () => void;
  tabAdded: () => void;
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
  tabId: number;
  tabsId: string | number;
  mainTabs: JSX.Element[];
  tempTabs: JSX.Element[] | undefined;
  tabCount: number;
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
      tabCount: 0
    }
  }

  handleSetTabs = (tempTabs: JSX.Element[]) => {
    this.setState({
      tempTabs
    });
  }

  handleTabAdded = () => {
    this.setState({
      tabCount: this.state.tabCount + 1
    });
  }

  handleTabRemoved = () => {
    if(this.state.tabCount){
      this.setState({
        tabCount: this.state.tabCount - 1
      });
    }
  }
  handleDefaultTabs = (mainTabs: JSX.Element[]) => {
    this.setState({
      mainTabs
    });
  }

  handleSelectTab = (tabsId: string | number,tabId:number) => {
    this.setState({
      tabsId,
      tabId
    });
  }

  handleSetMainIcon = (leftIcon: JSX.Element) => {
    this.setState({leftIcon})
  }

  handleSetRightIcon = (rightIcon: JSX.Element) => {
    this.setState({rightIcon})
  }

  handleSetTitlePath = (titlePath: string) => {
    this.setState({titlePath})
  }

  componentDidMount(){
    this.handlePageResize();
  }

  getScreenDimensions = () => {
    const orientation = window.innerWidth >= window.innerHeight ? 'landscape' : 'portrait';

    return {
       width: window.innerWidth,
       height: window.innerHeight,
       orientation
    }
  }

  handleTitleClick = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const {history} = this.props;
    console.log(this.state.titlePath);
    if(this.state.titlePath){
      history.push(this.state.titlePath);
    }
  }

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
      tabCount: this.state.tabCount
    }
  }
  render(){

    //async loading
    return <Bundle load={loadLayout} >
      {(Layout) => {
          return <Layout appPage={this.getAppPageObject()} {...this.state} onTitleClick={this.handleTitleClick} />
        }}
    </Bundle>
  }
}
