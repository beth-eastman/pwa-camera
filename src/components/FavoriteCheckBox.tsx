/**
 * @file FavoriteCheckBox.tsx
 * This file represents a favorite icon that can be toggled.
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
import IconButton from 'material-ui-next/IconButton';
import ActionFavorite from 'material-ui-icons/Star';
import ActionFavoriteBorder from 'material-ui-icons/StarBorder';
export interface Props {
  checked?: boolean;
  toggleFavorite(event: any):void;
}

export interface State {

}

export default class FavoriteCheckbox extends React.Component<Props, State>{
  public static defaultProps: Partial<Props> = {
     checked: false
  }

  handleToggle = (event) => {
    const {toggleFavorite} = this.props;
    toggleFavorite(event);
  }

  render(){
    const {checked} = this.props;
    const icon = checked ? <ActionFavorite color={"yellow"} /> : <ActionFavoriteBorder color={"white"} />;


    return  <IconButton onClick={this.handleToggle}>{icon}</IconButton>;
  }
}
