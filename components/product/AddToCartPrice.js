import React, { useEffect, useRef, useState, useContext } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  getDeliveryOptions,
  addToLocalMiniCart,
  setAddToCartValidationErrors,
  setProductOutOfStockError
  // addToCartCheckboxProduct
} from "../../redux/actions/productActions";
import styled from "styled-components";
import * as classes from "../product/Styles/AddToCartBox.module.css";
//import {useTranslation} from "next-i18next";

const AddToCartBox = ({ setNumberOfItems, numberOfItems, ...props }) => {
  const dispatch = useDispatch();
  //const {t} = useTranslation("currency-formatting");
  //const {t: tText} = useTranslation("translation");

  const [open, setOpen] = React.useState(false);
  const [firstDistId, setFirstDistId] = useState(0);
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);
  const [shouldWiggle, setShouldWiggle] = useState(false);
  const [perUnitState, setPerUnitState] = useState("");
  const [inStock, setInStock] = useState({
    initial: true,
    nextshipdate: "",
    discontinued: false,
    instock: false,
    hide: false,
    qty: ""
  });

  const [priceTiersState, setPriceTiersState] = useState({
    brackets: null,
    selectedPriceTierIndex: 0
  });

  const initialValue = useRef(true);

  useEffect(() => {
    if (
      props &&
      props.priceInv &&
      props.priceInv.prices.length > 0 &&
      Object.keys(props.priceInv.prices[0]).includes("listprice")
    ) {
      setPrice(props.priceInv.prices[0].listprice);
    }
  }, [props]);

  useEffect(() => {
    if (
      props &&
      props.priceInv &&
      props.priceInv.prices.length > 0 &&
      Object.keys(props.priceInv.prices[0]).includes("price_1")
    ) {
      setDiscountPrice(props.priceInv.prices[0].price_1);
    }
  }, [props]);

  const langState = useSelector(state => state.mainReducer.lang, shallowEqual);

  const currencyState = useSelector(
    state => state.mainReducer.currency,
    shallowEqual
  );

  const checkBoxItemsState = useSelector(
    state => state.productReducer.checkboxItems,
    shallowEqual
  );

  const selectedCheckBoxItemsState = useSelector(
    state => state.productReducer.selectedCheckboxItems,
    shallowEqual
  );

  const supplierInfoState = useSelector(
    state => state.productReducer.supplierInfo,
    shallowEqual
  );

  const priceState = useSelector(
    state => state.productReducer.priceInventory,
    shallowEqual
  );

  const isProductDetailsLoading = useSelector(
    state => state.productReducer.loading,
    shallowEqual
  );

  const attributesState = useSelector(
    state => state.productReducer.itemDetail.attributes,
    shallowEqual
  );

  const attributeid =
    attributesState && attributesState[0] && attributesState[0].attributeid;

  const productAttributeCheckboxFlagState = useSelector(
    state => state.productReducer.productAttributeCheckboxFlag,
    shallowEqual
  );

  const selectedProductCheckboxAttributesState = useSelector(
    state => state.productReducer.selectedProductCheckboxAttributes,
    shallowEqual
  );

  const requestingAddToCartState = useSelector(
    state => state.productReducer.requestingAddToCart,
    shallowEqual
  );

  const mainItemIdState = useSelector(
    state => state.productReducer.itemDetail.mainitemid,
    shallowEqual
  );

  const skusState = useSelector(
    state => state.productReducer.itemDetail.skus,
    shallowEqual
  );

  const itemIdState = useSelector(
    state => state.productReducer.itemDetail.itemid,
    shallowEqual
  );

  const selectedProductAttributesState = useSelector(
    state => state.productReducer.selectedProductAttributes,
    shallowEqual
  );

  const attributeDetailsState = useSelector(
    state => state.productReducer.itemDetail.attributeDetails,
    shallowEqual
  );

  const productInitialProperties = useSelector(
    state => state.productReducer.productInitial.properties,
    shallowEqual
  );

  useEffect(() => {
    if (priceTiersState.brackets && priceTiersState.brackets.length > 1) {
      console.log("priceTiersState", priceTiersState);

      let qty =
        priceTiersState.brackets[priceTiersState.selectedPriceTierIndex]
          .quantity;

      if (qty === 0) {
        if (priceTiersState.selectedPriceTierIndex - 1 >= 0) {
          qty =
            priceTiersState.brackets[priceTiersState.selectedPriceTierIndex - 1]
              .quantity + 1;
        } else {
          qty = 1;
        }
      }

      if (qty) setNumberOfItems(qty);
    }
  }, [priceTiersState]);

  useEffect(() => {
    if (isProductDetailsLoading) {
      setPerUnitState(null);
    } else {
      if (productInitialProperties && productInitialProperties.length > 0) {
        let perUnitProp = productInitialProperties.find(prop =>
          ["Per Unit", "Per-Unit"].includes(Object.keys(prop)[0])
        );
        console.info("perUnitProp", productInitialProperties, perUnitProp);
        if (perUnitProp) setPerUnitState(Object.values(perUnitProp)[0]);
      }
    }
  }, [isProductDetailsLoading, productInitialProperties]);

  useEffect(() => {
    if (priceState?.prices?.[0]) {
      const price = priceState.prices[0];
      const numberOfPrices = Object.keys(price).filter(f =>
        f.includes("price_")
      ).length;
      const brackets = Array.from(
        { length: numberOfPrices },
        (_, i) => i + 1
      ).reduce((a, c) => {
        const bracket = {
          quantity: price[`qty_${c}`],
          price: price[`price_${c}`]
        };
        if (bracket.price) a.push(bracket);

        return a;
      }, []);

      if (priceTiersState.brackets === null) {
        setPriceTiersState({
          brackets: brackets,
          selectedPriceTierIndex: 0
        });
      }
    }
  }, [priceState]);

  useEffect(() => {
    if (
      priceState &&
      Object.keys(priceState).length > 0 &&
      supplierInfoState &&
      supplierInfoState[0] &&
      supplierInfoState[0].distributorOrder
    ) {
      const firstDistId = supplierInfoState[0].distributorOrder[0].distid;
      setFirstDistId(firstDistId);
      setPrice(
        priceState.prices.find(inv => inv.distributorId == firstDistId) &&
          priceState.prices.find(inv => inv.distributorId == firstDistId)
            .price_1
      );

      // determine stock status

      const instockQty =
        priceState.invs && priceState.invs[0] && priceState.invs[0].instock;

      const hidden =
        priceState.invs && priceState.invs[0] && priceState.invs[0].hide;

      const discontinued =
        priceState.invs &&
        priceState.invs[0] &&
        priceState.invs[0].discontinued;

      const nextshipdate =
        priceState.invs &&
        priceState.invs[0] &&
        priceState.invs[0].nextshipdate;

      setInStock({
        initial: false,
        nextshipdate,
        discontinued,
        instock: instockQty > 0,
        hide: hidden,
        qty: instockQty
      });
    }
  }, [priceState, supplierInfoState]);

  const handleSetQuantityInput = e => {
    const value = Number(e.target.value);
    if (
      value > 0 &&
      String(value).length <= 9 &&
      value >= priceTiersState?.brackets?.[0]?.quantity
    )
      setNumberOfItems(Number(e.target.value));
  };

  const handleOnInputBlur = e => {
    const value = e.target.value;
    console.info("value2", value);

    if (value === "") setNumberOfItems(1);
  };

  const renderSelectPriceTiers = () => {
    if (
      priceState &&
      priceState.prices &&
      priceState.prices[0] &&
      priceTiersState.brackets &&
      priceTiersState.brackets.length > 1
    ) {
      const brackets = priceTiersState.brackets;

      const lastBracketIndex = brackets.length - 1;

      if (brackets.length > 0) {
        if (priceTiersState.brackets === null) {
          setPriceTiersState({
            brackets: brackets,
            selectedPriceTierIndex: 0
          });
        }
        return (
          <div className={classes.priceTiersWrapper}>
            <div className={classes.priceTiersHeader}>
              <p>Select Quantity</p>
              <p style={{ color: "#0077AC" }}>
                Min Order:{` ${brackets[0].quantity} Units`}
              </p>
            </div>
            {brackets.map((bracket, index) => {
              const active = priceTiersState.selectedPriceTierIndex === index;

              const nextBracket = index !== 0 ? brackets[index - 1] : null;
              console.log(
                "bracketsbrackets1",
                nextBracket,
                lastBracketIndex,
                priceTiersState
              );
              return (
                <div
                  key={index}
                  className={classes.priceTier}
                  onClick={() => {
                    setPriceTiersState(state => {
                      return { ...state, selectedPriceTierIndex: index };
                    });
                  }}
                >
                  <div className={active ? classes.priceTierActive : ""}></div>
                  {index === 0 ? (
                    <div className={classes.priceTiersQuantity}>
                      <p> {bracket.quantity}</p>
                    </div>
                  ) : (
                    <div className={classes.priceTiersQuantity}>
                      <p>{`${
                        index !== lastBracketIndex
                          ? `${nextBracket.quantity + 1} - ${bracket.quantity}`
                          : `>= ${nextBracket.quantity + 1}`
                      }`}</p>
                    </div>
                  )}

                  <div className={classes.priceTiersPrice}>
                    <p>{`USD ${bracket.price}`}</p>
                  </div>
                </div>
              );
            })}
          </div>
        );
      }
    }
  };
  const convertPriceTo2Decimal = price => {
    return (Math.round(price * 100) / 100).toFixed(2);
  };

  const calculatePrice = () => {
    if (
      selectedProductCheckboxAttributesState &&
      selectedProductCheckboxAttributesState?.[attributeid] &&
      selectedProductCheckboxAttributesState?.[attributeid][0] &&
      selectedProductCheckboxAttributesState.priceInventory[
        selectedProductCheckboxAttributesState?.[attributeid][0]
      ]
    ) {
      const optionId = selectedProductCheckboxAttributesState[attributeid][0];
      const priceAttiribute =
        selectedProductCheckboxAttributesState.priceInventory[optionId]
          .prices[0].price_1;
      return convertPriceTo2Decimal(priceAttiribute * numberOfItems);
    } else if (
      priceTiersState.brackets &&
      priceTiersState.brackets.length > 0
    ) {
      const selectedBracket =
        priceTiersState.brackets[priceTiersState.selectedPriceTierIndex];
      return convertPriceTo2Decimal(selectedBracket.price * numberOfItems);
    } else {
      return convertPriceTo2Decimal(price * numberOfItems);
    }
  };

  const renderPerUnitText = () => {
    if (perUnitState) {
      return (
        <strong className="add-to-cart-box--per-unit-text">
          {perUnitState}
        </strong>
      );
    } else return null;
  };

  return (
    <Wrapper>
      {inStock.initial ? (
        <h1>Loading</h1>
      ) : (
        <>
          <div>
            <div className="buy-box-price-wrapper">
              <div className="text-2xl mt-5">
                {isProductDetailsLoading ? (
                  <h1>Loading</h1>
                ) : (
                  <div>
                    {/*<p>*/}
                    {/*  CAD ${price}{" "}*/}
                    {/*  <span style={{ fontSize: "15px" }}>*/}
                    {/*    Inclusive of all taxes*/}
                    {/*  </span>*/}
                    {/*</p>*/}
                    <div className="sssss">{renderSelectPriceTiers()}</div>
                    {/* <p>
                      {discountPrice !== price ? (
                        <span className="price">
                          <span style={{ textDecoration: "line-through" }}>
                            ${price}
                          </span>
                          <span style={{ marginLeft: "10px" }}>
                            ${discountPrice}
                          </span>
                        </span>
                      ) : (
                        <span className="price">
                          {price}
                          {t("currency", {
                            val: price,
                            style: "currency",
                            currency: currencyState,
                            locale: langState
                          })}
                        </span>
                                            )}{" "}
                                            <span style={{fontSize: "15px"}}>
                        {tText("product.includesTax")}
                      </span>
                    </p> */}
                  </div>
                )}
              </div>
              {renderPerUnitText()}
            </div>
            <div
            // style={{
            //   display:
            //     productAttributeCheckboxFlagState ||
            //     (checkBoxItemsState && checkBoxItemsState.length > 0)
            //       ? "none"
            //       : ""
            // }}
            >
              {/* <div>
                <div className="qtyControlsBox">
                  <div className="qtyControlsBtns">
                    <div
                      className="qtyControlsMinus no-select"

                      style={{ cursor: "pointer" }}
                    >
                      <span>-</span>
                    </div>
                    <input
                      size={String(numberOfItems).length || 1}
                      aria-label="change quantity"
                      className="qtyControlsInput"
                      type="text"
                      value={numberOfItems}
                      onChange={e => {
                        handleSetQuantityInput(e);
                      }}
                      onBlur={handleOnInputBlur}
                    />
                    <div
                      className="qtyControlsPlus no-select"
                      onClick={() => setNumberOfItems(numberOfItems + 1)}
                      style={{ cursor: "pointer" }}
                    >
                      <span>+</span>
                    </div>
                  </div>
                  <div className="clearfix"></div>
                </div>
              </div> */}
              <div id="buyBoxPrice">
                {isProductDetailsLoading ? (
                  <h1>loading</h1>
                ) : (
                  <span className="price">
                    <span className="exactPrice">
                      Price<p> USD {calculatePrice()}</p>
                    </span>

                    {/* {t("currency", {
                                val: calculatePrice(),
                                style: "currency",
                                currency: currencyState,
                                locale: langState
                            })} */}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/*<div className="row">*/}
          {/*    <div className="col-xs-12">*/}
          {/*        <div id="buyBoxItemInfo2">*/}
          {/*            <p>Grand Total: {price}</p>*/}
          {/*        </div>*/}
          {/*        <div id="buyBoxItemInfo3"></div>*/}
          {/*    </div>*/}
          {/*</div>*/}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  //.buy-box-price-wrapper {
  //  display: flex;
  //  flex-direction: column;
  //}

  #buyBoxPrice {
    color: #2e2d3f !important;
    font-size: 1.8em;
    line-height: 56px;
    //float: right;
  }

  .add-to-cart-box--per-unit-text {
    font-size: 24px;
    font-weight: bold;
    width: 100%;
    text-align: left;
  }
  #buyBoxPrice {
    font-size: 1.4em;
    line-height: 56px;
    color: rgb(46, 45, 63) !important;
  }
  .exactPrice {
    letter-spacing: 0px;
    color: rgb(57, 57, 57);
    opacity: 1;

    padding-top: 10px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: start;
    justify-content: flex-start;
  }
  .exactPrice p {
    letter-spacing: 0px;
    color: rgb(0, 119, 172);
    opacity: 1;
    margin-left: 15px;
  }

  .qtyControlsBox {
    /* border: 3px solid #000000; */
    margin: 0px;
    margin-bottom: 10px;
    margin-top: 10px;
    display: inline-flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  }

  .qtyControlsBtns {
    /* float: right; */
    display: flex;
    align-items: center;
    border: 1px solid #999;
    justify-content: space-between;
  }

  .qtyControlsBtns span {
    font-weight: bold;
    text-align: center;
    display: block;
    width: 100%;
    padding: 5px;
  }

  .qtyControlsMinus {
    line-height: 1.42857143;
    background: #f1f1f1;
    border-right: 1px solid #999;
    height: 100%;
    display: flex;
    align-items: center;
    width: 45px;
    font-size: 18px;
  }

  .qtyControlsPlus {
    border-left: 1px solid #999;
    line-height: 1.42857143;
    background: #f1f1f1;
    height: 100%;
    display: flex;
    align-items: center;
    width: 45px;
    font-size: 18px;
  }

  .qtyControlsInput {
    border: 0px !important;
    margin: 0px !important;
    font-weight: bold !important;
    font-size: 1.4em !important;
    height: 45px !important;
    text-align: center !important;
    float: left !important;
    /* border-right: 3px solid #000000 !important; */
    box-sizing: border-box !important;
    width: auto !important;
    padding: 0 14px !important;
  }
`;

export default AddToCartBox;
