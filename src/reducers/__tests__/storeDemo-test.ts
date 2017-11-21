import {defaultProducts , defaultProductIds} from '../../res/data/products';

import {
  products,
  productIds,
} from '../storeDemo'

import {
  sortProducts,
  addProductToFavorites,
  removeProductFromFavorites,
  setProductPage,
  searchProductText
} from '../../actions/storeDemo';

import reducer from '../../reducers';

const defaultFilters = {
  products: {
    sortBy: "default",
    sortDir: "asc",
    filterText: "",
    sortText: "",
    resultsMax: 10,
    currentPage: 0
  }
}

import {initState} from './index-test';
describe("Store Demo Reducer tests",() => {
  it('Make sure default product states are set correctly', () => {
    let currentState: any = initState("Store Demo Reducer tests > Set products state");

    expect(currentState.products).toEqual(defaultProducts);
    expect(products(undefined,{})).toEqual(defaultProducts);

    expect(currentState.productIds).toEqual(defaultProductIds);
    expect(productIds(undefined,{})).toEqual(defaultProductIds);


  });

  it('Should test filters state using various actions', () => {
    let currentState: any = initState();

    expect(currentState.filters).toEqual(defaultFilters);

    currentState = reducer(currentState,sortProducts('title','desc'));
    expect(currentState.filters.products.sortBy).toBe("title");
    expect(currentState.filters.products.sortDir).toBe("desc");

    expect(currentState.favoriteProductIds).toEqual([]);
    currentState = reducer(currentState,addProductToFavorites(1));
    expect(currentState.favoriteProductIds).toEqual([1]);
    //enter bogus id
    currentState = reducer(currentState,removeProductFromFavorites(6));
    expect(currentState.favoriteProductIds).toEqual([1]);
    currentState = reducer(currentState,removeProductFromFavorites(1));
    expect(currentState.favoriteProductIds).toEqual([]);
    currentState = reducer(currentState,setProductPage(12));
    expect(currentState.filters.products.currentPage).toBe(12);

    currentState = reducer(currentState,searchProductText('turkey lurkey'));

    expect(currentState.filters.products.filterText).toBe('turkey lurkey');

  });
});