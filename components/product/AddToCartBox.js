import React, { useEffect, useRef, useState, useContext } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
    getDeliveryOptions,
    addToLocalMiniCart,
    setAddToCartValidationErrors,
    setProductOutOfStockError, addToCartCheckboxProduct
    // addToCartCheckboxProduct
} from "../../redux/actions/productActions";
import styled from "styled-components";
import * as classes from "../product/Styles/AddToCartBox.module.css"
import { useTranslation } from "next-i18next";
import LinearLoading from "../elements/LinearLoading/LinearLoading";

const AddToCartBox = ({
                          product,
                          productUnavailable,
                          calculatedPriceAndFoundDist,
                          setNumberOfItems,
                          numberOfItems,
                          priceInv,
                          storeInfo,
                          ...props
                      }) => {
    const dispatch = useDispatch();
    const { t } = useTranslation("currency-formatting");
    const { t: tText } = useTranslation("translation");

    console.log('storeInfo', storeInfo);

    const [firstDistId, setFirstDistId] = useState(0);
    const [distName, setDistName] = useState("")
    const [price, setPrice] = useState(0);
    const [discountPrice, setDiscountPrice] = useState(0);
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
            setPrice(priceInv.prices[0].listprice);
            setDiscountPrice(priceInv.prices[0].price_1);
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


    const isMobileState = useSelector(
      state => state.mainReducer.isMobile,
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
            const brackets = Array.from([1, 2, 3, 4]).reduce((a, c) => {
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
            setDistName(supplierInfoState[0].distributorOrder[0].name);
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
        if (value === 0) setNumberOfItems("");
        else if (value > 0 && String(value).length <= 9)
            setNumberOfItems(Number(e.target.value));
    };

    const handleAddToCart = (quoteMode = false) => {
        if (!inStock) {
            dispatch(setProductOutOfStockError(true));
            return;
        }
        let attributesObject = null;

        let requiredFields = [];

        if (productAttributeCheckboxFlagState.checkbox) {
            console.log("handleAddToCart", productAttributeCheckboxFlagState);
            let expectedAttributeIdAndScreenName = "";
            if (attributeDetailsState && attributeDetailsState.length > 0) {
                expectedAttributeIdAndScreenName = attributeDetailsState[0];
            }

            let hasSelectedAttribute =
              selectedProductCheckboxAttributesState &&
              selectedProductCheckboxAttributesState[
                expectedAttributeIdAndScreenName.attributeid
                ] &&
              selectedProductCheckboxAttributesState[
                expectedAttributeIdAndScreenName.attributeid
                ].length > 0;

            if (!hasSelectedAttribute)
                requiredFields.push(expectedAttributeIdAndScreenName.screenname);
        } else {
            if (
              selectedProductAttributesState.hasOwnProperty(
                mainItemIdState || itemIdState
              )
            ) {
                attributesObject =
                  selectedProductAttributesState[mainItemIdState || itemIdState];

                let expectedAttributes = attributeDetailsState.reduce((p, c) => {
                    const { screenname, attributeid } = c;
                    p = [...p, { screenname, attributeid }];
                    return p;
                }, []);

                let receivedAttributeIds = Object.keys(attributesObject);

                console.info(
                  "addToCartTest",
                  attributesObject,
                  expectedAttributes,
                  receivedAttributeIds
                );

                expectedAttributes.forEach(attr => {
                    if (!receivedAttributeIds.includes(attr.attributeid.toString()))
                        requiredFields.push(attr.screenname);
                });
            } else {
                if (attributeDetailsState && attributeDetailsState.length > 0) {
                    let expectedAttributes = attributeDetailsState.reduce((p, c) => {
                        const { screenname, attributeid } = c;
                        p = [...p, { screenname, attributeid }];
                        return p;
                    }, []);

                    expectedAttributes.forEach(attr => {
                        requiredFields.push(attr.screenname);
                    });
                }
            }
        }

        dispatch(setAddToCartValidationErrors(requiredFields));
        if (requiredFields.length > 0) {
            return;
        }
        let firstDist = supplierInfoState[0]?.distributorOrder[0];

        let vid = firstDist?.supplier_store_vid;
        if (
          productAttributeCheckboxFlagState.checkbox &&
          selectedCheckBoxItemsState &&
          selectedCheckBoxItemsState.length === 0
        ) {
            let itemCount =
              selectedProductCheckboxAttributesState &&
              selectedProductCheckboxAttributesState[attributeid] &&
              selectedProductCheckboxAttributesState[attributeid].length;

            let priceInventory =
              selectedProductCheckboxAttributesState &&
              selectedProductCheckboxAttributesState.priceInventory;
            let products = [];

            let keys = Object.keys(priceInventory).filter(key =>
              selectedProductCheckboxAttributesState[attributeid].includes(
                Number(key)
              )
            );

            let outOfStockAll = true;
            for (let key of keys) {
                let product = {};
                product.attributes = [attributeid, key];
                product.optionId = key;
                product.id = priceInventory[key].itemid;
                product.distributorId = priceInventory[key].invs[0].distributorId;
                product.qty =
                  productAttributeCheckboxFlagState.format === "radio"
                    ? numberOfItems
                    : priceInventory[key].qty; // due to the difference between setting the quantity for when the attributte is single and when it's rendered as radio vs checkbox

                //if out of stock don't add to the list of products and reduce the number of selected items
                if (priceInventory[key].invs[0].instock) {
                    products.push(product);
                    outOfStockAll = false;
                } else {
                    itemCount -= 1;
                }
            }

            if (outOfStockAll) {
                dispatch(setProductOutOfStockError(true));
                return;
            }

            dispatch(
              addToCartCheckboxProduct(
                itemIdState,
                itemCount,
                products,
                0,
                false,
                vid
              )
            );
        } else if (
          productAttributeCheckboxFlagState.checkbox &&
          selectedCheckBoxItemsState &&
          selectedCheckBoxItemsState.length > 0
        ) {
            let itemCount =
              selectedProductCheckboxAttributesState &&
              selectedProductCheckboxAttributesState[attributeid] &&
              selectedProductCheckboxAttributesState[attributeid].length;

            itemCount += selectedCheckBoxItemsState.length;

            let priceInventory =
              selectedProductCheckboxAttributesState &&
              selectedProductCheckboxAttributesState.priceInventory;
            let products = [];

            let keys = Object.keys(priceInventory).filter(key =>
              selectedProductCheckboxAttributesState[attributeid].includes(
                Number(key)
              )
            );

            let outOfStockAll = true;
            for (let key of keys) {
                let product = {};
                product.attributes = [attributeid, key];
                product.optionId = key;
                product.id = priceInventory[key].itemid;
                product.distributorId = priceInventory[key].invs[0].distributorId;
                product.qty = priceInventory[key].qty;

                //if out of stock don't add to the list of products and reduce the number of selected items
                if (priceInventory[key].invs[0].instock) {
                    products.push(product);
                    outOfStockAll = false;
                } else {
                    itemCount -= 1;
                }
            }

            // add the extras to the products
            selectedCheckBoxItemsState.forEach(item => {
                let product = {};
                product.id = item.id;
                product.distributorId = item.distId;
                product.qty = item.qty;
                products.push(product);
            });

            if (outOfStockAll) {
                dispatch(setProductOutOfStockError(true));
                return;
            }

            /*  let attributesObject = {};

            attributesObject = selectedProductCheckboxAttributesState[
              attributeid
            ].map(optionid => {
              return [attributeid, optionid];
            }); */

            dispatch(addToCartCheckboxProduct(itemCount, products, 0, false, vid));
        } else if (
          selectedCheckBoxItemsState &&
          selectedCheckBoxItemsState.length > 0
        ) {
            let itemCount = 1 + selectedCheckBoxItemsState.length;
            let products = [];

            // add the actual product to the list of products
            let productItself = {
                distributorId: priceState.prices.find(
                  inv => inv.distributorId == firstDistId
                ).distributorId,
                id: priceState.itemid,
                qty: 1
            };

            products.push(productItself);

            selectedCheckBoxItemsState.forEach(item => {
                let product = {};
                product.id = item.id;
                product.distributorId = item.distId;
                product.qty = item.qty;
                products.push(product);
            });

            dispatch(
              addToCartCheckboxProduct(
                itemIdState,
                itemCount,
                products,
                0,
                attributesObject,
                false,
                vid
              )
            );
        } else {
            dispatch(
              getDeliveryOptions(
                priceState?.prices?.find(inv => inv.distributorId == firstDistId)
                  .distributorId,
                priceState.code,
                numberOfItems,
                priceState.itemid,
                attributesObject,
                quoteMode,
                vid
              )
            );
        }
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
                            <p style={{ color: "#222" }}>
                                Min Order:{` ${brackets[0].quantity} Units`}
                            </p>
                        </div>
                        {brackets.map((bracket, index) => {
                            const active = priceTiersState.selectedPriceTierIndex === index;

                          const nextBracket = index !== 0 ? brackets[index - 1] : null;
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
                                        <p>{`$${bracket.price}`}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                );
            }
        }
    };

    const calculatePrice = () => {
        if (priceTiersState.brackets && priceTiersState.brackets.length > 0) {
            const selectedBracket =
              priceTiersState.brackets[priceTiersState.selectedPriceTierIndex];
            return selectedBracket.price * numberOfItems;
        } else {
            return price * numberOfItems;
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
                            <div className="mainprice">
                            <div className="text-2xl">
                                {isProductDetailsLoading ? (
                                    <h1>Loading</h1>
                                ) : (
                                    <div>
                                        <p>
                                            {discountPrice !== price ? (
                                                <span className="price">
                                                    <span className="discountPrice" style={{}}>
                                                        $ {priceInv.prices[0].price_1}
                                                    </span>
                                                    <span className="OfferedPrice" style={{ textDecoration: "line-through", marginLeft: "10px" }}>
                                                        $ {priceInv.prices[0].listprice}
                                                    </span>



                                                </span>
                                            ) : (
                                                <span className="price">
                                                    {" "}
                                                    {t("currency", {
                                                        val: price,
                                                        style: "currency",
                                                        currency: currencyState,
                                                        locale: langState
                                                    })}
                                                </span>
                                            )}{" "}
                                            <span style={{ fontSize: "15px" }}>

                                            </span>
                                        </p>

                                        <div className="sssss">{renderSelectPriceTiers()}</div>

                                    </div>
                                )}
                            </div>
                            <p style={{ fontSize: "18px"}}>Grand total:  <span className="OfferedPrice">$ {calculatePrice()}</span></p>
                            </div>
                            {/*{renderPerUnitText()}*/}
                            <div style={{display: "flex", justifyContent:"space-between", alignItems: "center", margin: "20px 0px"}}>
                                <div className="qtyControlsBox">
                                    <div className="qtyControlsBtns">

                                        <div
                                          className="qtyControlsMinus no-select"
                                          onClick={() => {
                                              if (numberOfItems - 1 > 0) {
                                                  setNumberOfItems(numberOfItems - 1);
                                              }
                                          }}
                                          style={{cursor: "pointer"}}
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
                                          style={{cursor: "pointer"}}
                                        >
                                            <span>+</span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                  tabIndex={"0"}
                                  onKeyDown={e => {
                                      if (e.code === "Enter") {
                                          e.target.click();
                                      }
                                  }}
                                  className="addToCartBtnss"
                                  title="Add to cart"
                                  onClick={() => handleAddToCart()}
                                >

                                    <span>Add to Cart</span>
                                </div>
                                {/* {requestingAddToCartState ? <LinearLoading/> : null} */}
                                {!inStock && (
                                  <>
                                      <div className="add-to-cart-stock-status">
                                          The supplier may still be in progress updating the inventory for
                                          this product. Click the Chat button below to chat with the
                                          supplier to confirm availability.
                                      </div>
                                  </>
                                )}

                            </div>
                            
                        </div>

                    </div>


                </>
            )}
        </Wrapper>
    );
};

const Wrapper = styled.div`
    .addToCardBoxWrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 30px;
    }


    @media only screen and (min-width: 320px) and (max-width: 767px) {
        .addToCartBtn {
            width: 100% !important;
        }

    }

    #buyBoxAddToCartBtn {
        display: flex;
    }

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

    .qtyControlsBox {
        /* border: 3px solid #000000; */
        margin: 0px;
        margin-bottom: 0px;
        margin-top: 0px;
        display: inline-flex;
        justify-content: space-between;
        flex-direction: column;
    }

    .qtyControlsBtns {
        /* float: right; */
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 250px;
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
        background: #FFFFFF 0% 0% no-repeat padding-box;
        border: 1.5px solid #F28312;
        border-radius: 5px 0px 0px 5px;    
        opacity: 1;
        height: 100%;
        display: flex;
        align-items: center;
        width: 75px;
        height: 50px;
    }

    .qtyControlsPlus {
        background: var(--unnamed-color-ffffff) 0% 0% no-repeat padding-box;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        border: 1.5px solid #F28312;
        border-radius: 0px 5px 5px 0px;
        opacity: 1;
        line-height: 1.42857143;
        height: 100%;
        display: flex;
        align-items: center;
        width: 75px;
        height: 50px;
    }

    .qtyControlsInput {
        margin: 0px !important;
        font-weight: 500 !important;
        font-size: 15px !important;
        height: 50px !important;
        text-align: center !important;
        float: left !important;
        box-sizing: border-box !important;
        width: auto !important;
        padding: 0 14px !important;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        border: 1.5px solid #F28312;
        opacity: 1;
        border-left: 0px;
        border-right: 0px;
        text-align: center;
        letter-spacing: 0px;
        color: #212B36;
        opacity: 1;
        width: 150px !important;
    }

    .addToCartBtnss {
        font-size: 15px;
        text-align: center;
        cursor: pointer;
        text-transform: capitalize;
        font-weight: normal;
        min-width: 180px;
        background: #F39B42;
        box-shadow: 0px 3px 1px #00000029;
        border-radius: 5px;
        opacity: 1;
        color: #fff;
        width: 50%;
        height: 50px;
        padding: 10px 0px;
        align-items: center;
        display: flex;
        justify-content: center;
    }
`;

export default AddToCartBox;
