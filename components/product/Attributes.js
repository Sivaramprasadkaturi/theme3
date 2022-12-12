import * as classes from "../product/Styles/Attributes.module.css";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { GET_ATTRIBUTE_LINK, GET_PRICE_INVENTORY } from "../../redux/links";
import {
  changeProductAttributesAction,
  changeProductCheckboxAttributesAction,
  fetchingProductPriceInventory,
  fetchingProductRequestSaga,
  reFetchProductInitialState,
  setAttributeCheckboxFlagAction,
  setAttributesDetailsAction,
  setProductCheckboxAttributesPriceInventoryRecordAction,
  setProductSwitchImageAction,
  unMountProductPageAction
} from "../../redux/actions/productActions";
import { usePrevious } from "../../utils/functions";
import { ColorArray, ColorItem, ColorSpan } from "../../theme/product";

const Attributes = () => {
  const dispatch = useDispatch();
  const {
    skus: currentItemSkusState,
    mainProductSkuIds,
    mainProductSkus,
    attributes: attributesState,
    itemId: itemIdState,
    mainitemid: mainItemIdState,
    code: itemCodeState
  } = useSelector(state => state.productReducer.itemDetail, shallowEqual);

  const [attributeJson, setAttributeJson] = useState([]);
  const [counter, setCounter] = useState(0);
  const [mainAttribute, setMainAttribute] = useState(null);
  const [skuEnabledAttrIds, setSkuEnabledAttrIds] = useState([]);
  const [mainAttributeidWithCombinations, setMainAttributeidWithCombinations] =
    useState({});
  const [availableOtherOptions, setAvailableOtherOptions] = useState({});

  const productAttributeCheckboxFlagState = useSelector(
    state => state.productReducer.productAttributeCheckboxFlag,
    shallowEqual
  );

  console.log(
    "productAttributeCheckboxFlagState",
    productAttributeCheckboxFlagState
  );

  const selectedProductAttributesState = useSelector(
    state => state.productReducer.selectedProductAttributes,
    shallowEqual
  );

  console.log("selectedProductAttributesState", selectedProductAttributesState);
  const selectedProudctCheckboxPriceInventoryState = useSelector(
    state =>
      state.productReducer.selectedProductCheckboxAttributes.priceInventory,
    shallowEqual
  );

  const previousStockCounts = usePrevious(
    selectedProudctCheckboxPriceInventoryState
  );
  console.log(
    "previousStockCounts",
    selectedProudctCheckboxPriceInventoryState,
    previousStockCounts
  );

  const selectedProductCheckBoxAttributesState = useSelector(
    state => state.productReducer.selectedProductCheckboxAttributes,
    shallowEqual
  );

  const checkBoxItemsState = useSelector(
    state => state.productReducer.checkboxItems,
    shallowEqual
  );

  const productInitialIdState = useSelector(
    state => state.productReducer.productInitial.id,
    shallowEqual
  );

  const mainProductPriceInventoryState = useSelector(
    state => state.productReducer.priceInventory,
    shallowEqual
  );

  const attributeDetailsState = useSelector(
    state => state.productReducer.itemDetail.attributeDetails,
    shallowEqual
  );

  const handleMappingInitialSelectedAttributesToReduxState = obj => {
    dispatch(changeProductAttributesAction(obj));
  };

  const isNonSkuEnabledAttribute = attrId => {
    if (currentItemSkusState && currentItemSkusState.length > 0) {
      return !currentItemSkusState.some(sku => sku.attributeid === attrId);
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (
      selectedProductAttributesState &&
      selectedProductAttributesState[mainItemIdState || itemIdState] &&
      Object.keys(
        selectedProductAttributesState[mainItemIdState || itemIdState]
      ).length > 0 &&
      currentItemSkusState &&
      currentItemSkusState.length > 0
    ) {
      let selectedProductAttributeIdsAndOptionsIds = Object.values(
        selectedProductAttributesState[mainItemIdState || itemIdState]
      );
      let wantedSkuId;

      // Should filter out the non sku enabled attributes
      selectedProductAttributeIdsAndOptionsIds =
        selectedProductAttributeIdsAndOptionsIds.filter(attr =>
          skuEnabledAttrIds.includes(attr.attributeid)
        );
      console.info("selected5", selectedProductAttributeIdsAndOptionsIds);

      let proceed = true;

      if (
        Object.keys(mainAttributeidWithCombinations).length > 0 &&
        selectedProductAttributeIdsAndOptionsIds.length > 0 &&
        selectedProductAttributeIdsAndOptionsIds.some(
          item => item.attributeid == mainAttribute
        )
      ) {
        wantedSkuId = mainAttributeidWithCombinations[mainAttribute].filter(
          attr => {
            return (
              attr.mainOptionId ==
              selectedProductAttributeIdsAndOptionsIds.filter(
                item => item.attributeid == mainAttribute
              )[0].optionid
            );
          }
        );
      } else {
        proceed = false;
      }

      console.info("proceed", proceed, wantedSkuId, mainAttribute);

      if (proceed) {
        // Filter available other options
        let mainAttributeOptionId =
          selectedProductAttributeIdsAndOptionsIds.filter(
            attr => attr.attributeid == mainAttribute
          )[0].optionid;

        let filteredAttrs = mainAttributeidWithCombinations[
          mainAttribute
        ].filter(item => item.mainOptionId == mainAttributeOptionId);

        console.info("filteredAttrs", filteredAttrs);

        // Find available options for the given main attribute (color for instance is  the main attribute for most products in b2b2c)
        let tempAvailableOptions = {};
        for (let filteredAttr of filteredAttrs) {
          console.info("mainatt - filteredAttr", filteredAttr);
          let keys = Object.keys(filteredAttr);
          for (let key of keys) {
            let value = filteredAttr[key];
            if (key != "mainOptionId" && key != "skuid") {
              if (!tempAvailableOptions.hasOwnProperty(key)) {
                tempAvailableOptions[key] = [];
              }
              tempAvailableOptions[key] = [...tempAvailableOptions[key], value];
            }
          }
        }
        console.info("mainatt - temp available options", tempAvailableOptions);
        // set available other options here
        setAvailableOtherOptions(availableOtherOptions => {
          if (
            !availableOtherOptions.hasOwnProperty(
              mainItemIdState || itemIdState
            )
          ) {
            availableOtherOptions[mainItemIdState || itemIdState] = [];
          }
          return {
            ...availableOtherOptions,
            [mainItemIdState || itemIdState]: {
              ...availableOtherOptions[mainItemIdState || itemIdState],
              ...tempAvailableOptions
            }
          };
        });

        console.info(
          "mainatt - available other item state",
          availableOtherOptions
        );

        for (let selectedAttribute of selectedProductAttributeIdsAndOptionsIds) {
          const { attributeid, optionid } = selectedAttribute;
          if (attributeid != mainAttribute) {
            wantedSkuId = wantedSkuId.filter(
              item => item[attributeid] === optionid
            )[0];
          }
        }

        console.info("proceed444", wantedSkuId);
        if (wantedSkuId.length == 1) {
          console.info("proceed555", wantedSkuId);
          wantedSkuId = wantedSkuId[0];
        }

        console.info(
          "selectedProductAttributeIdsAndOptionsIds",
          selectedProductAttributeIdsAndOptionsIds,
          wantedSkuId
        );
        if (wantedSkuId && wantedSkuId.skuid) {
          dispatch(fetchingProductRequestSaga(wantedSkuId.skuid));
          dispatch(fetchingProductPriceInventory(wantedSkuId.skuid));
        }
      }
    }
  }, [selectedProductAttributesState]);

  useEffect(() => {
    console.info("Attribute MOUNTED", attributeJson);

    return () => {
      console.info("Attribute WILL UNMOUNT", attributeJson);
      dispatch(unMountProductPageAction());
      setAttributeJson([]);
      setCounter(0);
    };
  }, []);

  const mainProductInventoryQty =
    mainProductPriceInventoryState &&
    mainProductPriceInventoryState.invs &&
    mainProductPriceInventoryState.invs[0] &&
    mainProductPriceInventoryState.invs[0].instock;

  useEffect(() => {
    if (currentItemSkusState && currentItemSkusState.length > 0) {
      if (mainAttribute) {
        console.info(
          "setMainAttr3",
          currentItemSkusState,
          mainAttribute,
          mainItemIdState
        );
        let tempMainAttributeCombinations = {};

        if (
          Object.keys(tempMainAttributeCombinations).includes(
            String(mainAttribute)
          ) === false
        ) {
          tempMainAttributeCombinations[mainAttribute] = [];
        }

        currentItemSkusState.forEach(sku => {
          const { attributeid, optionid, skuid } = sku;

          if (attributeid == mainAttribute) {
            tempMainAttributeCombinations[mainAttribute] = [
              ...tempMainAttributeCombinations[mainAttribute],
              { mainOptionId: optionid, skuid }
            ];
          }
        });

        currentItemSkusState.forEach(sku => {
          const { attributeid, optionid, skuid } = sku;

          if (attributeid != mainAttribute) {
            let foundAtIndex = -1;
            foundAtIndex = tempMainAttributeCombinations[
              mainAttribute
            ].findIndex(item => item.skuid == skuid);

            tempMainAttributeCombinations[mainAttribute][foundAtIndex] = {
              ...tempMainAttributeCombinations[mainAttribute][foundAtIndex],
              [attributeid]: optionid
            };
          }
        });

        setMainAttributeidWithCombinations(tempMainAttributeCombinations);
      }
    }
  }, [currentItemSkusState, mainAttribute]);

  useEffect(() => {
    if (productInitialIdState && itemIdState) {
      if (productInitialIdState != itemIdState) {
        console.info("refetch initial state", itemIdState);
        dispatch(reFetchProductInitialState("", itemIdState));
      }
    }
  }, [itemIdState]);

  useEffect(() => {
    if (
      productAttributeCheckboxFlagState &&
      productAttributeCheckboxFlagState.checkbox &&
      attributeDetailsState &&
      attributeDetailsState.length === 1
    ) {
      const mainProductSkusOptions =
        currentItemSkusState &&
        currentItemSkusState.map(sku => {
          return sku.optionid;
        });

      const firstAvailableOption = attributeDetailsState[0].options.find(
        opt => {
          return mainProductSkusOptions.includes(opt.optionid);
        }
      );

      if (firstAvailableOption) {
        const { attributeid, optionid } = firstAvailableOption;
        handleCheckBoxChecked(null, true, attributeid, optionid, true);
      }

      const skuIdsExceptForTheFirstAvailableOne = currentItemSkusState.filter(
        sku => {
          return sku.optionid !== firstAvailableOption.optionid;
        }
      );

      skuIdsExceptForTheFirstAvailableOne.forEach(sku => {
        const { attributeid, optionid } = sku;
        fetchSkuPriceInventoryData(optionid, sku.skuid);
      });
    }
  }, [
    productAttributeCheckboxFlagState,
    attributeDetailsState,
    currentItemSkusState
  ]);

  useEffect(() => {
    if (
      attributesState &&
      attributesState.length > 0 &&
      attributeJson.length === 0 &&
      currentItemSkusState
    ) {
      console.info("counter", counter);
      setCounter(counter + 1);
      console.info("attributes", attributesState);
      let tempArr = [];
      let tempSkuEnabledAttrs = [];
      let mainAttrIsSet = false;

      if (counter === 0) {
        for (let attribute of attributesState) {
          let isSkuEnabled = false;
          if (!isNonSkuEnabledAttribute(attribute.attributeid)) {
            isSkuEnabled = true;

            if (mainAttrIsSet === false) {
              setMainAttribute(attribute.attributeid);
              mainAttrIsSet = true;
            }
          }
          console.info(
            "counter fetching",
            GET_ATTRIBUTE_LINK(attribute.attributeid, "en")
          );
          fetch(GET_ATTRIBUTE_LINK(attribute.attributeid, "en"))
            .then(res => res.json())
            .then(json => {
              let jsonResult = json.__Result[0];
              jsonResult.position = attribute.position;
              jsonResult.skuEnabled = isSkuEnabled;

              tempArr = [...tempArr, jsonResult];
              if (isSkuEnabled)
                tempSkuEnabledAttrs = [
                  ...tempSkuEnabledAttrs,
                  attribute.attributeid
                ];
              if (tempArr.length === attributesState.length) {
                tempArr.sort((a, b) => a.position - b.position);
                setAttributeJson(tempArr);
                if (
                  attributesState.length === 1 &&
                  currentItemSkusState.length > 0
                ) {
                  const format = tempArr[0].format;

                  dispatch(
                    setAttributeCheckboxFlagAction({
                      checkbox: true,
                      format:
                        format === "" || format.toLowerCase() === "r"
                          ? "radio"
                          : ""
                    })
                  );
                }
                console.log("tempArr", tempArr, attributesState);
                dispatch(setAttributesDetailsAction(tempArr));

                setSkuEnabledAttrIds(tempSkuEnabledAttrs);
              }
            })
            .catch(err => console.error(err));
        }

        if (mainItemIdState != 0 && currentItemSkusState.length > 0) {
          let selectedAttributesObj = {};
          currentItemSkusState.forEach(sku => {
            selectedAttributesObj[sku.attributeid] = {
              attributeid: sku.attributeid,
              optionid: sku.optionid
            };
          });

          console.info("selectedAttributesObj", selectedAttributesObj);

          selectedAttributesObj = {
            [mainItemIdState]: { ...selectedAttributesObj }
          };

          handleMappingInitialSelectedAttributesToReduxState(
            selectedAttributesObj
          );
        }
      }
    }
  }, [attributesState, currentItemSkusState]);

  const handleAttributeOptionClicked = obj => {
    handleSettingSelectedAttributesToReduxState(obj);
  };

  const renderAttributeOptionsHeader = attr => {
    let { prompt, attributeid } = attr;
    console.info("attr header", attr);
    let itemId = mainItemIdState || itemIdState;
    let selectedColorText =
      (selectedProductAttributesState[itemId] &&
        selectedProductAttributesState[itemId][attributeid] &&
        selectedProductAttributesState[itemId][attributeid].ddtext) ||
      "";
    //let headerAction = screenname.includes("Request") ? `Enter` : "Select";
    return (
      <div className="attribute-option-header">
        <h4 className="attribute-option-title">
          {`${prompt.replace("Select_Weight", "Select Weight").replace("Color", "Please Select Favorite Color")} `}
          {/* <span style={{ fontWeight: "normal" }}>{selectedColorText}</span> */}
          {/* <span
            style={{ fontWeight: "normal", color: "#1FB53A", fontSize: "18px" }}
          >
            Min Order: 50 Units
          </span> */}
        </h4>
      </div>
    );
  };

  const handleSettingSelectedAttributesToReduxState = obj => {
    console.info("attr obj", obj);
    let tempAttributes = { ...selectedProductAttributesState };
    let itemId = mainItemIdState || itemIdState;
    if (Object.keys(tempAttributes).includes(String(itemId)) === false) {
      tempAttributes = { ...tempAttributes, [itemId]: {} };
    }
    dispatch(
      changeProductAttributesAction({
        ...tempAttributes,
        [itemId]: {
          ...tempAttributes[itemId],
          [obj.attributeid]: obj
        }
      })
    );
  };

  const handleSettingSelectedCheckboxAttributesToReduxState = (
    obj,
    radioBtn
  ) => {
    let tempAttributes = { ...selectedProductCheckBoxAttributesState };
    let attributeid = obj.attributeid;
    if (Object.keys(tempAttributes).includes(String(attributeid)) === false) {
      tempAttributes = { ...tempAttributes, [attributeid]: [] };
    }
    if (radioBtn) {
      dispatch(
        changeProductCheckboxAttributesAction({
          ...tempAttributes,
          [attributeid]: [obj.optionid]
        })
      );
    } else {
      if (obj.checked) {
        dispatch(
          changeProductCheckboxAttributesAction({
            ...tempAttributes,
            [attributeid]: [...tempAttributes[attributeid], obj.optionid]
          })
        );
      } else {
        dispatch(
          changeProductCheckboxAttributesAction({
            ...tempAttributes,
            [attributeid]: [
              ...tempAttributes[attributeid].filter(id => id != obj.optionid)
            ]
          })
        );
      }
    }
  };

  const handleAttributeCheckboxChecked = (obj, radioBtn) => {
    console.log("asd213123", obj, radioBtn);
    handleSettingSelectedCheckboxAttributesToReduxState(obj, radioBtn);
  };

  const handleCheckBoxChecked = (
    e,
    checked,
    attributeid,
    optionid,
    radioBtn
  ) => {
    let obj = { checked, attributeid, optionid };
    if (checked && selectedProudctCheckboxPriceInventoryState) {
      let skuid = mainProductSkus.find(obj => obj.optionid === optionid).skuid;
      if (
        !Object.keys(selectedProudctCheckboxPriceInventoryState).includes(
          String(optionid)
        )
      ) {
        fetch(
          GET_PRICE_INVENTORY.replace("$PRODUCT", skuid).replace(
            "$LANGUAGE",
            "en"
          )
        )
          .then(res => res.json())
          .then(json => {
            console.info("borop variant price record", json);
            json.__Result[0].qty = 1;
            dispatch(
              setProductCheckboxAttributesPriceInventoryRecordAction({
                [optionid]: json.__Result[0]
              })
            );
          })
          .catch(err =>
            console.error("error fetching variant price inventory", err)
          );
      }
    }
    handleAttributeCheckboxChecked(obj, radioBtn);
  };

  const renderCheckBoxAttributes = (attr, options) => {
    const { dropname, prompt, switchimage } = attr;

    const renderAsCheckboxes = (attr, options) => {
      return (
        <div key={attr.attributeid} className={classes.radioButtonsWrapper}>
          <div aria-label={attr.prompt} className={classes.radioButtonsGroup}>
            {options.map((option, index) => {
              const { attributeid, optionid, choice, color, ddtext } = option;
              console.log("optionid1234", optionid, previousStockCounts);
              let ddTextKgToLbs = "";

              if (ddtext.includes(" kg")) {
                ddTextKgToLbs = Number(ddtext.split(" ")[0]);

                ddTextKgToLbs *= 2.205;

                ddTextKgToLbs = ` (${ddTextKgToLbs.toFixed(2)} lb)`;
              }

              //   let checked =
              //     selectedProductCheckBoxAttributesState &&
              //     selectedProductCheckBoxAttributesState[attributeid] &&
              //     selectedProductCheckBoxAttributesState[attributeid].includes(
              //       optionid
              //     );
              let itemId = mainItemIdState || itemIdState;
              console.log(
                "selectedProductCheckBoxAttributesState",
                selectedProductCheckBoxAttributesState
              );
              let checked =
                selectedProductCheckBoxAttributesState &&
                selectedProductCheckBoxAttributesState[attributeid] &&
                selectedProductCheckBoxAttributesState[attributeid].includes(
                  optionid
                );

              let invRecord =
                selectedProudctCheckboxPriceInventoryState &&
                selectedProudctCheckboxPriceInventoryState[optionid] &&
                selectedProudctCheckboxPriceInventoryState[optionid].invs &&
                selectedProudctCheckboxPriceInventoryState[optionid].invs[0];

              let stock = invRecord && invRecord.instock;
              let previousStock =
                previousStockCounts &&
                previousStockCounts[optionid] &&
                previousStockCounts[optionid].invs &&
                previousStockCounts[optionid]?.invs?.[0]?.instock;
              let price =
                selectedProudctCheckboxPriceInventoryState &&
                selectedProudctCheckboxPriceInventoryState[optionid] &&
                selectedProudctCheckboxPriceInventoryState[optionid].prices &&
                selectedProudctCheckboxPriceInventoryState[optionid].prices
                  .length > 0 &&
                Object.keys(
                  selectedProudctCheckboxPriceInventoryState[optionid].prices[0]
                ).includes("price_1") &&
                selectedProudctCheckboxPriceInventoryState[optionid].prices[0]
                  .price_1;

              return (
                <div
                  key={optionid}
                  className={`${classes.radioButtonWrapper}${
                    checked ? " " + classes.checked : ""
                  }`}
                  onClick={e =>
                    handleCheckBoxChecked(
                      e,
                      checked,
                      attributeid,
                      optionid,
                      true
                    )
                  }
                >
                  <div className={classes.controlLabel} value={`${optionid}`}>
                    <input
                      type="checkbox"
                      // style={{ visibility: "hidden" }}
                      className="hidden"
                    />
                    <div
                      className={`${classes.radioButtonLabelWrapper} ${
                        checked ? " " + classes.checked : ""
                      }`}
                    >
                      <>
                        {price ? (
                          <div className={classes.labelText}>
                            <div
                              className={`${classes.labelTextQuantity} ${
                                checked ? " " + classes.checked : ""
                              }`}
                            >
                              {ddtext}
                              {ddTextKgToLbs}
                            </div>
                            <div className={classes.labelTextPrice}>
                              USD {price}
                            </div>
                          </div>
                        ) : (
                          <div className={classes.labelText}>
                            <div className={classes.labelTextQuantity}>
                              {ddtext}
                              {ddTextKgToLbs}
                            </div>
                          </div>
                        )}
                      </>
                    </div>
                  </div>
                  {stock === 0 && !previousStock && (
                    <div className="attribute-out-of-stock">
                      Out of stock - select another item
                    </div>
                  )}
                  {stock === 0 && previousStock > 0 && (
                    <div className="attribute-out-of-stock">
                      You got the last one
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    };

    const renderAsRadioButtons = (attr, options) => {
      console.log("kiyamet", attr, options);
      return (
        <div key={attr.attributeid} className={classes.radioButtonsWrapper}>
          <div aria-label={attr.prompt} className={classes.radioButtonsGroup}>
            {options.map((option, index) => {
              const { attributeid, optionid, choice, color, ddtext } = option;
              let ddTextKgToLbs = "";

              if (ddtext.includes(" kg")) {
                ddTextKgToLbs = Number(ddtext.split(" ")[0]);

                ddTextKgToLbs *= 2.205;

                ddTextKgToLbs = ` (${ddTextKgToLbs.toFixed(2)} lb)`;
              }

              let checked =
                selectedProductCheckBoxAttributesState &&
                selectedProductCheckBoxAttributesState[attributeid] &&
                selectedProductCheckBoxAttributesState[attributeid].includes(
                  optionid
                );

              let invRecord =
                selectedProudctCheckboxPriceInventoryState &&
                selectedProudctCheckboxPriceInventoryState[optionid] &&
                selectedProudctCheckboxPriceInventoryState[optionid].invs &&
                selectedProudctCheckboxPriceInventoryState[optionid].invs[0];

              let stock = invRecord && invRecord.instock;
              let previousStock =
                previousStockCounts &&
                previousStockCounts[optionid] &&
                previousStockCounts[optionid].invs &&
                previousStockCounts[optionid].invs[0].instock;
              let price =
                selectedProudctCheckboxPriceInventoryState &&
                selectedProudctCheckboxPriceInventoryState[optionid] &&
                selectedProudctCheckboxPriceInventoryState[optionid].prices &&
                selectedProudctCheckboxPriceInventoryState[optionid].prices
                  .length > 0 &&
                Object.keys(
                  selectedProudctCheckboxPriceInventoryState[optionid].prices[0]
                ).includes("price_1") &&
                selectedProudctCheckboxPriceInventoryState[optionid].prices[0]
                  .price_1;

              return (
                <div
                  key={optionid}
                  className={`${classes.radioButtonWrapper}${
                    checked ? " " + classes.checked : ""
                  }`}
                  onClick={e =>
                    handleCheckBoxChecked(
                      e,
                      checked,
                      attributeid,
                      optionid,
                      true
                    )
                  }
                >
                  <div className={classes.controlLabel} value={`${optionid}`}>
                    <input type="checkbox" className="hidden" />
                    <div
                      className={`${classes.radioButtonLabelWrapper} ${
                        checked ? " " + classes.checked : ""
                      }`}
                    >
                      <>
                        {price ? (
                          <div className={classes.labelText}>
                            <div
                              className={`${classes.labelTextQuantity} ${
                                checked ? " " + classes.checked : ""
                              }`}
                            >
                              {ddtext}
                              {ddTextKgToLbs}
                            </div>
                            <div className={classes.labelTextPrice}>
                              USD {price}
                            </div>
                          </div>
                        ) : (
                          <div className={classes.labelText}>
                            <div className={classes.labelTextQuantity}>
                              {ddtext}
                              {ddTextKgToLbs}
                            </div>
                          </div>
                        )}
                      </>
                    </div>
                  </div>
                  {stock === 0 && !previousStock && (
                    <div className="attribute-out-of-stock">
                      Out of stock - select another item
                    </div>
                  )}
                  {stock === 0 && previousStock > 0 && (
                    <div className="attribute-out-of-stock">
                      You got the last one
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      );
    };

    if (prompt && prompt.toLowerCase() === "color") {
      return (
        <div
          className={`attribute-option-select-wrapper checkbox-flag scroll-bar-thin-style`}
        >
          <div key={attr.attributeid} className="mainattri">
            {attr.options.map((option, index) => {
              const { optionid, ddtext, choice, color, attributeid, code } =
                option;
              let selected = false;
              if (
                selectedProductCheckBoxAttributesState &&
                selectedProductCheckBoxAttributesState[attributeid] &&
                selectedProductCheckBoxAttributesState[attributeid][0] ===
                  optionid
              ) {
                selected = true;
              }
              // if (
              //   item &&
              //   item?.selectedAttributes?.[attributeid]?.optionid === optionid
              // ) {
              //   selected = true;
              // }
              console.log("code2134", code);
              return (
                <>
                <div className="mainAttrColor">
                <ColorItem
                  key={index}
                  selected={selected}
                  onClick={() =>
                    handleCheckBoxChecked(
                      null,
                      true,
                      attributeid,
                      optionid,
                      true
                    )
                  }
                  color={
                    ColorArray[code] &&
                    (attr.prompt.toLowerCase() == "color" ||
                      attr.dataname.toLowerCase() == "color")
                      ? code
                      : null
                  }
                >
                  
                </ColorItem>
                <ColorSpan onClick={() =>
                    handleCheckBoxChecked(
                      null,
                      true,
                      attributeid,
                      optionid,
                      true
                    )
                  } color={
                    ColorArray[code] &&
                    (attr.prompt.toLowerCase() == "color" ||
                      attr.dataname.toLowerCase() == "color")
                      ? code
                      : null
                  } className={selected}>
                {ColorArray[code] &&
                  (attr.prompt.toLowerCase() == "color" ||
                    attr.dataname.toLowerCase() == "color") &&
                  code.replace("_", " ")}
                  </ColorSpan>
                  </div>
                  </>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <div
        className={`attribute-option-select-wrapper checkbox-flag scroll-bar-thin-style`}
      >
        {checkBoxItemsState.length > 0 ||
        productAttributeCheckboxFlagState.format === "radio"
          ? renderAsRadioButtons(attr, options)
          : renderAsCheckboxes(attr, options)}
      </div>
    );
  };

  const renderAttributeOtherFormatC = (dataname, options, attributeid) => {
    let availableOptions = mainAttributeidWithCombinations[
      mainAttribute
    ]?.reduce((a, c) => {
      a.push(c[attributeid]);
      return a;
    }, []);
    options = options.filter(option =>
      availableOptions?.includes(option.optionid)
    );

    return (
      <div className={`attribute-option-main`}>
        {options.map(option => {
          const { optionid, ddtext, choice, color, attributeid } = option;
          let itemId = mainItemIdState || itemIdState;
          const isActiveOption =
            optionid ===
            (selectedProductAttributesState[itemId] &&
              selectedProductAttributesState[itemId][attributeid] &&
              selectedProductAttributesState[itemId][attributeid].optionid);

          return (
            <div
              className={`attribute-option-image-wrapper${
                isActiveOption ? ` active` : ``
              }`}
              key={optionid}
              onClick={() =>
                handleAttributeOptionClicked({
                  attributeid,
                  optionid,
                  choice,
                  color,
                  ddtext
                })
              }
            >
              <div
                className={`attribute-option-image${
                  isActiveOption ? ` active` : ``
                }`}
                title={ddtext}
                style={{
                  height: "50px",
                  width: "50px",
                  backgroundColor: color,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundImage: color.includes(".")
                    ? `url(https://slpreview.sociallighting.com/preview/store/20180521148/assets/images/attributes/${color})`
                    : `url(https://slpreview.sociallighting.com/preview/store/20180521148/assets/images/attributes/no-image.png)`,
                  backgroundSize: "cover"
                }}
              >
                {dataname == "amount" ? (
                  <span className="no-select attribute-option-span">
                    {ddtext}
                  </span>
                ) : (
                  ""
                )}
              </div>
              {option.available == false ? (
                <div className="attribute-option-tooltip">
                  <span>{`Not available for the selected ${option.secondAttributeScreenName}`}</span>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  };

  const handleAttributeOptionSelected = (e, options, switchimage) => {
    const { value } = e.target;
    console.info("borop change", switchimage, switchimage == "true");
    // set product switch image flag to be used by image carousel
    dispatch(setProductSwitchImageAction(switchimage == "true"));

    if (value == -1) {
      if (mainItemIdState != 0) {
        dispatch(fetchingProductRequestSaga(mainItemIdState));
        dispatch(fetchingProductPriceInventory(mainItemIdState));

        handleMappingInitialSelectedAttributesToReduxState({
          [mainItemIdState]: {}
        });
      }

      return;
    }

    const { optionid, ddtext, choice, color, attributeid } = options.filter(
      (v, index) => index == value
    )[0];

    handleSettingSelectedAttributesToReduxState({
      attributeid,
      optionid,
      choice,
      color,
      ddtext
    });
  };

  const renderAttributeOtherFormatText = attr => {
    const { attributeid, dataname } = attr;
    let itemId = mainItemIdState || itemIdState;
    if (
      mainItemIdState &&
      selectedProductAttributesState &&
      selectedProductAttributesState[itemId]
    ) {
      let value =
        selectedProductAttributesState[itemId] &&
        selectedProductAttributesState[itemId][attributeid];

      if (!value) {
        attr.value = "";
        handleSettingSelectedAttributesToReduxState(attr);
        // setInput(input => {
        //   return {
        //     ...input,
        //     [attributeid]: attr
        //   };
        // });
      }
    }
    return (
      <textarea
        name={dataname}
        // onBlur={() => onBlurMapLocalStateToReduxState(attr)}
        // onChange={e => handleTextInputChange(e, attr)}
        placeholder="Enter your message here..."
        className="attribute-option-textarea-field"
      />
    );
  };

  const renderAttributeOtherSelectOptions = attr => {
    let selectedOptionIndex = -1;

    let { options, attributeid, skuEnabled, defvalue, dropname, switchimage } =
      attr;

    console.info("is select option non sku enabled", skuEnabled);

    // Check if the option exists for the given main attribute
    if (
      skuEnabled &&
      attributesState &&
      attributesState.length > 0 &&
      selectedProductAttributesState &&
      selectedProductAttributesState[mainItemIdState || itemIdState] &&
      Object.keys(
        selectedProductAttributesState[mainItemIdState || itemIdState]
      ).length > 0
    ) {
      console.info(
        "selectedAttributes",
        selectedProductAttributesState[mainItemIdState || itemIdState],
        attributesState
      );

      console.info(
        "is select option non sku enabled -- ",
        isNonSkuEnabledAttribute(attributeid),
        mainItemIdState,
        currentItemSkusState
      );

      let attributeIds = attributesState.reduce((arr, item) => {
        arr.push(item.attributeid);
        return arr;
      }, []);

      // Filter selected attributes
      let selectedAttributes = {};
      console.info("attributeIds", attributeIds);

      let keys = Object.keys(
        selectedProductAttributesState[mainItemIdState || itemIdState]
      );

      for (let key of keys) {
        let item =
          selectedProductAttributesState[mainItemIdState || itemIdState][key];
        selectedAttributes[item.attributeid] = {} = item.optionid;
      }

      console.info(
        "selectedAttributes - mainAttr",
        mainAttributeidWithCombinations,
        selectedAttributes
      );

      // Get the position of the attributeid
      let posAttributeId = attributesState.find(
        attr => attr.attributeid == attributeid
      ).position;

      console.info("selectedAttributes - POS", posAttributeId, attributeid);
      let AttributeIdWithThePreviousPosition = "";

      let notFound = true;

      let i = posAttributeId;

      while (notFound) {
        let found = attributesState.find(attr => attr.position == i - 1);

        if (found) {
          notFound = false;

          AttributeIdWithThePreviousPosition = found.attributeid;
        } else {
          i -= -1;
        }
      }

      /*   let AttributeIdWithThePreviousPosition = attributesState.find(
              attr => attr.position == posAttributeId - 1
            ).attributeid; */

      console.info(
        "AttributeIdWithThePreviousPosition",
        AttributeIdWithThePreviousPosition,
        selectedAttributes
      );

      let availableOptions = mainAttributeidWithCombinations[
        mainAttribute
      ].filter(item => {
        if (AttributeIdWithThePreviousPosition == mainAttribute)
          return (
            item.mainOptionId ==
            selectedAttributes[AttributeIdWithThePreviousPosition]
          );
        else
          return (
            item[AttributeIdWithThePreviousPosition] ==
            selectedAttributes[AttributeIdWithThePreviousPosition]
          );
      });

      availableOptions = availableOptions.reduce((tempArr, option, index) => {
        tempArr.push(option[attributeid]);
        return tempArr;
      }, []);

      console.info("availableOptions", availableOptions);
      // Add available object to option to flag it is available for the preceding attribute
      options = options.map(option => {
        return (option = {
          ...option,
          available: availableOptions.includes(option.optionid)
        });
      });

      console.info(
        "selectedAttributes - -AVAILABLE",
        availableOptions,
        options
      );
    }

    if (
      selectedProductAttributesState &&
      selectedProductAttributesState[mainItemIdState || itemIdState] &&
      selectedProductAttributesState[mainItemIdState || itemIdState][
        attributeid
      ]
    ) {
      let selectedOption = {};
      options.forEach((item, index) => {
        if (
          item.optionid ==
          selectedProductAttributesState[mainItemIdState || itemIdState][
            attributeid
          ].optionid
        ) {
          selectedOptionIndex = index;
          selectedOption = item;
        }
      });

      // If option is not available, select the first available one.
      if (selectedOption.available == false) {
        console.info("first available one");
        dispatch(
          changeProductAttributesAction({
            ...selectedProductAttributesState,
            [mainItemIdState]: {
              ...selectedProductAttributesState[mainItemIdState],
              [attributeid]: options.find(option => option.available == true)
            }
          })
        );
      }
    }

    let result = (
      <div className="attribute-option-select-wrapper">
        <select
          value={selectedOptionIndex}
          className="attribute-option--select"
          onChange={e => handleAttributeOptionSelected(e, options, switchimage)}
        >
          <option value={-1} key={-1}>
            Select {dropname}
          </option>
          {options.map((option, index) => {
            let itemid = mainItemIdState || itemIdState;
            const { optionid, ddtext, attributeid } = option;
            let availableOption =
              availableOtherOptions &&
              availableOtherOptions[itemid] &&
              availableOtherOptions[itemid][attributeid] &&
              availableOtherOptions[itemid][attributeid].includes(optionid);

            const isActiveOption =
              optionid ===
              (selectedProductAttributesState[itemid] &&
                selectedProductAttributesState[itemid][attributeid] &&
                selectedProductAttributesState[itemid][attributeid].optionid);

            console.info("isActiveOption", isActiveOption);

            return (
              <option
                style={{
                  color:
                    !skuEnabled || option.available || availableOption
                      ? "#000"
                      : "#bbb",
                  display: option.available ? "" : !skuEnabled ? "" : "none"
                }}
                key={index}
                value={index}
              >
                {ddtext}
              </option>
            );
          })}
        </select>
      </div>
    );
    return result;
  };

  const renderMainAttributeOptions = attr => {
    let {
      dataname,
      options,
      screenname,
      format,
      dropname,
      prompt,
      switchimage
    } = attr;
    console.info("main attr options", attr, mainAttribute);
    dataname = dataname.includes("-") ? dataname.split("-")[1] : dataname;

    let filteredMainOptionIds = [];
    if (Object.keys(mainAttributeidWithCombinations).length > 0) {
      mainAttributeidWithCombinations[mainAttribute].forEach(item => {
        if (filteredMainOptionIds.includes(item.mainOptionId) === false) {
          filteredMainOptionIds.push(item.mainOptionId);
        }
      });
    }

    console.info(
      "filteredMainOptionIds",
      mainAttributeidWithCombinations,
      filteredMainOptionIds,
      mainAttributeidWithCombinations[mainAttribute]
    );

    if (!isNonSkuEnabledAttribute(mainAttribute)) {
      options = options.filter(option => {
        return filteredMainOptionIds.includes(option.optionid);
      });
    }

    if (
      attributesState &&
      attributesState.length > 0 &&
      mainAttributeidWithCombinations &&
      selectedProductAttributesState &&
      selectedProductAttributesState[mainItemIdState] &&
      Object.keys(selectedProductAttributesState[mainItemIdState]).length > 0
    ) {
      console.info("main options", options, attributesState);

      let positionOfMainAttr = attributesState.find(
        attr => attr.attributeid == mainAttribute
      ).position;

      console.info("TEST position of main attr", positionOfMainAttr);
      // Should get the next attribute that is sku enabled and not the main attr
      if (
        attributeJson.some(
          attr => attr.skuEnabled && attr.attributeid != mainAttribute
        )
      ) {
        let attributeIdThatComesAfterTheMain = attributesState.findIndex(
          attr => attr.attributeid != mainAttribute
        ).attributeid;

        if (
          selectedProductAttributesState[mainItemIdState][
            attributeIdThatComesAfterTheMain
          ] &&
          selectedProductAttributesState[mainItemIdState][
            attributeIdThatComesAfterTheMain
          ].optionid
        ) {
          let secondAttribuAttributeId =
            selectedProductAttributesState[mainItemIdState][
              attributeIdThatComesAfterTheMain
            ].attributeid;

          console.info(
            "main options combinations",
            mainAttributeidWithCombinations,
            secondAttribuAttributeId
          );

          let selectedSecondAttributeOptionId =
            selectedProductAttributesState[mainItemIdState][
              secondAttribuAttributeId
            ].optionid;

          let availableMainAttributeOptionIdsForTheSecondAttribuAttributeId =
            mainAttributeidWithCombinations[mainAttribute].reduce(
              (arr, attr) => {
                if (
                  attr[secondAttribuAttributeId] ==
                  selectedSecondAttributeOptionId
                ) {
                  arr.push(attr.mainOptionId);
                }
                return arr;
              },
              []
            );

          console.info(
            "main options filtered",
            availableMainAttributeOptionIdsForTheSecondAttribuAttributeId
          );

          // Get the second attribute's screenname to use for the tooltip
          let secondAttributeScreenName = attributeJson.reduce(
            (screenname, attr) => {
              if (attr.attributeid == secondAttribuAttributeId) {
                screenname = attr.screenname;
              }
              return screenname;
            },
            ""
          );

          console.info("screenname", secondAttributeScreenName, attributeJson);

          // Flag if the main attribute available for the selected second attribute.
          options = options.map(option => {
            return (option = {
              ...option,
              available:
                availableMainAttributeOptionIdsForTheSecondAttribuAttributeId.includes(
                  option.optionid
                ),
              secondAttributeScreenName: secondAttributeScreenName
            });
          });
        }
      }
    }

    // if there is only one attribute, render as checkboxes
    if (productAttributeCheckboxFlagState.checkbox) {
      return renderCheckBoxAttributes(attr, options);
    }

    if (format == "D" || format == "R") {
      const { dropname, prompt } = attr;
      const defaultValue =
        selectedProductAttributesState[mainItemIdState] &&
        selectedProductAttributesState[mainItemIdState][attr.attributeid] &&
        selectedProductAttributesState[mainItemIdState][attr.attributeid]
          .optionid;

      /*   let defaultValueIndex = -1;

            if (defaultValue) {
              defaultValueIndex = options.forEach((option, index) => {
                if (option.optionid == defaultValue) return index;
              });
            } */

      return (
        <div
          className="attribute-option-select-wrapper"
          style={{ width: "100%" }}
        >
          <select
            defaultValue={defaultValue}
            className="attribute-option--select"
            onChange={e =>
              handleAttributeOptionSelected(e, options, switchimage)
            }
          >
            <option value={-1}>{dropname}</option>
            {options.map((option, index) => {
              if (mainItemIdState && mainItemIdState != 0) {
                let disabledOption = availableOtherOptions[mainItemIdState];
              }
              const { optionid, ddtext, attributeid } = option;

              return (
                <option style={{ color: "#000" }} key={index} value={index}>
                  {ddtext}
                </option>
              );
            })}
          </select>
        </div>
      );
    }

    return (
      <div className={`attribute-option-main`}>
        {options.map(option => {
          let optionDisabled = "";
          if (option.available == false) {
            optionDisabled = " disabled";
          }
          const { optionid, ddtext, choice, color, attributeid } = option;
          let itemId = mainItemIdState || itemIdState;
          const isActiveOption =
            optionid ===
            (selectedProductAttributesState[itemId] &&
              selectedProductAttributesState[itemId][attributeid] &&
              selectedProductAttributesState[itemId][attributeid].optionid);

          console.info("isActiveOption", isActiveOption);

          return (
            <div
              className={`attribute-option-image-wrapper${
                isActiveOption ? ` active` : ``
              }${optionDisabled}`}
              key={optionid}
              onClick={() =>
                handleAttributeOptionClicked({
                  attributeid,
                  optionid,
                  choice,
                  color,
                  ddtext
                })
              }
            >
              <div
                className={`attribute-option-image${
                  isActiveOption ? ` active` : ``
                }${optionDisabled}`}
                title={ddtext}
                style={{
                  height: "52px",
                  width: "52px",
                  backgroundColor: color,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundImage: color.includes(".")
                    ? `url(https://slpreview.sociallighting.com/preview/store/20180521148/assets/images/attributes/${color})`
                    : `url(https://slpreview.sociallighting.com/preview/store/20180521148/assets/images/attributes/no-image.png)`,
                  backgroundSize: "cover"
                }}
              >
                {dataname == "amount" ? (
                  <span className="no-select attribute-option-span">
                    {ddtext}
                  </span>
                ) : (
                  ""
                )}
              </div>
              {option.available == false ? (
                <div className="attribute-option-tooltip">
                  <span>{`Not available for the selected ${option.secondAttributeScreenName}`}</span>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  };

  const renderAttributeOtherOptionsBasedOnFormat = attr => {
    const { format, dataname, options, attributeid } = attr;
    console.info("Format", attr);

    if (format == "D") {
      console.info("Format", format);
      return renderAttributeOtherSelectOptions(attr);
    } else if (format == "C") {
      return renderAttributeOtherFormatC(dataname, options, attributeid);
    } else if (format === "" && options.length === 0) {
      return renderAttributeOtherFormatText(attr);
    } else {
      return renderAttributeOtherSelectOptions(attr);
    }
  };

  const renderAttributeOtherOptions = attr => {
    let { dataname, screenname, prompt } = attr;
    dataname = dataname.includes("-") ? dataname.split("-")[1] : dataname;

    return (
      <div className={`attribute-option-${dataname}`}>
        {renderAttributeOtherOptionsBasedOnFormat(attr)}
      </div>
    );
  };
  const fetchSkuPriceInventoryData = (optionid, skuid) => {
    fetch(
      GET_PRICE_INVENTORY.replace("$PRODUCT", skuid).replace("$LANGUAGE", "en")
    )
      .then(res => res.json())
      .then(json => {
        console.info("borop variant price record", json);
        json.__Result[0].qty = 1;
        dispatch(
          setProductCheckboxAttributesPriceInventoryRecordAction({
            [optionid]: json.__Result[0]
          })
        );
      })
      .catch(err =>
        console.error("error fetching variant price inventory", err)
      );
  };

  const renderAttributeOptions = attr => {
    const { attributeid, format } = attr;
    if (attributeid === mainAttribute) {
      // attributeid - 34160
      return renderMainAttributeOptions(attr);
    } else if (
      attributeid &&
      attributeid != "" &&
      attributeid != mainAttribute
    ) {
      // attributeid - 34161
      return renderAttributeOtherOptions(attr);
    } else {
      return null;
    }
  };

  const renderAttributes = () => {
    console.info("length", attributeJson, attributeJson.length);
    if (attributeJson.length > 0) {
      return attributeJson.map(attr => {
        const DATANAME = attr.dataname.toLowerCase();

        let dataname = DATANAME.includes("-")
          ? DATANAME.split("-")[1]
          : DATANAME;
        attr.dataname = dataname;
        const { attributeid } = attr;

        return (
          <div
            key={attributeid}
            className={`attribute-wrapper attribute-${dataname}${
              productAttributeCheckboxFlagState.checkbox ? " checkbox-flag" : ""
            }`}
          >
            {renderAttributeOptionsHeader(attr)}

            {renderAttributeOptions(attr)}
          </div>
        );
      });
    } else {
      return null;
    }
  };

  if (
    attributesState &&
    attributesState.length > 0 &&
    mainProductInventoryQty > 0
  ) {
    return (
      <div className={"col-xs-12 attributes-container"}>
        <div className={`attributes-wrapper`}>{renderAttributes()}</div>
      </div>
    );
  } else {
    return null;
  }
};

export default Attributes;
