/**
 * @file Layout.tsx
 * Renders the AppBar, Tabs, and Main content for the application.
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
import Tabs from 'material-ui-next/Tabs';
import MainContent from './MainContent';
import {AppPageInterface} from './Main';
import AppBar from '../containers/AppBar';
import BottomNavigation from 'material-ui-next/BottomNavigation';
import {withStyles} from 'material-ui-next/styles';


const styles = {
  bottomNavigation: {
    position: 'fixed' as 'fixed',
    bottom: 0,
    width: '100%'
  }
}
export interface Props {
  setPageTitle(title:string): void;
  screen:{width: number, height: number,orientation: string}
  title: string;
  defaultTitle: string;
  leftIcon: JSX.Element;
  rightIcon: JSX.Element;
  titlePath: string;
  appPage: AppPageInterface;
  tabId: number;
  bottomNavigationId: number;
  tabsId: string | number;
  onTitleClick: (event: any) => void;
  mainTabs: JSX.Element[];
  bnavigations: JSX.Element[] | undefined
  classes?: any;
}

export interface State {

}

/**
 * Layout assessmebles all the primary elements of the app including the
 * AppBar, Navigation(Tabs and or Bottom Navigation), and page Content.
 *
 * Tabs and or Bottom Navigations are create using RouteItem and RouteGroup
 * @see StoreDemo/StoreRoutes.tsx
 */
export class Layout extends React.Component<any,any> {

  handleTabChange = (event, value) => {
    const {appPage} = this.props;
    appPage.selectTab(null,value);
  }

  render() {

    const {classes} = this.props;
    const defaultProps = {...this.props,basePath: '/',mainTabs: undefined};
    const tabs = typeof this.props.tempTabs !== 'undefined' ? this.props.tempTabs : this.props.mainTabs;

    const bnavigations = this.props.bnavId === 'user' ? this.props.bottomNavigations : this.props.mainBottomNavigations;
    return (
      <div>
        <AppBar rightIcon={this.props.rightIcon} defaultTitle={this.props.title}  leftIcon={this.props.leftIcon} onTitleClick={this.props.onTitleClick} />
        {tabs && tabs.length > 0 && <Tabs
          value={this.props.tabId}
          onChange={this.handleTabChange}
          children={tabs}
          fullWidth
        />}

        <MainContent {...defaultProps} />

        {bnavigations.length > 0 && <BottomNavigation className={classes.bottomNavigation}
          value={this.props.bottomNavigationId}
  
          showLabels
        >
          {bnavigations}
        </BottomNavigation>}

      </div>
    );
  }
}

export default withStyles(styles)(Layout);
