// import { categoryFetchSaga, categoryFetchSagaAfterCheck } from "./categorySaga";
import { addToCartSaga, getDeliveryOptionsSaga, productFetchSaga, productModalFetchSaga } from "./productSaga";
// import { storesFetchSaga } from "./storesSaga";
import {
  basketFetchSaga,
  basketFetchAfterAddedSaga,
  basketFetchAfterBasketUpdate, wishListFetchSaga
} from "./basketSaga";
import { spawn } from "redux-saga/effects";
import { categoryFetchSaga, categoryFetchSagaAfterCheck } from "./categorySaga";
import { storesFetchSaga } from "./storesSaga";
import { confirmSaga } from "./confirmSaga";

// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield spawn(categoryFetchSaga);
  yield spawn(categoryFetchSagaAfterCheck);
  yield spawn(productFetchSaga);
  yield spawn(productModalFetchSaga);
  yield spawn(storesFetchSaga);
  yield spawn(basketFetchSaga);
  yield spawn(wishListFetchSaga);
  yield spawn(basketFetchAfterAddedSaga);
  yield spawn(basketFetchAfterBasketUpdate);
  // yield spawn(wishlistFetchAfterBasketUpdate);  // does not exist in the basketSaga file
  yield spawn(getDeliveryOptionsSaga);
  yield spawn(addToCartSaga);
  yield spawn(confirmSaga);
  // yield spawn(execProductBidHistory);
  // yield spawn(execNewProductBid);
}
