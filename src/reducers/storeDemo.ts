/**
 * @file reducers/storeDemo.ts
 * Reducers for the store demo.
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
import {defaultProducts, defaultProductIds} from '../res/data/products';

import {
  ADD_PRODUCTS_FAVORITES,
  REMOVE_PRODUCTS_FAVORITES,
  SORT_PRODUCTS,
  FILTER_PRODUCTS,
  SET_PRODUCTS_PAGE
} from '../actions/storeDemo';

import {arrayPushUnique,arrayRemove} from './_helper';

const defaultFilters = {
  products: {
    sortBy: "default",
    sortDir: "asc",
    filterText: "",
    sortText: "",
    resultsMax: 20,
    currentPage: 0
  }
}


export const products = (state = defaultProducts, action) => {
  return state;
}

export const productIds = (state = defaultProductIds, action) => {
  return state;
}

export const filters = (state = defaultFilters, action) => {
  let newProducts = null;
  switch (action.type) {
    case SORT_PRODUCTS:
      newProducts = {...state.products,sortBy: action.sortBy,sortDir: action.sortDir};
      state = {...state,products: newProducts};
      break;
    case FILTER_PRODUCTS:
      newProducts = {...state.products,filterText: action.text};
      state = {...state,products: newProducts};
      break;
    case SET_PRODUCTS_PAGE:
      newProducts = {...state.products,currentPage: action.page};
      state = {...state,products: newProducts};
      break;
  }
  return state;
}


export const favoriteProductIds = (state = [], action) => {
  switch (action.type) {
    case ADD_PRODUCTS_FAVORITES:
      state = arrayPushUnique(action.id,state);
      break;
    case REMOVE_PRODUCTS_FAVORITES:
      state = arrayRemove(action.id,state);
      break;
  }
  return state;
}
