/**
 * @file RouteItem.tsx
 * 
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
import {AppPageInterface} from './Main';
import DefaultLeftIcon from './LeftMenuIcon';
import { Route } from 'react-router-dom';
import {routePageWithProps,routeComponentWithProps} from './AppHOC';

export interface Props {
  path: string;
  title: string;
  basePath?: string;
  appPage?: AppPageInterface;
  leftIcon?: any;
  tabIndex?: number;
  exact?: boolean;
  tab?: number;
  bnav?: number;
  bnavIndex?: number;
  titlePath?: string;
  componentPage?: React.ReactNode;
  component?: React.ReactNode;
}

interface PropsForce{ //workaround
  appPage: AppPageInterface;
  basePath: string;
  [propName: string]: any;
}

export interface State {

}

export default class RouteItem extends React.Component<Props, State>{
  static defaultProps: Partial<Props> = {
    exact: false,
    tab: undefined,
    tabIndex: undefined,
    bnav: undefined,
    bnavIndex: undefined
  }

  renderRouteComponent = () => {
    return routeComponentWithProps(this.props.component,{...this.getCleanProps(), leftIcon: <DefaultLeftIcon />, rightIcon: null});
  }

  handleRenderPage = () => {
    return routePageWithProps(this.props.componentPage,this.getCleanProps() as PropsForce);
  }

  getCleanProps = () => {
    const props = {...this.props, componentPage: undefined,component: undefined};
    return props;
  }

  handleRender(){
    return this.props.componentPage ? this.handleRenderPage() : this.renderRouteComponent();
  }

  render(){
    return <Route {...this.getCleanProps()} render={this.handleRender()} />
  }
}
