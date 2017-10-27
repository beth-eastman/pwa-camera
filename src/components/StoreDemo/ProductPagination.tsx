/**
 * @file Main.tsx
 * Component renders the pagination for lists of results.
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
// import FirstPageIcon from 'material-ui-icons/FirstPage';
// import LastPageIcon from 'material-ui-icons/LastPage';
// import NextPageIcon from 'material-ui-icons/ChevronRight';
// import PrevPageIcon from 'material-ui-icons/ChevronLeft';
export interface Props {
  setPage: (pageIdx: number) => void;
  page: number;
  lastPage: number;
}

export interface State {

}

export default class ProductPagination extends React.Component<Props, State>{

  onShowMore = (event) => {
    const {page,setPage} = this.props;
    event.preventDefault();
    event.stopPropagation();
    setPage(page + 1);
  }

  onShowLess = (event) => {

    const {page,setPage} = this.props;
    event.preventDefault();
    event.stopPropagation();
    setPage(page - 1);
  }

  prevPage = (event) => { // Alias method
    this.onShowLess(event);
  }

  nextPage = (event) => { // Alias method
    this.onShowMore(event);
  }

  onShowFirst = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.props.setPage(0);
  }

  onShowLast = (event) => {
    const {lastPage,setPage} = this.props;
    event.preventDefault();
    event.stopPropagation();
    setPage(lastPage - 1);
  }

  render(){

      return <h1>Comming Soon</h1>;
        // return <div>
        //    <IconButton disabled={!(page > 0)} onTouchTap={this.onShowFirst}>
        //      <FirstPageIcon />
        //    </IconButton>
        //    <IconButton disabled={!(page > 0)} onTouchTap={this.onShowLess}>
        //      <PrevPageIcon />
        //    </IconButton>
        //    <IconButton disabled={!(page < lastPage - 1)} label={'Next'} onTouchTap={this.onShowMore}>
        //      <NextPageIcon />
        //    </IconButton>
        //    <IconButton disabled={!(page < lastPage - 1)}  onTouchTap={this.onShowLast}>
        //      <LastPageIcon />
        //    </IconButton>
        // </div>;
  }
}
