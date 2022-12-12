/* Copyright 2020 Avetti.com Corporation - All Rights Reserved

This source file is subject to the Avetti Commerce Front End License (ACFEL 1.20)
that is accessible at https://www.avetticommerce.com/license */
import {
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  UPDATE_BILLING_SUCCESS,
  UPDATE_BILLING_FAILURE,
  UPDATE_SHIPPING_SUCCESS,
  UPDATE_SHIPPING_FAILURE,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  GET_ORDERS_SUCCESS,
  GET_ORDERS_FAILURE,
  GET_SHIPPING_ADDRESSES_SUCCESS,
  GET_SHIPPING_ADDRESSES_FAILURE,
  GET_BILLING_ADDRESS_SUCCESS,
  GET_BILLING_ADDRESS_FAILURE,
  GET_COUNTRIES_SUCCESS,
  GET_COUNTRIES_FAILURE,
  GET_ALLOWANCE_SUCCESS,
  GET_ALLOWANCE_FAILURE
} from "../types.js";

const initialState = {
  key: "",
  errorMessage: "",
  errorMessages: [],
  successMessage: "",
  orders: [],
  shippingAddresses: [],
  availableCountries: [],
  billingAddress: {},
  allowance: {}
};

const accountReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        successMessage: payload
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        errorMessage: payload
      };

    case UPDATE_BILLING_SUCCESS:
      return {
        ...state,
        successMessage: payload
      };
    case UPDATE_BILLING_FAILURE:
      return {
        ...state,
        errorMessage: payload
      };
    case UPDATE_SHIPPING_SUCCESS:
      return {
        ...state,
        successMessage: payload
      };
    case UPDATE_SHIPPING_FAILURE:
      return {
        ...state,
        errorMessage: payload
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        successMessage: payload,
        errorMessage: "",
        errorMessages: ""
      };
    case UPDATE_PASSWORD_FAILURE:
      return {
        ...state,
        errorMessage: payload
      };
    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: payload
      };
    case GET_ORDERS_FAILURE:
      return {
        ...state,
        errorMessage: payload
      };

    case GET_SHIPPING_ADDRESSES_SUCCESS:
      return {
        ...state,
        shippingAddresses: payload
      };
    case GET_SHIPPING_ADDRESSES_FAILURE:
      return {
        ...state,
        errorMessage: payload
      };

    case GET_BILLING_ADDRESS_SUCCESS:
      console.log(`GET_BILLING_ADDRESS_SUCCESS: ${payload}`);
      return {
        ...state,
        billingAddress: payload
      };

    case GET_BILLING_ADDRESS_FAILURE:
      return {
        ...state,
        errorMessage: payload
      };

    case GET_COUNTRIES_SUCCESS:
      return {
        ...state,
        availableCountries: payload
      };

    case GET_COUNTRIES_FAILURE:
      return {
        ...state,
        errorMessage: payload
      };

    case GET_ALLOWANCE_SUCCESS:
      return {
        ...state,
        allowance: payload
      };

    case GET_ALLOWANCE_FAILURE:
      return {
        ...state,
        errorMessage: payload
      };

    default:
      return state;
  }
};

export default accountReducer;
