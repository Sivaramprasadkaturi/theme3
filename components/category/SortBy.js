import {
  handleSortBySelectChange,
  sortByParamsChangeState
} from "../../redux/actions/facetActions.js";
import { useSelector, shallowEqual } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { useTranslation } from "next-i18next";

const Select = styled.select`
  border: none !important;
  background: #FFFFFF 0% 0% no-repeat padding-box;
  opacity: 1;
  font-size: 14px !important;
    font-weight: 500;
`;

export default function SortBy({ productCount, setSortBy, sortBy }) {
  const { t } = useTranslation("translation");
  const dispatch = useDispatch();
  const filterUrlState = useSelector(state => state.facetReducer.filterUrl);

  const sortByParamsState = useSelector(
    state => state.facetReducer.sortByParams,
    shallowEqual
  );

  const urlFilterParamsState = useSelector(
    state => state.facetReducer.urlFilterParams,
    shallowEqual
  );
  const productCountState = useSelector(
    state => state.categoryReducer.numberOfItems,
    shallowEqual
  );

  const numberOfItems = productCountState || productCount;

  const handleSelectChange = value => {
    let filterUrl = filterUrlState;
    let plainUrl = "";
    let params = "";

    plainUrl = filterUrl.replace(new RegExp("&sortci=\\w*%20\\w*", "g"), "");

    let url = plainUrl;
    if (value !== "Sort By") {
      url = `${plainUrl}${value}`;
    } else {
      value = "";
    }

    if (urlFilterParamsState.includes("sortci")) {
      params =
        urlFilterParamsState.replace(
          new RegExp("&sortci=\\w*%20\\w*", "g"),
          ""
        ) + value;
    } else {
      params = urlFilterParamsState + value;
    }

    dispatch(handleSortBySelectChange(url, params));
    dispatch(sortByParamsChangeState(value));
  };

  return (
    <>
      {numberOfItems > 0 ? (
        <div className="ssrty">
          <img src="https://ik.imagekit.io/ofb/themes/Group_306_w5loOchhS.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1670415621059" />
          <Select
            id="sortby"
            className="form-control sort-decoration"
            name="sortby"
            onChange={e => setSortBy(e.target.value)}
            value={sortBy}
          >
            <option value="">{t("js.category.sortby")}</option>
            <option value="&sortci=stitle%20asc">
              {t("js.category.sortby.atoz")}
            </option>
            <option value="&sortci=newest%20desc">
              {t("js.category.sortby.new")}
            </option>
            <option value="&sortci=price%20asc">
              {t("js.category.sortby.lowtohigh")}
            </option>

            <option value="&sortci=price%20desc">
              {t("js.category.sortby.hightolow")}
            </option>
            <option value="&sortci=topsellers%20asc">
              {t("js.category.sortby.popular")}
            </option>
            <option value="&sortci=orderscount%20desc">
              {t("js.category.sortby.bestsell")}
            </option>
            <option value="&sortci=averagereview%20desc">
              {t("js.category.sortby.rating")}
            </option>
          </Select>
        </div>
      ) : null}
    </>
  );
}
