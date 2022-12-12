import { useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { GET_ATTRIBUTE_LINK } from "../../../redux/links";
import {
  changeProductAttributesAction,
  fetchingProductPriceInventory,
  fetchingProductRequestSaga,
  unMountProductPageAction,
  fetchMainProductSkusAndSkuIds,
  reFetchProductInitialState,
  setAttributesDetailsAction
} from "../../../redux/actions/productActions";
// import "./Styles/Attributes.css";
import classes from "./Styles/Attributes.module.css";

import styled from "styled-components";

const Variants = () => {
  const dispatch = useDispatch();

  const langState = "en";
  const [flagIgnoreSelectedAttrChanged, setFlagIgnoreSelectedAttrChanged] =
    useState(false);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setCounter(0);
    setAttributeJson([]);
  }, [counter]);

  const {
    skus: currentItemSkusState,
    mainProductSkuIds,
    mainProductSkus,
    attributes: attributesState,
    itemId: itemIdState,
    mainitemid: mainItemIdState,
    code: itemCodeState
  } = useSelector(state => state.productReducer.itemDetail, shallowEqual);
  console.log("attributesState variants", attributesState);

  const productInitialIdState = useSelector(
    state => state.productReducer.productInitial.id,
    shallowEqual
  );

  const selectedProductAttributesState = useSelector(
    state => state.productReducer.selectedProductAttributes,
    shallowEqual
  );

  const [input, setInput] = useState({});

  const [attributeJson, setAttributeJson] = useState([]);
  const [skuEnabledAttrIds, setSkuEnabledAttrIds] = useState([]);

  const [mainAttribute, setMainAttribute] = useState(null);

  const [availableOtherOptions, setAvailableOtherOptions] = useState({});

  const [mainAttributeidWithCombinations, setMainAttributeidWithCombinations] =
    useState({});

  useEffect(() => {
    return () => {
      dispatch(unMountProductPageAction());
      setAttributeJson([]);
      setCounter(0);
    };
  }, []);

  useEffect(() => {
    if (!itemCodeState) {
      setAttributeJson([]);
      setCounter(0);
    } else {
      setFlagIgnoreSelectedAttrChanged(false);
    }
  }, [itemCodeState]);
  /* Compare productInitialState Id to currentItemId, refetch the productInitialState if they are differnet */
  useEffect(() => {
    if (productInitialIdState && itemIdState) {
      if (productInitialIdState != itemIdState) {
        dispatch(reFetchProductInitialState("", itemIdState));
      }
    }
  }, [dispatch, itemIdState, productInitialIdState]);

  /* Need to get the mainitem's skus and skuids */
  useEffect(() => {
    if (mainProductSkus === null || mainProductSkus === undefined) {
      if (mainItemIdState && mainItemIdState != 0) {
        dispatch(fetchMainProductSkusAndSkuIds(mainItemIdState));
      }
    }

    return () => {};
  }, [attributeJson, dispatch, itemIdState, mainItemIdState, mainProductSkus]);

  if (attributeJson.length > 0) {
    let reducedAttr = attributeJson.reduce((arr, attr) => {
      attr.options.forEach(opt => {
        arr.push({ code: opt.code, optinid: opt.optionid });
      });
      return arr;
    }, []);
  }

  useEffect(() => {
    if (
      flagIgnoreSelectedAttrChanged === false &&
      selectedProductAttributesState &&
      selectedProductAttributesState[mainItemIdState || itemIdState] &&
      Object.keys(
        selectedProductAttributesState[mainItemIdState || itemIdState]
      ).length > 0 &&
      mainProductSkus &&
      mainProductSkus.length > 0
    ) {
      let selectedProductAttributeIdsAndOptionsIds = Object.values(
        selectedProductAttributesState[mainItemIdState || itemIdState]
      );
      let wantedSkuIds = [];

      let wantedSkuId = null;

      // Should filter out the non sku enabled attributes
      selectedProductAttributeIdsAndOptionsIds =
        selectedProductAttributeIdsAndOptionsIds.filter(attr =>
          skuEnabledAttrIds.includes(attr.attributeid)
        );

      let proceed = true;

      if (
        Object.keys(mainAttributeidWithCombinations).length > 0 &&
        selectedProductAttributeIdsAndOptionsIds.length > 0 &&
        selectedProductAttributeIdsAndOptionsIds.some(
          item => item.attributeid == mainAttribute
        )
      ) {
        wantedSkuIds = mainAttributeidWithCombinations[mainAttribute].filter(
          attr => {
            return (
              attr.mainOptionId ==
              selectedProductAttributeIdsAndOptionsIds.find(
                item => item.attributeid == mainAttribute
              ).optionid
            );
          }
        );
        // Selected Producted Attribute Id and Option Id pairs excluding the main attr
        const selProdAttrAndOptIdsExMainAttr =
          selectedProductAttributeIdsAndOptionsIds.filter(
            attr => attr.attributeid != mainAttribute
          );

        let fixMappingOfSelectedAttrs = false;

        selProdAttrAndOptIdsExMainAttr.forEach(({ attributeid, optionid }) => {
          let tempWantedSkuIds = wantedSkuIds.filter(skus => {
            return skus[attributeid] == optionid;
          });

          if (tempWantedSkuIds.length > 0) {
            wantedSkuIds = tempWantedSkuIds;
          } else {
            fixMappingOfSelectedAttrs = true;
          }
        });

        if (wantedSkuIds.length > 0) wantedSkuId = wantedSkuIds[0].skuid;

        if (fixMappingOfSelectedAttrs) {
          const skus = Object.keys(wantedSkuIds[0]).reduce((a, c) => {
            if (isNaN(c) === false || c === "mainOptionId") {
              a.push({
                attributeid: c === "mainOptionId" ? mainAttribute : Number(c),
                optionid: wantedSkuIds[0][c]
              });
            }
            return a;
          }, []);
          setFlagIgnoreSelectedAttrChanged(true);
          mapInitialSelectedAttributes(skus);
        }
      } else {
        proceed = false;
      }

      if (proceed) {
        // Filter available other options
        let mainAttributeOptionId =
          selectedProductAttributeIdsAndOptionsIds.find(
            attr => attr.attributeid == mainAttribute
          ).optionid;

        let filteredAttrs = mainAttributeidWithCombinations[
          mainAttribute
        ].filter(item => item.mainOptionId == mainAttributeOptionId);

        // Find available options for the given main attribute (color for instance is  the main attribute for most products in b2b2c)
        let tempAvailableOptions = {};
        for (let filteredAttr of filteredAttrs) {
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
        if (
          wantedSkuId &&
          itemIdState !== wantedSkuId // current item id should not be equal to the skuid
        ) {
          dispatch(fetchingProductRequestSaga(wantedSkuId));
          dispatch(fetchingProductPriceInventory(wantedSkuId));
        }
      }
    }
  }, [selectedProductAttributesState]);

  const mapInitialSelectedAttributes = skus => {
    if (mainItemIdState != 0 && skus.length > 0) {
      let selectedAttributesObj = {};
      skus.forEach(sku => {
        selectedAttributesObj[sku.attributeid] = {
          attributeid: sku.attributeid,
          optionid: sku.optionid
        };
      });

      selectedAttributesObj = {
        [mainItemIdState]: { ...selectedAttributesObj }
      };

      handleMappingInitialSelectedAttributesToReduxState(selectedAttributesObj);
    }
  };

  // get the all possible attributes and their options
  useEffect(() => {
    if (
      attributesState &&
      attributesState.length > 0 &&
      attributeJson.length == 0 &&
      mainProductSkus
    ) {
      setCounter(counter + 1);
      let tempArr = [];
      let tempSkuEnabledAttrs = [];
      let mainAttrIsSet = false;

      if (counter === 0) {
        for (let attribute of attributesState) {
          let isSkuEnabled = false;
          if (!isNonSkuEnabledAttribute(attribute.attributeid)) {
            isSkuEnabled = true;

            if (mainAttrIsSet === false && attribute.position == 1) {
              setMainAttribute(attribute.attributeid);
              mainAttrIsSet = true;
            }
          }
          fetch(GET_ATTRIBUTE_LINK(attribute.attributeid, langState))
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
                dispatch(setAttributesDetailsAction(tempArr));

                setSkuEnabledAttrIds(tempSkuEnabledAttrs);
              }
            })
            .catch(err => console.error(err));
        }

        mapInitialSelectedAttributes(currentItemSkusState);
      }
    }
  }, [attributesState, mainProductSkus]);

  // Filtering all possible attributeid and optionid combinations
  useEffect(() => {
    if (mainProductSkus && mainProductSkus.length > 0) {
      if (mainAttribute) {
        let tempMainAttributeCombinations = {};

        if (
          Object.keys(tempMainAttributeCombinations).includes(
            String(mainAttribute)
          ) === false
        ) {
          tempMainAttributeCombinations[mainAttribute] = [];
        }

        mainProductSkus.forEach(sku => {
          const { attributeid, optionid, skuid } = sku;

          if (attributeid == mainAttribute) {
            tempMainAttributeCombinations[mainAttribute] = [
              ...tempMainAttributeCombinations[mainAttribute],
              { mainOptionId: optionid, skuid }
            ];
          }
        });

        mainProductSkus.forEach(sku => {
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
  }, [mainProductSkus, mainAttribute, mainItemIdState]);

  /* 
  console.info("tempFilteredAttributes", filteredAttributeJson); */

  const handleSettingSelectedAttributesToReduxState = obj => {
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

  const handleMappingInitialSelectedAttributesToReduxState = obj => {
    dispatch(changeProductAttributesAction(obj));
  };

  const isNonSkuEnabledAttribute = attrId => {
    if (mainProductSkus && mainProductSkus.length > 0) {
      if (!mainProductSkus.some(sku => sku.attributeid == attrId)) return true;
      else return false;
    } else {
      return true;
    }
  };

  const handleAttributeOptionClicked = obj => {
    handleSettingSelectedAttributesToReduxState(obj);
  };

  const handleAttributeOptionSelected = (e, options) => {
    const { value } = e.target;

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

  const onBlurMapLocalStateToReduxState = attr => {
    const { attributeid } = attr;
    handleSettingSelectedAttributesToReduxState(attr);
  };

  const handleTextInputChange = (e, attr) => {
    e.persist();
    const { attributeid } = attr;
    const { name, value } = e.target;

    attr.value = value;

    setInput(input => {
      return {
        ...input,
        [attributeid]: attr
      };
    });
  };

  const renderAttributeOptions = attr => {
    const { attributeid, format } = attr;
    if (attributeid == mainAttribute) {
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
            className={`${classes.attributeWrapper} attribute-${dataname}`}
          >
            {renderAttributeOptions(attr)}
          </div>
        );
      });
    } else {
      return null;
    }
  };

  const renderAttributeOtherFormatC = (dataname, options, attributeid) => {
    const itemId = mainItemIdState || itemIdState;

    const selectedOptionIdOfTheMainAttr =
      selectedProductAttributesState[itemId]?.[mainAttribute].optionid;

    let availableOptions = mainAttributeidWithCombinations[
      mainAttribute
    ].reduce((a, c) => {
      if (c.mainOptionId === selectedOptionIdOfTheMainAttr)
        a.push(c[attributeid]);
      return a;
    }, []);
    options = options.filter(option =>
      availableOptions.includes(option.optionid)
    );

    return (
      // <div className={classes.optionMain}>
      <div className={classes.optionsWrapper}>
        {options.map(option => {
          const { optionid, ddtext, choice, color, attributeid } = option;
          const isActiveOption =
            optionid ===
            (selectedProductAttributesState[itemId] &&
              selectedProductAttributesState[itemId][attributeid] &&
              selectedProductAttributesState[itemId][attributeid].optionid);

          return (
            <div
              className={`${classes.optionImageWrapper}${
                isActiveOption ? ` ${classes.active}` : ``
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
                className={`${classes.attributeOptionImage}${
                  isActiveOption ? ` ${classes.active}` : ``
                }`}
                // className={isActiveOption ? classes.attributeOptionImage
                //    :  classes.attributeOptionImageActive
                // }
                title={ddtext}
                style={{
                  border: "1px solid #f7f7f7",
                  height: "65px",
                  width: "65px",
                  backgroundColor: ddtext.toLowerCase(),
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundImage: color.includes(".")
                    ? `url(https://next.sociallighting.com/preview/store/20180521148/assets/images/attributes/${color})`
                    : `url(https://next.sociallighting.com/preview/store/20180521148/assets/images/attributes/no-image.png)`,
                  backgroundSize: "cover",
                  opacity: ".7"
                }}
              >
                {dataname == "amount" ? (
                  <span className={classes.attributeOptionSpan}>{ddtext}</span>
                ) : (
                  ""
                )}
              </div>
              {option.available == false ? (
                <div className={classes.attributeOptionTooltip}>
                  <span>{`Not available for the selected ${option.secondAttributeScreenName}`}</span>
                </div>
              ) : null}
              <span
                className={
                  isActiveOption ? classes.ddTextActive : classes.ddText
                }
              >
                {ddtext}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  // Render text attribute input field
  const renderAttributeOtherFormatText = attr => {
    const { attributeid, dataname, defvalue } = attr;

    let itemId = mainItemIdState || itemIdState;
    if (
      mainItemIdState &&
      selectedProductAttributesState &&
      selectedProductAttributesState[itemId]
    ) {
      let value =
        selectedProductAttributesState[itemId] &&
        selectedProductAttributesState[itemId][attributeid];

      /*   if (!value) {
        attr.value = "";
        handleSettingSelectedAttributesToReduxState(attr);
      } */
    }
    return (
      <textarea
        name={dataname}
        onBlur={() => onBlurMapLocalStateToReduxState(attr)}
        onChange={e => handleTextInputChange(e, attr)}
        placeholder={defvalue}
        className={classes.optionTextareaField}
      />
    );
  };

  // Render as dropdown list
  const renderAttributeOtherSelectOptions = attr => {
    let selectedOptionIndex = -1;

    let { options, attributeid, skuEnabled, defvalue, dropname } = attr;

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
      let attributeIds = attributesState.reduce((arr, item) => {
        arr.push(item.attributeid);
        return arr;
      }, []);

      // Filter selected attributes
      let selectedAttributes = {};

      let keys = Object.keys(
        selectedProductAttributesState[mainItemIdState || itemIdState]
      );

      for (let key of keys) {
        let item =
          selectedProductAttributesState[mainItemIdState || itemIdState][key];
        selectedAttributes[item.attributeid] = {} = item.optionid;
      }

      // Get the position of the attributeid
      let posAttributeId = attributesState.find(
        attr => attr.attributeid == attributeid
      ).position;

      let AttributeIdWithThePreviousPosition = attributesState.find(
        attr => attr.position == posAttributeId - 1
      ).attributeid;

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

      // Add available object to option to flag it is available for the preceding attribute
      options = options.map(option => {
        return (option = {
          ...option,
          available: availableOptions.includes(option.optionid)
        });
      });
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
      <div
        className="attribute-option-select-wrapper"
        style={{ width: "100%" }}
      >
        <select
          value={selectedOptionIndex}
          className={classes.optionSelect}
          onChange={e => handleAttributeOptionSelected(e, options)}
        >
          <option value={-1} key={-1}>
            {dropname}
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

  const renderAttributeOtherOptionsBasedOnFormat = attr => {
    const { format, dataname, options, attributeid } = attr;
    if (format == "D") {
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
      <div style={{ width: "100%" }} className={`attribute-option-${dataname}`}>
        {renderAttributeOptionsHeader(attr)}

        {renderAttributeOtherOptionsBasedOnFormat(attr)}
      </div>
    );
  };

  const renderMainAttributeOptions = attr => {
    let itemId = mainItemIdState || itemIdState;
    let { dataname, options, screenname, format, dropname, prompt } = attr;
    dataname = dataname.includes("-") ? dataname.split("-")[1] : dataname;

    let filteredMainOptionIds = [];
    if (Object.keys(mainAttributeidWithCombinations).length > 0) {
      mainAttributeidWithCombinations[mainAttribute].forEach(item => {
        if (filteredMainOptionIds.includes(item.mainOptionId) === false) {
          filteredMainOptionIds.push(item.mainOptionId);
        }
      });
    }

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
      selectedProductAttributesState[itemId] &&
      Object.keys(selectedProductAttributesState[itemId]).length > 0
    ) {
      let positionOfMainAttr = attributesState.find(
        attr => attr.attributeid == mainAttribute
      ).position;

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
          selectedProductAttributesState[itemId][
            attributeIdThatComesAfterTheMain
          ] &&
          selectedProductAttributesState[itemId][
            attributeIdThatComesAfterTheMain
          ].optionid
        ) {
          let secondAttribuAttributeId =
            selectedProductAttributesState[itemId][
              attributeIdThatComesAfterTheMain
            ].attributeid;

          let selectedSecondAttributeOptionId =
            selectedProductAttributesState[itemId][secondAttribuAttributeId]
              .optionid;

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

    if (format == "D" || format == "R") {
      const { dropname, prompt, attributeid } = attr;
      const defaultValue =
        selectedProductAttributesState[itemId] &&
        selectedProductAttributesState[itemId][attributeid] &&
        selectedProductAttributesState[itemId][attributeid].optionid;

      let defaultValueIndex = -1;

      if (defaultValue) {
        defaultValueIndex = options.findIndex(
          option => option.optionid == defaultValue
        );
      }

      return (
        <div
          className="attribute-option-select-wrapper"
          style={{ width: "100%" }}
        >
          {renderAttributeOptionsHeader(attr)}
          <select
            value={defaultValueIndex}
            className={classes.optionSelect}
            onChange={e => handleAttributeOptionSelected(e, options)}
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
      // <div className={`${classes.optionMain}`}>
      <div className={classes.optionsWrapper}>
        {renderAttributeOptionsHeader(attr)}
        {options.map(option => {
          let optionDisabled = "";
          if (option.available == false) {
            optionDisabled = ` ${classes.disabled}`;
          }
          const { optionid, ddtext, choice, color, attributeid } = option;
          let itemId = mainItemIdState || itemIdState;
          const isActiveOption =
            optionid ===
            (selectedProductAttributesState[itemId] &&
              selectedProductAttributesState[itemId][attributeid] &&
              selectedProductAttributesState[itemId][attributeid].optionid);

          return (
            <div
              className={`${classes.optionImageWrapper}${
                isActiveOption ? ` ${classes.active}` : ``
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
                className={`${classes.attributeOptionImage}${
                  isActiveOption ? ` ${classes.active}` : ``
                }${optionDisabled}`}
                title={ddtext}
                style={{
                  border: "1px solid #f7f7f7",
                  height: "65px",
                  width: "65px",
                  backgroundColor: ddtext.toLowerCase(),
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundImage: color.includes(".")
                    ? `url(https://next.sociallighting.com/preview/store/20180521148/assets/images/attributes/${color})`
                    : `url(https://next.sociallighting.com/preview/store/20180521148/assets/images/attributes/no-image.png)`,
                  backgroundSize: "cover",
                  opacity: ".7"
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
                <div className={classes.attributeOptionTooltip}>
                  <span>{`Not available for the selected ${option.secondAttributeScreenName}`}</span>
                </div>
              ) : null}
              <span
                className={
                  isActiveOption ? classes.ddTextActive : classes.ddText
                }
              >
                {ddtext}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderAttributeOptionsHeader = attr => {
    const { prompt, attributeid } = attr;
    const itemId = mainItemIdState || itemIdState;

    const selectedAttribute =
      selectedProductAttributesState[itemId] &&
      selectedProductAttributesState[itemId][attributeid] &&
      selectedProductAttributesState[itemId][attributeid];

    const selectedAttributeOptionid =
      selectedAttribute && selectedAttribute.optionid;

    const selectedColorText =
      (selectedAttributeOptionid &&
        selectedAttribute &&
        selectedAttribute.ddtext) ||
      (attr.options.find(a => a.optionid === selectedAttributeOptionid) &&
        attr.options.find(a => a.optionid === selectedAttributeOptionid)
          .ddtext) ||
      "";
    //let headerAction = screenname.includes("Request") ? `Enter` : "Select";

    return (
      <div className={classes.optionHeader}>
        <span className={classes.optionTitle}>
          {/* {prompt} */}
          {/* {`${prompt.replace("Select ", "").replace("Product ", "").trim()}: `}{" "} */}
          {`${prompt.replace("Select ", "").replace("Product ", "").trim()}`}
          {/* <span style={{ fontWeight: "300", marginLeft:"8px", textTransform: "capitalize", fontSize: "14px" }}>{selectedColorText}</span> */}
        </span>
      </div>
    );
  };

  if (attributesState && attributesState.length > 0) {
    return (
      <Wrapper>
        <div className={classes.container}>
          <div className={classes.wrapper}>{renderAttributes()}</div>
        </div>
      </Wrapper>
    );
  } else {
    return null;
  }
};

const Wrapper = styled.div``;

export default Variants;
