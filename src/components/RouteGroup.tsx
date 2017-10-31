/**
 * @file RouteGroup.tsx
 * RouteGroup is used in tandem RouteItem establish the application routes and optionally
 * tabs, page titles, AppBar icons .etc.
 *
 * Specifically RouteGroup iterates through all its RouteItem children and creates a Tab item for
 * each RouteItem that has a "tab" property.
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

import {Tab} from 'material-ui-next/Tabs';
import { BottomNavigationButton } from 'material-ui-next/BottomNavigation';
import RestoreIcon from 'material-ui-icons/Restore';
import {AppPageInterface} from './Main';

export interface Props {
  id?: string;
  appPage: AppPageInterface;
  onActive?: (tab: any, path: string) => void;
  children?: JSX.Element[];
  defaultProps?: {
    [propName: string]: any;
  }
}

export interface State {

}


export default class RouteGroup extends React.Component<Props,any> {
  /**
   * This method handles the actions associated with tapping on or otherwise
   * activating a tab item.
   *
   * By default this function will navigate to the route provided by the "path" property of
   * RouteItem
   * 
   * @param  {string} path the route path to navigate to.
   * @return {Function}      A call back function that is passed the active tab.
   */
  handleTabActive = (path) => {
    const {appPage, onActive} = this.props;
    return (tab) => {
      appPage.history.push(path);
      onActive && onActive(tab, path);
    }
  }

  handleBottomNavigationActive = (path) => {
    const {appPage, onActive} = this.props;
    return (bottomNav) => {
      appPage.history.push(path);
      onActive && onActive(bottomNav, path);
    }
  }


  handleCreateTabs = () => {
    const {appPage} = this.props;
    let tabs = [];

    this.props.children
      .filter((child) => typeof child.props['tab'] !== 'undefined')
      .map((child, idx) => {
        tabs.push(<Tab onClick={this.handleTabActive(child.props.path)} label={child.props.title} value={idx} />);
      });

    appPage.setDefaultTabs(tabs);
    appPage.tabAdded();
  }
  handleBottomNavigationButtonClick = (path) => {
    const {appPage} = this.props;

    return (event) => {
      appPage.history.push(path);
    }
  }
  handleCreateBottomNavigation = () => {
    const {appPage} = this.props;
    let bnavigations = [];

    this.props.children
      .filter((child) => typeof child.props['bnav'] !== 'undefined')
      .map((child, idx) => {
        bnavigations.push(<BottomNavigationButton onClick={this.handleBottomNavigationButtonClick(child.props.path)} icon={<RestoreIcon />} label={child.props.title} value={idx} key={idx} />);
      });
    //console.log(bnavigations);
    appPage.setMainBottomNavigation(bnavigations);
  }



  componentWillMount(){
    this.handleCreateTabs();
    this.handleCreateBottomNavigation();
  }

  componentWillUnmount(){
    const {appPage} = this.props;
    appPage.setDefaultTabs([]);
    appPage.setMainBottomNavigation([]);
    appPage.tabRemoved();
  }

  componentWillUpdate(nextProps, nextState){
     if(nextProps.appPage.tabCount < this.props.appPage.tabCount){
        this.handleCreateTabs();
     }
  }

  render() {
    const {appPage} = this.props;
    const childrenWithProps = React.Children.map(this.props.children,
     (child) => {
       return React.cloneElement(child as any, {
         ...this.props.defaultProps,...(child as any).props, appPage: appPage
       })
     }
    );

    return <div>{childrenWithProps}</div>
  }
}
