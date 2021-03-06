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
import FavoriteCheckbox from '../FavoriteCheckBox';
import ProductContextMenu from './ProductContextMenu';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import {withStyles} from 'material-ui/styles';
import ShareIcon from 'material-ui-icons/Share';
import IconButton from 'material-ui/IconButton';


//TODO re-implement overlay and favoriting feature
const styles = {
  card: {
    maxWidth: 500,
    margin: '10px auto 0px auto'
  },
  media: {
    height: 500,
  },
};

export interface Props {
  product: ProductInterface;
  appPage: AppPageInterface;
  isFavorite: boolean;
  toggleFavorite: (product: ProductInterface, isFavorite:boolean) => void;
  classes: any;
}

export interface State {

}

export class ProductDetails extends React.Component<Props, State>{

  componentWillMount(){
      const {product,appPage} = this.props;
      appPage.setPageTitle(product.title);
      this.props.appPage.setRightIcon(<ProductContextMenu />);
      this.props.appPage.setBottomNavigation([]);
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
    const {product, classes,isFavorite} = this.props;

    //return   <Card style={{maxWidth: 500,margin: '0px auto 0px auto'}}>
    return   <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={product.image}
        title={product.title}
      />
      <CardContent>
        <Typography type="headline" component="h2">
          {product.title} ${product.price}
        </Typography>
        <Typography type="subheading" component="h4">
          By ACME
        </Typography>
        <Typography component="p">
            {product.description}
        </Typography>
      </CardContent> 
      <CardActions disableActionSpacing>
        <FavoriteCheckbox toggleFavorite={this.handleSetToggle()} checked={isFavorite} />
        <IconButton aria-label="Share">
          <ShareIcon />
        </IconButton>
        <div className={classes.flexGrow} />

      </CardActions>
    </Card>
  }
}

export default withStyles(styles)(ProductDetails);
