import {
  ADD_PRODUCTS_FAVORITES,
  FILTER_PRODUCTS,
  SORT_PRODUCTS,
  SET_PRODUCTS_PAGE,
  REMOVE_PRODUCTS_FAVORITES,

  setProductPage,
  sortProducts,
  searchProductText,
  addProductToFavorites,
  removeProductFromFavorites,
  searchProducts
} from '../storeDemo'
import reducer from '../../reducers';
export const initState = (type: string = 'initial test action') => {
  return reducer(undefined,{type});
}
describe("storeDemo actions tests",() => {

  it("Tests that all simple redux actions return correct objects",() => {
    expect(setProductPage(0)).toEqual({type: SET_PRODUCTS_PAGE, page: 0})
    expect(sortProducts('title','desc')).toEqual({
      type: SORT_PRODUCTS,
      sortBy: 'title',
      sortDir: 'desc'
    });
    expect(sortProducts('name')).toEqual({
      type: SORT_PRODUCTS,
      sortBy: 'name',
      sortDir: 'asc'
    });
    expect(searchProductText('cheese')).toEqual({
      type: FILTER_PRODUCTS,
      text: 'cheese'
    });

    expect(addProductToFavorites(3)).toEqual({
      type: ADD_PRODUCTS_FAVORITES,
      id: 3
    });

    expect(removeProductFromFavorites(6)).toEqual({
      type: REMOVE_PRODUCTS_FAVORITES,
      id: 6
    });
  });

  it("Test product search thunk",() => {
    const dispatchMock = jest.fn();
    let currentState: any = initState("Should set and clear the system flash message");
    const searchProductsThunk = searchProducts("chicken dinner");
    searchProductsThunk(dispatchMock,() => currentState);
    expect(dispatchMock.mock.calls.length).toBe(2);
    const setProductPageAction = dispatchMock.mock.calls[0][0];
    const searchProductTextAction = dispatchMock.mock.calls[1][0];
    expect(setProductPageAction).toEqual(setProductPage(0));
    expect(searchProductTextAction).toEqual(searchProductText("chicken dinner"));
  });






});
