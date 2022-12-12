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

  const handleSetQuantity = type => {
    if (type === "minus") {
      numberOfItems > 1 ? setNumberOfItems(numberOfItems - 1) : null;
    } else {
      setNumberOfItems(numberOfItems + 1);
    }
  };

  const handleOnInputBlur = e => {
    const value = e.target.value;
    console.info("value2", value);

    if (value === "") setNumberOfItems(1);
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
              <div className="text-2xl">
                {isProductDetailsLoading ? (
                  <h1>Loading</h1>
                ) : (
                  <div>
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
                      ) : null}{" "}
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
              <div>
                <div className="qtyControlsBox">
                  <div className="qtyControlsBtns">
                    <div
                      className="qtyControlsMinus no-select"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleSetQuantity("minus")}
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
                      onClick={() => handleSetQuantity("plus")}
                      style={{ cursor: "pointer" }}
                    >
                      <span>+</span>
                    </div>
                  </div>
                  <div className="clearfix"></div>
                </div>
              </div>
            </div>
          </div>
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

  .qtyControlsBox {
    /* border: 3px solid #000000; */
    margin: 0px;
    margin-bottom: 0px;
    margin-top: 10px;
    display: inline-flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  }

  .qtyControlsBtns {
    /* float: right; */
    display: flex;
    align-items: center;
    border: 1px solid #0077ac;
    border-radius: 10px 10px 10px 10px;
    justify-content: space-between;
  }

  .qtyControlsBtns span {
    font-weight: normal;
    text-align: center;
    display: block;
    width: 100%;
    padding: 0px 5px;
    font-size: 21px;
  }

  .qtyControlsMinus {
    line-height: 1.42857143;
    background: #fff;
    border-right: 1px solid #0077ac;
    height: 100%;
    display: flex;
    align-items: center;
    width: 80px;
    font-size: 33px;
    border-radius: 10px 0px 0px 10px;
  }

  .qtyControlsPlus {
    border-left: 1px solid #0077ac;
    line-height: 1.42857143;
    background: #fff;
    height: 100%;
    display: flex;
    align-items: center;
    width: 80px;
    font-size: 18px;
    border-radius: 0px 10px 10px 0px;
  }

  .qtyControlsInput {
    border: 0px !important;
    margin: 0px !important;
    font-weight: normal !important;
    font-size: 1.2em !important;
    height: 40px !important;
    text-align: center !important;
    float: left !important;
    /* border-right: 3px solid #000000 !important; */
    box-sizing: border-box !important;
    width: auto !important;
    padding: 0 14px !important;
  }
`;

export default AddToCartBox;
