import { SHOW_CONFIRM, HIDE_CONFIRM } from "../types";

export const showConfirmation = payload => ({
  type: SHOW_CONFIRM,
  payload: payload
});

export const hideConfirmation = () => ({
  type: HIDE_CONFIRM
});
