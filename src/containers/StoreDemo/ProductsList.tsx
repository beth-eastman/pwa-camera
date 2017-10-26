import {connect} from 'react-redux';
import ProductsListComponent,{FavoriteProductInterface} from '../../components/StoreDemo/ProductsList';
import {ProductInterface} from '../../res/data/products';
import {withRouter} from 'react-router-dom';
import {getProductsAdvancedPaged, getProductSearchText,getProductPage,getProductsPageMax} from './selectors';
import {setProductPage,removeProductFromFavorites,addProductToFavorites} from '../../actions/storeDemo';
interface FavoriteAble {
  isFavorite: boolean;
  id: number;
  [propName: string]: any
}

const calColumns = (state,ownProps) => {
  const width = ownProps.appPage.screen.width;
  if(width > 1200){

    return 6;
  }
  if(width > 600){
    return 4;
  }
  return 2;
}

interface DispatchToPropsInterface{
    itemClick: (product: ProductInterface) => void;
    setPage: (pageIdx: number) => void;
    toggleFavorite: (product: FavoriteAble) => void;
}


interface StateToPropsInterface{
    products: FavoriteProductInterface[];
    searchText: string;
    page: number;
    lastPage: number;
    cols?: number;
}

interface OwnPropsInterface{
   basePath?: string;
   history:{push: any};
   appPage: any;
}

const stateToProps = (state,ownProps):StateToPropsInterface => {
  return {
    products: getProductsAdvancedPaged(state),
    searchText: getProductSearchText(state),
    page: getProductPage(state),
    lastPage: getProductsPageMax(state),
    cols: calColumns(state,ownProps)
  }
}

const dispatchToProps = (dispatch,ownProps) => {
  return {
    itemClick: (product: ProductInterface) => {
       ownProps.history.push(ownProps.basePath + 'products/' + product.id);
    },
    setPage: (pageIdx: number) => {
      dispatch(setProductPage(pageIdx));
    },
    toggleFavorite: (product: FavoriteProductInterface) => {
      if(product.isFavorite){
        dispatch(removeProductFromFavorites(product.id));
      } else {
        dispatch(addProductToFavorites(product.id));
      }
    }
  }
}

export default withRouter(connect<StateToPropsInterface,DispatchToPropsInterface,OwnPropsInterface>(stateToProps,dispatchToProps)(ProductsListComponent));




