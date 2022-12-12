import {useState, useEffect, useMemo} from "react";
import {useSelector, shallowEqual, useDispatch} from "react-redux";
import {
  getDeliveryOptions,
  setAddToCartValidationErrors
} from "../../redux/actions/productActions";
import {toggleLocationBoxAction} from "../../redux/actions/handlersAction";
import styled from "styled-components";
import {MdOutlineShoppingCart} from "react-icons/md";
import WishListBar from "./WishListBar";
import LinearLoading from "../elements/LinearLoading/LinearLoading";
import {useTranslation} from "next-i18next";
import {MdChat} from "react-icons/md";
import {setAuthModal} from "../../redux/actions/app";


const AddToCart = ({
                     calculatedPriceAndFoundDist,
                     productUnavailable,
                     priceInv,
                     storeInfo,
                     numberOfItems,
                     setNumberOfItems,
                     productDetailsData
                   }) => {
  const dispatch = useDispatch();

  const {t} = useTranslation("translation");
  const login = useSelector(state => state.loginReducer, shallowEqual);

  const [inStock, setInStock] = useState(true);
  const [price, setPrice] = useState(0);
  const [priceTiersState, setPriceTiersState] = useState({
    brackets: null,
    selectedPriceTierIndex: 0
  });

  console.log("PRODUCT UNAV ", productUnavailable);

  const mainItemIdState = useSelector(
    state => state.productReducer.itemDetail.mainitemid,
    shallowEqual
  );
  const itemIdState = useSelector(
    state => state.productReducer.itemDetail.itemid,
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


  const distIdStateAndPrice = useMemo(() => {
    if (
      supplierInfoState?.[0]?.distributorOrder?.[0]?.distid &&
      priceState?.prices?.[0]?.price_1
    ) {
      const firstDistId = supplierInfoState[0].distributorOrder[0].distid;
      const price = priceState.prices.find(
        inv => inv.distributorId == firstDistId
      );

      return {distId: firstDistId, price};
    }

    return {distId: null, price: null};
  }, [supplierInfoState, priceState]);

  console.log("distIdStateAndPrice", distIdStateAndPrice);

  const checkBoxItemSelected = useSelector(
    state => state.productReducer.checkboxItemSelected,
    shallowEqual
  );


  const checkBoxItemsState = useSelector(
    state => state.productReducer.checkboxItems,
    shallowEqual
  );


  const productAttributeCheckboxFlagState = useSelector(
    state => state.productReducer.productAttributeCheckboxFlag,
    shallowEqual
  );

  const checkBoxItem = useSelector(
    state => state.productReducer.accessoryModal,
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

  const userLocationState = useSelector(
    state => state.userLocationReducer,
    shallowEqual
  );

  const requestingAddToCartState = useSelector(
    state => state.productReducer.requestingAddToCart,
    shallowEqual
  );

  const securityTokenState = useSelector(
    state => state.loginReducer.securityToken,
    shallowEqual
  );

  const handleAddToCart = () => {
    /*   if (!userLocationState.lat && !userLocationState.lng) {
            handleCheckUserlocationState();
            return;
        } */

    let attributesObject = null;

    let requiredFields = [];

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

      if (mainItemIdState != 0) {
        expectedAttributes.forEach(attr => {
          if (!receivedAttributeIds.includes(attr.attributeid.toString()))
            requiredFields.push(attr.screenname);
        });
      } else {
        expectedAttributes.forEach(attr => {
          requiredFields.push(attr.screenname);
        });
      }
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

    dispatch(setAddToCartValidationErrors(requiredFields));

    if (requiredFields.length > 0) {
      return;
    }

    dispatch(
      getDeliveryOptions(
        distIdStateAndPrice.distId,
        distIdStateAndPrice.price.itemcode,
        numberOfItems,
        distIdStateAndPrice.price.itemid,
        attributesObject
      )
    );

    if (checkBoxItemSelected) {
      dispatch(
        getDeliveryOptions(
          // priceState.prices[0].distributorId,
          checkBoxItem.priceInv.prices[0].distributorId,
          //priceState.code,
          checkBoxItem.details.code,
          //numberOfItems,
          1,
          //priceState.itemid,
          checkBoxItem.details.itemid,
          //attributesObject,
          null
        )
      );
    }
  };



  return (
    <Wrapper>
      <div className="flex flex-wrap" style={{alignItems: "flex-start", justifyContent: "space-between"}}>

        <div
          style={{
            display:
              productAttributeCheckboxFlagState ||
              (checkBoxItemsState && checkBoxItemsState.length > 0)
                ? "none"
                : ""
          }}
        >
          <div>
            <div className="qtyControlsBox">
              <p style={{
                fontSize: "14px",
                marginBottom: "10px"
              }}
              >Quantity</p>
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
              <div className="clearfix"></div>
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
          className="focusAble addToCartBtn mb-5"
          title="Add to cart"
          onClick={() => handleAddToCart()}
        >

          <span>Add to Shopping Bag</span>
        </div>
        {requestingAddToCartState ? <LinearLoading/> : null}
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

  .addToCartBtn {
    font-size: 15px;
    text-align: center;
    cursor: pointer;
    text-transform: capitalize;
    font-weight: normal;
    min-width: 180px;
    border-radius: 3px;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 1px #00000029;
    border-radius: 40px;
    opacity: 1;
    color: #232323;
    width: 50%;
  }
`;

export default AddToCart;
