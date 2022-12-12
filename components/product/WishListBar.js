import React, { useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { toggleWishListAction } from "../../redux/actions/wishlistActions";
import styled from "styled-components";
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

const Wrapper = styled.div`
  .wishlist-btn {
     
  }
`;

const WishListBar = ({ data, productUnavailable, price: pPrice, product }) => {
  const { t } = useTranslation("translation");
  const dispatch = useDispatch();
  const router = useRouter();

  const [favouriteState, setFavouriteState] = useState("favorite_border");

  const wishListState = useSelector(
    state => state.wishListReducer.wishlist,
    shallowEqual
  );

  const productState = useSelector(
    state => state.productReducer.product,
    shallowEqual
  );

  const productLinkState = useSelector(
    state => state.productReducer.productInitial.productLink,
    shallowEqual
  );

  const itemDetail = useSelector(
    state => state.productReducer.itemDetail,
    shallowEqual
  );

  const productPrice = useSelector(
    state => state.productReducer.priceInventory,
    shallowEqual
  );

  let isItemWishlisted =
    wishListState.length > 0
      ? wishListState.some(w => w.id == itemDetail.itemId)
      : false;


  const toggleWish = e => {
    e.preventDefault();

    dispatch(
      toggleWishListAction(
        product.itemid,
        product.title,
        product.code,
        product.shortdesc,
        (product.currency_sign = "$"),
        `${product.image3}`,
        productPrice.prices[0].listprice,
        productPrice.prices?.map(i => i.price_1),
        // { product.title, brand },
        router.asPath,
        wishListState,
        product?.attributes && product?.attributes?.length > 0 ? true : false
      )
    );
  };

  const handleToggleWishlistIcon = e => {
    isItemWishlisted
      ? setFavouriteState("favourite_border")
      : setFavouriteState("favourite");
    toggleWish(e);
  };

  return (
    <Wrapper>
      <div
        tabIndex={"0"}
        onKeyDown={e => {
          if (e.code === "Enter") {
            e.target.click();
          }
        }}
        onClick={e => {
          handleToggleWishlistIcon(e);
        }}
        className="focusAble"
        style={{
          paddingLeft: "0px",
          cursor: "pointer"
        }}
        onMouseEnter={() => setFavouriteState("favorite")}
        onMouseLeave={() => setFavouriteState("favorite_border")}
      >
        {wishListState.filter(w => w.id == product.itemid).length > 0 ? (
          <p
          >
            <span id="buyBoxWishlist">
              <span
                className="wishlistHeart"
                title="Remove from wishlist"
              ></span>
            </span>
            <img src="https://ik.imagekit.io/ofb/themes/heart__1___1__w2s0eEm63.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1666676255701" />
            
          </p>
        ) : (
          <p
          >
            <span id="buyBoxWishlist">
              <span className="wishlistHeart" title="Add to wishlist"></span>
            </span>
            <img src="https://ik.imagekit.io/ofb/themes/Group_79_AxJIStywbY.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1665052318950" />
            
          </p>
        )}
      </div>
    </Wrapper>
  );
};

export default WishListBar;
