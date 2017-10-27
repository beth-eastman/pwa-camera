/**
 * @file ProductDetails.tsx
 * Detail information for a product.
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
import {ProductInterface} from '../../res/data/products';
import {AppPageInterface} from '../Main';
//import FavoriteCheckbox from '../FavoriteCheckBox';
import ProductContextMenu from './ProductContextMenu';
import Card, { /*CardActions,*/ CardContent, CardMedia } from 'material-ui-next/Card';
import Typography from 'material-ui-next/Typography';

//TODO re-implement overlay and favoriting feature
export interface Props {
  product: ProductInterface;
  appPage: AppPageInterface;
  isFavorite: boolean;
  toggleFavorite: (product: ProductInterface, isFavorite:boolean) => void;
}

export interface State {

}

export default class ProductDetails extends React.Component<Props, State>{

  componentWillMount(){
      const {product,appPage} = this.props;
      appPage.setPageTitle(product.title);
      this.props.appPage.setRightIcon(<ProductContextMenu />);
      //this.props.appPage.setTabs([]);
  }

  handleSetToggle = () => {
    const {toggleFavorite,isFavorite,product,appPage} = this.props;
    return () => {
      const favMessage = isFavorite ? "Removed Favorite" : "Added Favorite";
      appPage.sendMessage(favMessage);
      toggleFavorite(product,isFavorite);
    }
  }

  render(){
    const {product/*,isFavorite*/} = this.props;

    //return   <Card style={{maxWidth: 500,margin: '0px auto 0px auto'}}>
    return   <Card>
      <CardMedia
        image={product.image}
        title={product.title}
        // overlay={<CardTitle title={<div>${product.price}

        //   <div style={{position: 'absolute',top: 10, right: 0}}>
        //     <FavoriteCheckbox toggleFavorite={this.handleSetToggle()} checked={isFavorite} />
        //   </div>
        // </div>}  />}
      />
      <CardContent>
        <Typography type="headline" component="h2">
          {product.title}
        </Typography>
        <Typography type="subheading" component="h4">
          By ACME
        </Typography>
        <Typography component="p">
            {product.description}
        </Typography>
      </CardContent> 
    </Card>
  }
}
