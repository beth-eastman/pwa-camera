/**
 * @file LeftMenuIcon.tsx
 * The LeftMenuIcon is an icon that opens an menu.
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
//import IconMenu from 'material-ui-next/IconMenu';

//import Menu, { MenuItem } from 'material-ui-next/Menu';
import IconButton from 'material-ui-next/IconButton';
// import { Link } from 'react-router-dom';

import MenuIcon from 'material-ui-icons/Menu';
// import { withStyles } from 'material-ui-next/styles';
// const styles = theme => ({
//   root: {
//     marginTop: theme.spacing.unit * 3,
//     width: '100%',
//   },
//   flex: {
//     flex: 1,
//   },
//   menuButton: {
//     marginLeft: -12,
//     marginRight: 20,
//   },
// });
    // <IconMenu

    //   iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
    //   anchorOrigin={{horizontal: 'left', vertical: 'top'}}
    //   targetOrigin={{horizontal: 'left', vertical: 'top'}}
    // >
    //   <MenuItem containerElement={<Link to="/" />} primaryText="Home" />
    //   <MenuItem containerElement={<Link to="/store" />} primaryText="Store Demo" />
    // </IconMenu>
const LeftMenuMain = ():React.ReactElement<any> => {
  //className={classes.menuButton} 
  return (
    <IconButton color="contrast" aria-label="Menu">
      <MenuIcon />
    </IconButton>
    );
}


export default LeftMenuMain;
