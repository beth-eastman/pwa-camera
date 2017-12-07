/**
 * @file ProductFavoritesListPage.tsx
 * A list of favorited products.
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
import ProductListItem from './ProductListItem';
import List from 'material-ui/List';
import {AppPageInterface} from '../Main';
import {whiteContainer} from '../commonStyles';

export interface Props {
  products:ProductInterface[];
  removeFavorite(product: ProductInterface): void;
  itemClick(product: ProductInterface): void;
  appPage: AppPageInterface;
}

export interface State {

}

export default class ProductFavoritesListPage extends React.Component<Props, State>{

  componentWillMount(){
    this.props.appPage.setPageTitle("Favorites");
  }

  handleItemClick = (product) => {
      const {itemClick} = this.props;
      itemClick(product);
  }
  render(){
    const {products} = this.props;
    const hasFavorites = products.length > 0;
    return <div style={whiteContainer}>
              <List>
                {!hasFavorites && <h3>Your Favorites List is empty</h3>}
                {products.map(product => {
                  return <ProductListItem key={product.id} itemClick={this.handleItemClick} product={product} />
                })}
              </List>

           </div>;
  }
}
