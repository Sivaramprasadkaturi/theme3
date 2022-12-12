import {
  FETCH_WISHLIST, FETCH_WISHLIST_CART_SUCCESS,
  FETCH_WISHLIST_SUCCESS, REQUEST_WISHLIST_AFTER_WISHLIST_UPDATE, SET_WISHLIST_LOADING_AFTER_UPDATE,
  TOGGLE_WISHLIST_SUCCESS,
  WISHLIST_ADD_REDUX,
  WISHLIST_REMOVE_REDUX
} from "../types.js";
import { GET_WISHLIST, WISHLIST_LINK } from "../links";
import { getStore } from "../../store";
import { call, put } from "redux-saga/effects";

export const addFunctionWishList = wishlist => ({
  type: WISHLIST_ADD_REDUX,
  payload: wishlist
});

export const fetchWishlistAction = products => ({
  type: FETCH_WISHLIST_SUCCESS,
  payload: products
});

export const setWishListLoadingAfterUpdate = payload => ({
  type: SET_WISHLIST_LOADING_AFTER_UPDATE,
  payload
});

export const fetchWishListCartAction = products => ({
  type: FETCH_WISHLIST_CART_SUCCESS,
  payload: products
});

export const fetchWishList = () => async dispatch => {
  const api_call = await fetch(GET_WISHLIST());

  const wishlist = await api_call.json();

  const wishlistCount = wishlist.__Result.total;

  console.log("wishlist4", wishlist);
  console.log("wishlist5", wishlistCount);

  // const data = await fetch(
  //   "https://previewdev.open4business.io/preview/wishlistservice.ajx?vid=20180521148&action=get&p=1"
  // );
  // let wishlist = await data.json();

  dispatch({ type: FETCH_WISHLIST, payload: wishlist });
};

export const removeFunctionWishList = wishlist => ({
  type: WISHLIST_REMOVE_REDUX,
  payload: wishlist
});

export const toggleWishListAction = (
  id,
  title,
  code,
  desc,
  currency_sign,
  image,
  price,
  allPrices,
  url,
  wishListState,
  hasAttributes
) => {
  return dispatch => {
    id = String(id);

    if (!wishListState?.some(w => w.id == id)) {
      dispatch(
        addFunctionWishList([
          ...wishListState,
          {
            id,
            title,
            code,
            desc,
            currency_sign,
            image,
            price,
            allPrices,
            url,
            hasAttributes
          }
        ])
      );
    } else {
      let tempWishList = wishListState.filter(w => w.id != id);
      dispatch(addFunctionWishList([...tempWishList]));
    }
  };
};

const api = async params => {
  try {
    let link = params.link;
    const res = await fetch(
      link ? link() : WISHLIST_LINK(params.language, params.vid)
    );

    const json = await res.json();
    let wishlists = json.__Result;

    return wishlists;
  } catch (error) {
    console.warn("fetch WISHLIST_LINK failed", error);
  }
};

export const removeWishListAction = (id, wishListState) => {
  return dispatch => {
    id = String(id);
    let wishListTemp = wishListState || [];
    if (wishListState.length > 0 && wishListTemp.some(w => w.id == id)) {
      let tempWishList = wishListTemp.filter(w => w.id != id);
      console.log("tempWishList", tempWishList);
      // localStorage.setItem("wishList", JSON.stringify(tempWishList));
      dispatch(removeFunctionWishList([...tempWishList]));
    }
  };
};

export function* fetchWishListAction(action) {
  let language = getStore().getState().mainReducer.lang;
  let currency = getStore().getState().mainReducer.currency;
  let params = { language, currency };

  try {
    const result = yield call(api, params);
    const suppliersResult = yield call(api, { ...params, link: WISHLIST_LINK });
    console.log({ suppliersResult });
    yield put(fetchWishlistAction(result));
    //yield put(fetchSupplierBasketSuccessAction(suppliersResult));
    if (action.type === REQUEST_WISHLIST_AFTER_WISHLIST_UPDATE) {
      yield put(setWishListLoadingAfterUpdate(false));
    }
  } catch (error) {
    console.error("fetch wishlist saga error", error);
    if (action.type === REQUEST_WISHLIST_AFTER_WISHLIST_UPDATE) {
      yield put(setWishListLoadingAfterUpdate(false));
    }
  }
}
