/**
 * @file actions/storeDemo.ts
 * Actions for the Store Demo.
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
export const ADD_PRODUCTS_FAVORITES = 'T2.ADD_PRODUCTS_FAVORITES';
export const REMOVE_PRODUCTS_FAVORITES = 'T2.REMOVE_PRODUCTS_FAVORITES';
export const SORT_PRODUCTS = 'T2.SORT_PRODUCTS';
export const FILTER_PRODUCTS = 'T2.FILTER_PRODUCTS';
export const SET_PRODUCTS_PAGE = 'T2.SET_PRODUCTS_PAGE';

export const setProductPage = (page: number) => {
  return {
    type: SET_PRODUCTS_PAGE,
    page
  }
}


export const sortProducts = (sortBy: string, sortDir = 'asc') => {
  return {
    type: SORT_PRODUCTS,
    sortBy,
    sortDir
  }
}

export const searchProducts = (text: string) => {
  return (dispatch,getState) => {
      //search change pagination so must reset page on
      // any action which filters results
      dispatch(setProductPage(0));
      dispatch(searchProductText(text));
  }
}

export const searchProductText = (text: string) => {
  return {
    type: FILTER_PRODUCTS,
    text
  }
}

export const addProductToFavorites = (productId:number) => {
  return {
    type: ADD_PRODUCTS_FAVORITES,
    id: productId
  }
}

export const removeProductFromFavorites = (productId:number) => {
  return {
    type: REMOVE_PRODUCTS_FAVORITES,
    id: productId
  }
}
