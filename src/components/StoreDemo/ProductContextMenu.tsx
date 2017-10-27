/**
 * @file ProductContextMenu.tsx
 * A menu with interactions for a product (ie: Share)
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
/**
 * @file LeftMenuIcon.tsx
 * The LeftMenuIcon for the store demo. The left menu icon contains a menu and
 * links to different pages.
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

import Menu, { MenuItem } from 'material-ui-next/Menu';
import IconButton from 'material-ui-next/IconButton';
import { withStyles } from 'material-ui-next/styles';
import { withRouter } from 'react-router-dom';
import MoreVertIcon from 'material-ui-icons/MoreVert';
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

export interface Props{
  basePath: string;
  classes: any;
  history: {
    push: (path: string) => void;
  }
}

export interface State{
  anchorEl: any;
  open: boolean;
}

class ProductContextMenu extends React.Component<Props, State>{
  constructor(props){
    super(props);
    this.state = {
      anchorEl: null,
      open: false
    }
  }

  navClick = (path) => {
    const {history} = this.props;
    return (event) => {
      this.setState({ open: false, anchorEl: event.currentTarget });
      history.push(path);
    }
  }

  handleRequestClose = (event) => {
    this.setState({ open: false });
  }

  handleClick = (event) => {
    this.setState({ open: true, anchorEl: event.currentTarget });
  }

  render(){
    const {classes} = this.props;

    return (<div><IconButton className={classes.menuButton}
              aria-label="More"
              aria-owns={this.state.open ? 'contect-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
          >
              <MoreVertIcon />

         </IconButton>
                       <Menu
                id="contect-menu"
                anchorEl={this.state.anchorEl}
                open={this.state.open}
                onRequestClose={this.handleRequestClose}
                PaperProps={{

                }}
              >
                <MenuItem>Add To Cart</MenuItem>
                <MenuItem>Reviews</MenuItem>
                <MenuItem>Save for Later</MenuItem>
              </Menu></div>)
    ;
  }
}

export default withRouter(withStyles(styles)(ProductContextMenu));


