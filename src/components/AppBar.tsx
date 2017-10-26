/**
 * @file AppBar.tsx
 * File in charge of Displaying app bar. The app bar contains a left icon, image,
 * and title.
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
import MuiAppBar from 'material-ui-next/AppBar';
import Toolbar from 'material-ui-next/Toolbar';
import Typography from 'material-ui-next/Typography';
//import IconButton from 'material-ui-next/IconButton';
import { withStyles } from 'material-ui-next/styles';
//import MenuIcon from 'material-ui-icons/Menu';
//import {appBarTitleStyle, appBarIconeStyle} from './commonStyles';
//const appIcon = require("../res/images/ui/app_icon_48.png")

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

export interface Props {
  // class AppBar (defined below) will expect to be passed these properties
  leftIcon: JSX.Element,
  rightIcon: JSX.Element,
  title: string;
  onTitleClick: (event: any) => void;
  classes: any;
}

export interface State {
}

// The return value is passed to the title property of the app bar component
const getTitleIcon = (title) => {
           // <div style={{position: 'relative',top: 4}} >
           //   <img style={{width: 40, display: 'block', float: 'left',position: 'relative', top: 6}} src={appIcon} />
           //   <div style={{position: 'relative', top: -5, left: 5}}>{title}</div>
           // </div>
  return <div>
          {title}
         </div>;
}

/**
 * Simple AppBar component that wraps around the material-ui AppBar
 * 
 * @see http://www.material-ui.com/#/components/app-bar
 */
class AppBar extends React.Component<Props, State>{


  render(){
    const {title, leftIcon/*,onTitleClick,rightIcon*/} = this.props;
    return    <MuiAppBar position="static" color="default">
        <Toolbar>
          {leftIcon}

          <Typography type="title" color="inherit">
            {getTitleIcon(title)}
          </Typography>
        </Toolbar>
      </MuiAppBar>;

    // return <MuiAppBar
    //           titleStyle={appBarTitleStyle}
    //           iconStyleLeft={appBarIconeStyle}
    //           title={getTitleIcon(title)}
    //           onTitleTouchTap={onTitleClick}
    //           iconElementLeft={leftIcon}
    //           iconElementRight={rightIcon}
    //           />;
  }
}

export default withStyles(styles)(AppBar);
