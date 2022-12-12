/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import { call, put, take, takeLatest } from "redux-saga/effects";

import {
  addToCartActions,
  deliveryOptionsActions,
  GET_ITEM_FETCH_REQUEST,
  GET_MODAL_ITEM_FETCH_REQUEST
} from "../types";
import {
  addToCartProduct,
  fetchFunctionSaga,
  fetchModalProductAction
} from "../actions/productActions";
import { confirmSaga } from "./confirmSaga";
import { GET_DELIVERY_OPTIONS } from "../links";

export function* productFetchSaga() {
  yield takeLatest(GET_ITEM_FETCH_REQUEST, fetchFunctionSaga);
}
export function* productModalFetchSaga() {
  yield takeLatest(GET_MODAL_ITEM_FETCH_REQUEST, fetchModalProductAction);
}

const api = async (link, options = options || {}) => {
  try {
    const res = await fetch(link, options);
    return await res.json();
  } catch (err) {
    console.error("err fetch product saga api", err);
  }
};

export function* getDeliveryOptionsSaga() {
  while (true) {
    const { payload } = yield take(
      deliveryOptionsActions.REQUEST_DELIVERY_OPTIONS
    );

    console.info("deliveryOptionsActions", payload);
    let form = payload.form;

    try {
      const json = yield call(api, GET_DELIVERY_OPTIONS, {
        method: "POST",
        body: form,
        headers: {
          Accept: "*/*",
          credentials: "include"
        }
      });

      yield put({
        type: deliveryOptionsActions.SUCCESS_DELIVERY_OPTIONS
      });
      yield put({
        type: addToCartActions.REQUEST_ADD_TO_CART,
        payload: { ...payload, json }
      });
    } catch (err) {
      console.error("getDeliveryOptionsFailed", err);
      yield put({
        type: deliveryOptionsActions.FAILURE_DELIVERY_OPTIONS,
        payload: err
      });
    }
  }
}

export function* addToCartSaga() {
  while (true) {
    const { payload } = yield take(addToCartActions.REQUEST_ADD_TO_CART);

    console.info("addToCartSaga", payload);

    /* Jump into the confirm saga to handle confirmation logic if json has confirmation */
    let confirmationDialog =
      payload &&
      payload.json &&
      payload.json.__Result &&
      payload.json.__Result.ok;

    if (confirmationDialog) {
      const confirmed = yield call(confirmSaga, payload.json);

      if (!confirmed) {
        continue;
      }
    }

    try {
      let { id, qty, json, distributorId, attributesObject, quoteMode, vid } =
        payload;

      yield put(
        addToCartProduct(
          id,
          qty,
          distributorId,
          attributesObject,
          quoteMode,
          vid
        )
      );
    } catch (err) {
      console.error("addToCartSagaFailed", err);
      yield put({
        type: addToCartActions.FAILURE_ADD_TO_CART,
        payload: err
      });
    }
  }
}
