import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import styled from "styled-components";
import HamburgerMenu from "../category/HamburgerMenu";
import { shallowEqual, useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import htmldecoder from "../../utils/htmlDecoder";
import { useTranslation } from "next-i18next";
import translate from "../../utils/Translate";
import dynamic from "next/dynamic";
import Modal from "../elements/Modal/Modal.jsx";
const DynamicModal = dynamic(() => import("../elements/Modal/Modal.jsx"));
//import { setAuthModal } from "../../redux/actions/app";
import { toggleWishListAction } from "../../redux/actions/wishlistActions";

import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

const ItemCard = ({
  item,
  setAuthModal,
  authModal,
  hasBorder = true,
  relatedItem = false,
  relatedItemProp
}) => {
  const { t } = useTranslation("currency-formatting");

  const langState = useSelector(state => state.mainReducer.lang, shallowEqual);
  //const [authModal, setAuthModal] = useState(false);
  const currencyState = useSelector(
    state => state.mainReducer.currency,
    shallowEqual
  );

  const authModalState = useSelector(
    state => state.appReducer.authModal,
    shallowEqual
  );

  console.log(
    "item3",
    item,
    `${process.env.NEXT_PUBLIC_IMAGEKIT}/${
      item.itemLargeImage || item.cimage
    }?tr=dpr-1,pr-true,w-200,q-70`
  );
  const [price, setPrice] = useState(0);
  const [discountPrice, setDiscountPrice] = useState(0);

  useEffect(() => {
    if (item?.price?.value?.integer) {
      const integer = Number(item.price.value.integer.replace(/[,.]/g, ""));
      const decimal = Number(item.price.value?.decimal);
      const price = integer + decimal / 100;
      setPrice(price);
    } else {
      setPrice(null);
    }
  }, [item]);

  useEffect(() => {
    if (item && item.price) {
      // setDiscountPrice(item.price.value.integer);
    }
  }, [item]);

  const wishListState = useSelector(
    state => state.wishListReducer.wishlist,
    shallowEqual
  );

  const switchImageOnEnter = e => {
    e.target.style.backgroundImage = `url(${process.env.NEXT_PUBLIC_IMAGEKIT}/tr:h-300,q-70/store/20180522154/assets/items/largeimages/${item.code}-2.jpg)`;
    e.target.style.backgroundSize = "contain";
    e.target.style.backgroundPosition = "center";
    e.target.style.backgroundRepeat = "no-repeat";
    e.target.style.width = "90%";
    e.target.style.margin = "0 auto";
  };
  const switchImageOnLeave = e => {
    e.target.style.backgroundImage = `url(${process.env.NEXT_PUBLIC_IMAGEKIT}/tr:h-300,q-70/store/20180522154/assets/items/largeimages/${item.code}.jpg)`;
    e.target.style.backgroundSize = "contain";
    e.target.style.backgroundPosition = "center";
    e.target.style.backgroundRepeat = "no-repeat";
    e.target.style.width = "90%";
    e.target.style.margin = "0 auto";
  };

  const baseUrl = process.env.NEXT_PUBLIC_PREVIEW_PROJECT_LINK;
  const [isActive, setIsActive] = useState(false);
  const [quantity, setQuantity] = useState(0);

  const dispatch = useDispatch();
  const [moreActive, setMoreActive] = useState(false);

  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isActive && ref.current && !ref.current.contains(e.target)) {
        closeShareModal();
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isActive]);

  const wishlistState = useSelector(
    state => state.wishListReducer.wishlist,
    shallowEqual
  );

  let isItemWishlisted =
    wishlistState && wishlistState.some(i => i.id == item.id);

  const [favouriteState, setFavouriteState] = useState("favorite_border");

  const toggleWish = (
    id,
    title,
    code,
    desc,
    currency_sign,
    image,
    price,
    allPrices,
    // properties,
    url,
    wishlistState
  ) => {
    // e.preventDefault();
    dispatch(
      toggleWishListAction(
        id,
        title,
        code,
        desc,
        currency_sign,
        image,
        price,
        allPrices,
        // properties,
        url,
        wishlistState
      )
    );
  };

  const handleToggleWishlistIcon = (e, id) => {
    e.stopPropagation();
    let wishId = String(id);
    isItemWishlisted
      ? setFavouriteState("favourite_border")
      : setFavouriteState("favourite");

    toggleWish(
      // wishId,
      item.id,
      item.title,
      item.code,
      item.desc,
      item.currency_sign,
      process.env.NEXT_PUBLIC_IMAGEKIT + "/" + item.image,
      item.price.value.integer,
      item.allPrices,
      // item.properties,
      `/${item.url}`,
      wishlistState,
      false
    );

    closeShareModal();
  };

  const closeShareModal = () => {
    setMoreActive(false);
    setIsActive(false);
  };

  const compareListState = useSelector(
    state => state.compareListReducer.compareList,
    shallowEqual
  );

  let isItemCompared =
    compareListState && compareListState.some(i => i.id == item.id);

  const [compareIconState, setCompareIconState] = useState("");

  const handleToggleCompareListIcon = (event, itemId) => {
    event.stopPropagation();
    let compareid = String(itemId);
    isItemCompared && compareIconState === ""
      ? setCompareIconState("-outlined")
      : setCompareIconState("");

    // if item's compare checkbox is not checked
    if (!isItemCompared) {
      dispatch(fetchComparedItemDetails(compareid));
    } else {
      dispatch(deleteComparedItemsDetails(compareid));
    }

    toggleCompare(
      //event,
      compareid,
      item.title,
      item.currency_sign,
      item.image,
      item.price,
      item.url,
      compareListState,
      isItemCompared,
      dispatch,
      deleteCompareItem,
      toggleCompareAction
      // translate
    );

    closeShareModal();
  };

  const toggleClass = e => {
    e.stopPropagation();
    setIsActive(true);
    // runAfterSomeTime(() => setIsActive(false),100);
  };

  const renderTheBackDrop = () => {
    return (
      isActive && (
        <div
          onClick={event => {
            event.stopPropagation();
            setMoreActive(false);
          }}
          className="backdrop"
        ></div>
      )
    );
  };

  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard(url) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(
        `${baseUrl.replace("/preview", "")}/${url}`
      );
    } else {
      return document.execCommand(
        "copy",
        true,
        `${baseUrl.replace("/preview", "")}/${url}`
      );
    }
  }

  const copyLinkToClipboard = (e, url) => {
    copyTextToClipboard(url)
      .then(() => {
        // If successful, update the isCopied state value
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2500);
      })
      .catch(err => {
        console.log(err);
      });
  };

  // console.log("price33", discountPrice, price, item.price, item.price.value);

  return (
    <>
      <Wrapper>
        <div
          className="ymalitem"
          style={{
            //paddingBottom: hasBorder ? "20px" : "0",
            height: relatedItem ? "100% " : "none"
          }}
        >
            <div className="mainimagesss">
              <Link href={`/${item.url}`} prefetch={false}>
                <a
                  tabIndex={"-1"}
                  aria-label={`View ${item.title}`}
                  className="image-link"
                > <img src={`${process.env.NEXT_PUBLIC_IMAGEKIT}/tr:h-300,q-70/store/20180522154/assets/items/largeimages/${item.code}.jpg`} /></a>
              </Link>
              
            </div>
            <div className="maintitlecode"><p>{item.title}</p> <span>{item.code}</span></div>
            
            <div className="maincontent">
              <Link href={`/${item.url}`} prefetch={false}>
                <a
                  className="item-detail "
                >

                View More <img src="https://ik.imagekit.io/ofb/Group_191__1__0duSEoqgU.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1670499363566" />
                </a>
              </Link>
            </div>
        </div>


       
      </Wrapper>
    </>
  );
};

const Wrapper = styled.section`

  width: 100%;

  .item-detail {
      /* padding-top: 10px; */
      display: flex;
      align-items: center;
      justify-content: flex-end;
      font-size: 13px;
  }
  .item-detail img{
      width: 22px;
      margin-left: 5px;
  }
.maintitlecode{
  width:250px;
}
.maintitlecode p{
  font-size: 15px;
  font-weight:500;
}
.maintitlecode span{
  font-size: 13px;
  font-weight:400;
}
.mainimagesss{
  width:200px;
}
.maincontent{
  width:150px;
}

  .ymalitem{
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid #f1f1f1;
    padding-bottom: 0px;
  }

.wrapper {
  height: 100vh;
  /* This part is important for centering the content */
  display: flex;
  align-items: center;
  justify-content: center;
  /* End center */
  background: -webkit-linear-gradient(to right, #834d9b, #d04ed6);
  background: linear-gradient(to right, #834d9b, #d04ed6);
}
.categoryList {
  background: #fff;
  width: 100%;
  height: 100%;
  margin: 40px 0px;
}

.categoryListInner {
  width: 100%;
  margin: 0 auto;
}

.fond {
  display: flex;
}

.carreaux_presentation_light {
  overflow: hidden;
  position: relative;
}

.carreaux_presentation_light .shadow_swhow_mini {
  
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

}

.carreaux_presentation_light:hover .shadow_swhow_mini {
  background-color: rgba(16, 23, 41, 0);
}

.carreaux_presentation_light .deroul_titre {
  
  padding: 7px;
  z-index: 1;
  text-align: center;
  letter-spacing: 0px;
  opacity: 1;
  color: #ffffff;
  font-size: 24px;
  width: 100%;
  transition: all 0.7s;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 266px;
  font-weight: 400;
  flex-direction: column;
  line-height: 35px;

}
.carreaux_presentation_light .deroul_titre span{
  font-size: 14px;
}

.carreaux_presentation_light:hover .deroul_titre {
  

}

.carreaux_presentation_light .deroul_soustitre {
  position: absolute;
  padding: 5px;
  z-index: 1;
  top: 10%;
  right: -85%;
  margin-top: 20px;
  color: #ffffff;
  font-weight: 500;
  font-size: 14px;
  width: 100%;
  transition: all 0.7s;
  text-align: center;
  
}
.carreaux_presentation_light .deroul_soustitre span{
  font-size: 14px;
  letter-spacing: 0px;
  color: var(--primary-color);
  background: var(--bg-header) 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 1px #00000029;
  border-radius: 40px;
  opacity: 1;
  width: 200px;
  height: 45px;
  padding: 10px 40px;
}
.carreaux_presentation_light .deroul_soustitre span:hover{
  background: var(--btn-color) 0% 0% no-repeat padding-box;
  color: var(--second-color);
}
.carreaux_presentation_light:hover .deroul_soustitre {
  right: 0px;
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

.wrapper a {
  display: inline-block;
  text-decoration: none;
  padding: 15px;
  background-color: #fff;
  border-radius: 3px;
  text-transform: uppercase;
  color: #585858;
  font-family: 'Poppins', sans-serif;
}

.modal {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(77, 77, 77, .7);
  transition: all .4s;
  z-index:9;
  width:100%
}

.modal:target {
  visibility: visible;
  opacity: 1;
}

.modal__content {
  position: relative;
  width: 850px;
  max-width: 100%;
  background: #fff;
}
@media screen and (max-width: 768px) {
  .modal__content {
    position: relative;
    width: 100% !important;
    max-width: 100%;
    background: #fff;
    padding-top:50%;
    padding-right:5%;
  }
  .addToCartBtn{
    width: 100% !important;
  }
}
.modal__footer {
  text-align: right;
  a {
    color: #585858;
  }
  i {
    color: #d02d2c;
  }
}
.modal__close {
  position: absolute;
  top: 10px;
  right: 10px;
  color: #585858;
  text-decoration: none;
}

  .image-link {
    background: #fff;
  }

  .image-link span {
    height: 100% !important;
    width: 100% !important;
  }
  .image-link img {
    object-fit: contain;
    width: 120px;
    height: 120px;
    object-position: center;
  }
  .item {
    position: relative;
  }
  .item:hover{
    box-shadow: 0 0 10px #cdcdcd;
  }
 

  img {
    width: 100%;
  }


  .infinite-scroll-component {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px;
    -webkit-column-gap: 20px;
    -moz-column-gap: 20px;
    width: 100%;
    margin-top: 30px;
  }

  .itemFamily {
    
    letter-spacing: 0px;
color: #212B36;
opacity: 1;
    height: 30px;
  }

  .itemBrand {
    font-size: 12px;
    margin-bottom: 0.6rem;
    margin-top: 0.6rem;
    font-style: italic;
    color: rgb(102, 102, 102);
  }
  @media only screen and (max-width: 768px) {
    .popup {
      display: flex;
    align-items: center;
    justify-content: center;
    transition: .64s ease-in-out;
      &-inner {
        flex-direction: column !important;
      }
      .popup__photo{
        width: 100% !important;
      }
      .popup__text{
        width: 100% !important;
      }
      .modal__content{
        width: 100%;
        max-width: 100%;
        background: #fff;
        padding-top: 50%;
        padding-right: 5%;
      }
  }

  .popup {
    display: flex;
  align-items: center;
  justify-content: center;
  transition: .64s ease-in-out;
    &-inner {
      position: relative;
    display: flex;
    align-items: flex-start;
    width: 100%;
    height: 100%;
    background-color: #fff;
    transition: .64s ease-in-out;
    }
    &__photo {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      width: 40%;
      height: 100%;
      overflow: hidden;
      img {
        width: auto;
        height: 100%;
      }
    }
    &__text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 60%;
      height: 100%;
      padding: 10px 2rem;
      h1 {
        font-size: 24px;
        font-weight: 500;
        margin-top: 1.5rem;
        text-transform: capitalize;
        color: #0A0A0A;
        margin-bottom: 1rem;
      }
      p {
        font-size: .875rem;
        color: #686868;
        line-height: 1.5;
      }
    }
    &:target {
      visibility: visible;
      opacity: 1;
      .popup-inner {
        bottom: 0;
        right: 0;
        transform: rotate(0);
      }
    }
    &__close {
      position: absolute;
      right: -1rem;
      top: -1rem;
      width: 3rem;
      height: 3rem;
      font-size: .875rem;
      font-weight: 300;
      border-radius: 100%;
      background-color: #0A0A0A;
      z-index: 4;
      color: #fff;
      line-height: 3rem;
      text-align: center;
      cursor: pointer;
      text-decoration: none;
    }
  }

  .itemTitle {
    display: block;
    font-size: 12px;
    color: rgb(102, 102, 102);
  }

  .itemPrice {
    font-size: 19px !important;
    text-align: left !important;
    font-weight: 600 !important;
    float: left !important;
    margin-top: 0px;
    width: 100% !important;
    justify-content: center;    
    margin-bottom: 5px;
    display: flex;
    align-items: flex-end;
    letter-spacing: 0px;
    color: var(--btn-hover);
    opacity: 1;
  }
  .itemPrice1 {
    font-size: 19px !important;
    text-align: left !important;
    font-weight: 600 !important;
    float: left !important;
    margin-top: 0px;
    width: 100% !important;  
    margin-bottom: 5px;
    display: flex;
    align-items: flex-end;
    letter-spacing: 0px;
    color: var(--btn-hover);
    opacity: 1;
    margin-top: 20px;
  }

  @media only screen and (max-width: 768px) {
    .itemFamily {
      font-size: 21px !important;
    }

    .infinite-scroll-component {
      grid-template-columns: repeat(2, 1fr);

      .item {
        width: 100%;
      }
    }
  }
`;

export default ItemCard;
