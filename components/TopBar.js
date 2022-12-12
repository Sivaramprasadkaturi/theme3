import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  MdFavorite,
  MdFavoriteBorder,
  MdOutlineShoppingCart,
  MdPersonOutline,
  MdClose,
  MdDelete,
  MdOutlineAccountCircle,
  MdOutlineFavoriteBorder,
  MdOutlineFavorite,
  MdOutlineShoppingBag
} from "react-icons/md";
//import { SlHeart } from "react-icons/sl";
//import { TfiHeart } from "react-icons/tfi";
import {
  IoAlarmOutline,
  IoBagOutline,
  IoHeartOutline,
  IoHeartSharp,
  IoPersonOutline
} from "react-icons/io5";

import { VscHeart, VscAccount } from "react-icons/vsc";
import Image from "next/image";
import Nav from "./Nav";
import FullNav from "./FullNav";
import Link from "next/link";
import {
  addFunctionWishList,
  toggleWishListAction
} from "../redux/actions/wishlistActions.js";
import Search from "./header/Search.js";
import { handleMobileOrDesktop } from "../redux/actions/mainActions";
// import HamburgerMenu from "./header/HamburgerMenu";
// import Auth from "./elements/Auth/Auth";
// import Drawer from "./elements/Drawer/Drawer.jsx";
// import MiniCart from "./elements/MiniCart/MiniCart.jsx";
import { setAuthModal } from "../redux/actions/app";
import dynamic from "next/dynamic";
import WishListAddToCart from "./product/WishListAddToCart";
import {
  addToCartModalClose,
  addToLocalMiniCart,
  changeProductAttributesAction,
  unMountProductPageAction
} from "../redux/actions/productActions";
import { useRouter } from "next/router";
import Internationalization from "./Internationalization/Internationalization.jsx";
import { useTranslation } from "next-i18next";
import App from "../themeSetUp/App";
import * as themes from "../themeSetUp/theme/schemas.json";
import { setToLS } from "../themeSetUp/utils/storage";

const DynamicHamburgerMenu = dynamic(() => import("./header/HamburgerMenu"));
const DynamicAuth = dynamic(() => import("./elements/Auth/Auth"));
const DynamicDrawer = dynamic(() => import("./elements/Drawer/Drawer.jsx"));
const DynamicMiniCart = dynamic(() =>
  import("./elements/MiniCart/MiniCart.jsx")
);

const Wrapper = styled.div`
  height: 84px;
  width: 100%;
  display: flex;
  align-items: center;

  .locationLink,
  .search {
    display: flex;
  }
  @media (max-width: 767px) {
    .search {
      display: none;
    }
    .logo a {
      font-weight: 400 !important;
      font-size: 22px !important;
    }
  }

  .bg-red-600 {
    --tw-bg-opacity: 1;
  }

  .logo a {
    color: #192a3d;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 24px;
    line-height: 1.5;
    letter-spacing: 0em;
    transition: color 0.2s ease;
    :hover {
      color: #d6a09b;
    }
  }
  .Internationalization_display__AxDjv {
    color: var(--text1);
  }

  .basket-count-badge {
    font-family: 'Poppins', sans-serif;
    color: #fff;
    display: flex;
    justify-content: center;
    align-content: center;
    position: absolute;
    top: 14px;
    background-color: #f39b42;
    border-radius: 10px;
    box-sizing: border-box;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 0.75rem;
    font-weight: 400;
    height: 18px;
    left: 60%;
    margin-left: 0 !important;
    min-width: 18px;
    padding: 0 6px;
  }

  .icons a svg,
  .locationLink svg {
    color: var(--secondary);
  }

  .topBar {
    height: 100%;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    margin: 0 auto;

    .topbar--desktop,
    .topbar--mobile {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .topbar--mobile {
      display: none;
    }

    .topbar--desktop__left,
    .topbar--desktop__right {
      height: 100%;
      display: flex;
      gap: 32.5px;
      align-items: center;
    }
  }

  .topBar > div {
    flex-grow: 1;
  }

  .locationLink {
    padding-top: 3px;
  }

  .locationLink a {
    font-weight: 500;
    color: var(--black);
  }

  .locationLink svg,
  .icons svg {
    font-size: 27px;
  }

  .locationLink svg {
    margin-right: 7px;
  }

  .locationLink p {
    font-size: 1em;
  }

  .topBar > div.search {
    flex-grow: 2;
  }

  .search input {
    border: 1px solid var(--black);
    border-right: 0px;
    //padding-left: 10px;
    width: 70%;
    min-width: 200px;
    padding: 12px 10px;
    border-radius: 5px;
  }

  .search button {
    padding: 12px 10px;
    border: 1px solid var(--black);
    border-left: 0px;
    background-color: var(--white);
    color: var(--black);
    font-size: 1.4em;
  }

  .icons {
    text-align: right;
  }
  .text-secondary img {
    width: 27px;
    height: 27px;
    object-fit: contain;
    margin-right: 10px;
  }

  @media only screen and (max-width: 1024px) {
    .wg-default,
    .wg-default .country-selector {
      right: 20% !important;
    }

    .topbar--desktop {
      display: none !important;
    }

    .topbar--mobile {
      display: flex !important;
    }
  }
`;

const WishList = ({ showWishList, setWishlist, onClose }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const wishListState = useSelector(
    state => state.wishListReducer.wishlist,
    shallowEqual
  );
  const { t } = useTranslation("translation");

  const handleWishItemClicked = (url, hasAttributes) => {
    if (isBrowser() && window.location.pathname != url.replace("product", "")) {
      console.log("FARUK1234");
      dispatch(unMountProductPageAction());
    }
    dispatch(changeProductAttributesAction({ ...hasAttributes }));
    onClose();
    router.push(url);
  };

  const toggleWish = (
    id,
    title,
    desc,
    currency_sign,
    image,
    price,
    allPrices,
    properties,
    url
  ) => {
    // e.preventDefault();
    dispatch(
      toggleWishListAction(
        // e,
        id,
        title,
        desc,
        currency_sign,
        image,
        price,
        allPrices,
        properties,
        url,
        wishListState
      )
    );
  };

  useEffect(() => {
    let storedWishListString = localStorage.getItem("wishList");
    let storedWishListObject = JSON.parse(storedWishListString);
    if (storedWishListObject != null)
      dispatch(addFunctionWishList([...storedWishListObject]));
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem("wishList", JSON.stringify(wishListState));
  }, [wishListState]);

  return (
    <div className="h-full bg-white">
      <div
        style={{ top: 0 }}
        className="absolute mx-auto my-0 w-full p-5 flex items-center justify-between font-semibold text-xl bg-black text-white"
      >
        <h2>{t("wishlist.title")}</h2>
        <i
          tabIndex="0"
          onKeyDown={e => {
            if (e.code === "Enter") e.target.click();
          }}
          className="focusAbleWhite text-white text-3xl cursor-pointer"
          onClick={onClose}
        >
          <MdClose />
        </i>
      </div>

      <div
        className="h-full flex flex-col w-full p-5"
        style={{ overflow: "auto", marginTop: "70px", paddingBottom: "80px" }}
      >
        {wishListState.length > 0 ? (
          wishListState.map(item => {
            console.log("item123", item);
            return (
              <div
                className="p-6 my-3 bg-white border shadow flex justify-between items-start relative"
                key={item.id}
              >
                <div className=" w-4/12">
                  <Link href={`${item.url}`}>
                    <a onClick={onClose}>
                      <Image
                        layout="intrinsic"
                        src={`https://ik.imagekit.io/ofb/starter/store/20180522154/assets/items/largeimages/${item.code}.jpg`}
                        width={100}
                        height={100}
                        alt={item.title}
                        objectFit={"cover"}
                        objectPosition={"top"}
                      />{" "}
                    </a>
                  </Link>
                </div>
                <div className="w-8/12 flex flex-col px-3">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <p className="text-xs font-semibold mt-3">
                    <span className="font-light">{t("items.code")}:</span>{" "}
                    {item.code}
                  </p>
                  <p
                    className="text-sm font-semibold mt-3"
                    style={{ color: "rgb(254, 79, 0)" }}
                  >
                    ${item.price}
                  </p>
                  {/* <p> <span>$ </span>
          {item?.price}</p> */}
                </div>
                <div
                  className="absolute bottom-5 right-5 cursor-pointer text-2xl text-gray-400"
                  onClick={e => {
                    toggleWish(
                      item.id,
                      item.title,
                      item.desc,
                      item.currency_sign,
                      item.image,
                      item.price,
                      item.allPrices,
                      // item.properties,
                      item.url,
                      wishListState,
                      false
                    );
                    setWishlist(
                      wishListState.filter(wish => wish.id !== item.id)
                    );
                    localStorage.setItem(
                      "wishList",
                      JSON.stringify([
                        ...JSON.parse(localStorage.getItem("wishList")).filter(
                          w => w.id !== item.id
                        )
                      ])
                    );
                  }}
                >
                  <MdDelete
                    style={{
                      height: "30px",
                      width: "30px"
                    }}
                  />
                </div>
                <WishListAddToCart
                  onClose={() => onClose()}
                  handleWishItemClicked={() =>
                    handleWishItemClicked(item.url, "hasAttributes")
                  }
                  products={{
                    ...item,
                    vid: process.env.NEXT_PUBLIC_VID,
                    qty: 1
                  }}
                />
              </div>
            );
          })
        ) : (
          <div style={{ height: "200px" }}>
            <h1
              style={{
                color: "#10601f",
                textAlign: "center",
                fontSize: "1.5em",
                fontWeight: "600"
              }}
            >
              No item in the wishlist
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

const TopBar = ({ menu, locale }) => {
  console.log("locale33", locale);
  const [showWishList, setShowWishList] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  
  const [showThemes, setShowThemes] = useState(false);
  const [menuRegular, setMenuRegular] = useState("regular");
  const [catRegular, setCatRegular] = useState("regular");
  console.log("menuRegular1", menuRegular);
  const [colorTheme, setColorTheme] = useState("theme-pink");

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("theme-color");
    if (currentThemeColor) {
      setColorTheme(currentThemeColor);
      document.documentElement.className = currentThemeColor;
    }
  }, [colorTheme]);

  const handleClickMenuRegular = regular => {
    let consent = {
      menu: regular
    };
    localStorage.setItem("menu", JSON.stringify(consent));
    //setMenuRegular(consent);
  };

  useEffect(() => {
    const currentRegularMenu = JSON.parse(localStorage.getItem("menu"));
    if (currentRegularMenu) {
      setMenuRegular(currentRegularMenu);
    }
  }, [menuRegular]);

  useEffect(() => {
    const currentRegularCat = JSON.parse(localStorage.getItem("Cat"));
    if (currentRegularCat) {
      setCatRegular(currentRegularCat);
    }
  }, [catRegular]);

  const addToCartSuccess = useSelector(
    state => state.productReducer.addToCartSuccess,
    shallowEqual
  );
  const wishListState = useSelector(
    state => state.wishListReducer.wishlist,
    shallowEqual
  );
  const dispatch = useDispatch();

  const authModalState = useSelector(
    state => state.appReducer.authModal,
    shallowEqual
  );

  const mobileSize = 1023;
  const [currentScreenWidth, setCurrentScreenWidth] = useState(undefined);

  useEffect(() => {
    if (currentScreenWidth !== undefined) {
      let isMobile = currentScreenWidth <= mobileSize;
      dispatch(handleMobileOrDesktop({ isMobile, currentScreenWidth }));
    }
  }, [currentScreenWidth]);

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const basketState = useSelector(
    state => state.sessionReducer.basket,
    shallowEqual
  );

  const loginState = useSelector(state => state.loginReducer, shallowEqual);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setCurrentScreenWidth(window.innerWidth);
      };

      if (currentScreenWidth === undefined)
        setCurrentScreenWidth(window.innerWidth);

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  const loginNameState = useSelector(
    state => state.loginReducer.firstName,
    shallowEqual
  );

  const [wishlist, setWishlist] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const ShowSearch = () =>{
    setShowSearch(!showSearch);
  }

  return (
    <>
    <div className="topmainhead">
        <div className="topmainheadinner">
          <ul>
            <li>Register</li>
            <li onClick={() => dispatch(setAuthModal(!authModalState))}>{loginNameState === "" ? "Login" : loginNameState }</li>
          </ul>
        </div>
      </div>
      <header className="topbar-header">

    <Wrapper>
      
      <div className="topBar">
        <div className="topbar--desktop">
          <div className="topbar--desktop__left">
            <div className="logo">
              <Link href="/">SHOP LOGO</Link>
            </div>
            {showSearch ? <div className="search">
              <Search />
            </div> : null }
            
          </div>

          <div className="topbar--desktop__right">
            <Nav menu={menu} />
            <div className="flex icons">
              {loginState.firstName && (
                <a
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      e.target.click();
                    }
                  }}
                  className="cursor-pointer"
                  style={{ color: "#fff", margin: "auto 0" }}
                  onClick={() => dispatch(setAuthModal(!authModalState))}
                >
                  {loginState.firstName}
                </a>
              )}
              <a
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    e.target.click();
                  }
                }}
                tabIndex={"0"}
                className="cursor-pointer text-secondary mx-1"
                //onClick={() => dispatch(setAuthModal(!authModalState))}
                onClick={ShowSearch}
              >
                <img src="https://ik.imagekit.io/ofb/themes/Path_3_lOXgVmjzE.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1665052322256" />
              </a>

              <a
                tabIndex={"0"}
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    e.target.click();
                  }
                }}
                className="cursor-pointer text-secondary mx-1 relative"
                onClick={() => setShowWishList(!showWishList)}
              >
                {wishListState.length > 0 ? (
                  <>
                    <div className=" absolute w-5 h-5 text-xs flex justify-center items-center -top-1 -right-1 bg-red-600 text-white rounded-full">
                      {wishListState.length}
                    </div>
                    <img src="https://ik.imagekit.io/ofb/themes/Group_79_AxJIStywbY.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1665052318950" />
                  </>
                ) : (
                  <img src="https://ik.imagekit.io/ofb/themes/Group_79_AxJIStywbY.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1665052318950" />
                )}
              </a>
              <a
                tabIndex={"0"}
                id="basket-icon-btn"
                type="button"
                aria-label="basket"
                className="text-secondary mx-1 relative"
                onClick={() => dispatch(addToLocalMiniCart())}
              >
                <img src="https://ik.imagekit.io/ofb/themes/Union_1_ubHaLlJvF.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1665052322163" />
                <span className="basket-count-badge">
                  {basketState?.itemsCount}
                </span>
                {/* ) : null} */}
              </a>
            </div>
          </div>
        </div>

        <div className="topbar--mobile">
          <DynamicHamburgerMenu menu={menu} />
          <div className="logo">
            <Link href="/">
              <a style={{ marginLeft: "40px" }}>SHOP LOGO</a>
            </Link>
          </div>
          <div
            className="flex icons"
            style={{ display: "flex", flexDirection: "row-reverse" }}
          >
            {loginState.firstName && (
              <a
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    e.target.click();
                  }
                }}
                className="cursor-pointer"
                style={{ color: "#fff", margin: "auto 0" }}
                onClick={() => dispatch(setAuthModal(!authModalState))}
              >
                {loginState.firstName}
              </a>
            )}
            <a
              onKeyDown={e => {
                if (e.key === "Enter") {
                  e.target.click();
                }
              }}
              tabIndex={"0"}
              className="cursor-pointer text-secondary mx-1"
              onClick={() => dispatch(setAuthModal(!authModalState))}
            >
              <IoPersonOutline />
            </a>
            <a
              className="cursor-pointer text-secondary mx-1"
              onClick={() => dispatch(setAuthModal(!authModalState))}
            >
              <VscHeart />
            </a>
            <a
              id="basket-icon"
              aria-label="basket"
              type="button"
              className="text-secondary mx-1 relative"
              onClick={() => dispatch(addToLocalMiniCart())}
            >
              <IoBagOutline />
              {basketState.itemsCount > 0 ? (
                <span className="basket-count-badge">
                  {basketState?.itemsCount}
                </span>
              ) : null}
            </a>
          </div>
        </div>
      </div>
      

      <DynamicDrawer
        open={authModalState}
        onClose={() => dispatch(setAuthModal(false))}
      >
        <DynamicAuth
          authModalState={authModalState}
          setAuthModal={() => dispatch(setAuthModal(false))}
        />
      </DynamicDrawer>

      <DynamicDrawer open={showWishList} onClose={() => setShowWishList(false)}>
        <WishList
          show={showWishList}
          wishlist={wishListState}
          setWishlist={setWishlist}
          onClose={() => setShowWishList(false)}
        />
      </DynamicDrawer>
      <DynamicDrawer
        style={{ width: isMobileState ? "90%" : "340px" }}
        open={addToCartSuccess}
        onClose={() => dispatch(addToCartModalClose())}
      >
        <DynamicMiniCart close={() => dispatch(addToCartModalClose())} />
      </DynamicDrawer>
      {/* {menuRegular.menu === "nonregular" ? <FullNav menu={menu} /> : null } */}
    </Wrapper>
    </header>
    </>
  );
};

export default TopBar;
