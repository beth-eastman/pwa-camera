/**
 * @file Eula.tsx
 * File renders a EULA (End User Licensing Agreement) as a popup dialog.
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
import Button from 'material-ui-next/Button';
import { withStyles } from 'material-ui-next/styles'
//import {fullWidthDialagStyle} from './commonStyles';
import {eula} from '../res/data/settings';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui-next/Dialog';

const styles = {
  paragraph: {
      marginBottom: 15
  }
}

interface MyProps {
  eulaAccepted: boolean;
  accept(): any;
  reject(): any;
  hideRejectButton: boolean;
  classes: any;
}

interface MyState {
  suppressOpen: boolean;
}

export class Eula extends React.Component<MyProps, MyState> {
  constructor(props){
    super(props);
    this.state = {suppressOpen: true};
  }
  componentDidMount(){
    //This delay allows for data rehydration before checking if the 
    //User has accepted the EULA
    setTimeout(() => {
      this.setState({suppressOpen: false});
    },1000);
  }

  render(){
    const {accept,reject,eulaAccepted,hideRejectButton,classes} = this.props;
   
    let actions = [
      <Button
        color="primary"
        key='acceptbtn'
        onClick={accept}
      >Accept</Button>
    ];

    //On iOS and Web this is hidden
    if(!hideRejectButton){
      actions.push(<Button
            key='rejectbtn'
            color="primary"
            onClick={reject}
        >Reject</Button>);
    }

    return (
      <div>

        <Dialog
          title="EULA"
          open={!eulaAccepted && !this.state.suppressOpen}
        >
          <DialogTitle>{eula.title}</DialogTitle>
          <DialogContent>
            {eula.paragraphs.map((para,i) => {
              return <DialogContentText className={classes.paragraph} key={i}>{para}</DialogContentText>;
            })}
          </DialogContent>
          <DialogActions>
            {actions}
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(Eula)
