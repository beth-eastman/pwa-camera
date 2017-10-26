/**
 * @file StoreRoutes.tsx
 * Defines routes for the store demo
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
import { withRouter } from 'react-router-dom';
import HomePage from "./HomePage";
import {AppPageInterface} from '../Main';
import LeftMenuIcon from './LeftMenuIcon'
import {menuItem,leftIconProps} from '../AppHOC';
import ProductDetails from '../../containers/StoreDemo/ProductDetails';
import ProductsList from '../../containers/StoreDemo/ProductsList';
import RouteGroup from '../RouteGroup';
import RouteItem from '../RouteItem';
import MainHomePage from '../HomePage';

export interface Props {
  appPage: AppPageInterface;
  match: {url: string}
}

export interface State {

}

class StoreRoutes extends React.Component<Props, State>{

  render(){
    const basePath = '/store';
    const defaultProps = {...this.props, ...leftIconProps(basePath),basePath: basePath};

    const leftMenuIcon = menuItem(LeftMenuIcon,basePath);
    console.log(this.props.appPage);
    return <RouteGroup defaultProps={defaultProps} appPage={this.props.appPage}>
                <RouteItem tab={0} title={'Home'} exact path="/" componentPage={MainHomePage} />
                <RouteItem tab={1} title={"App Info"} exact path={basePath} leftIcon={leftMenuIcon} componentPage={HomePage} />
                <RouteItem tab={2} title={"Products"}  exact path={basePath + '/products'} componentPage={ProductsList} />
                <RouteItem tabIndex={3} title={"Details"} exact path={basePath + '/products/:id'} {...leftIconProps(basePath + '/products')} componentPage={ProductDetails} />
           </RouteGroup>;
  }
}

export default withRouter(StoreRoutes);
