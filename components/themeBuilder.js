import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { LINK_DISTRIBUTION, PROJECT_LINK, VID } from "../project-config";
import HomeBanner from "../components/home/HomeBanner";
import Collections from "../components/Collections";
import FeaturedSellers from "../components/FeaturedSellers";
import CategoriesListTheme1 from "../components/theme1/category-list/CategoriesListTheme1";
import menuData from "../preBuildData/menu/menu.json";
import { categoryUrl } from "../preScripts/links";
import PopularOffersoftheDay from "../components/FeaturedProducts";
import Head from "next/head";
// import ExternalContentFromCMS from "../components/AC-ExternalContentFromCMS/ExternalContentFromCMS";
import dynamic from "next/dynamic";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18n } from "../next-i18next.config";
import Translate from "../utils/Translate";
import EndOfSeason from "../components/theme1/EndOfSeason/EndOfSeason";
import ShopByType from "../components/theme1/ShopByType/ShopByType";
import ShopByCollection from "../components/theme1/ShopByCollection/ShopByCollection";
import ListOfBest from "../components/theme1/ListOfBest/ListOfBest";
import Policies from "../components/theme1/Policies/Policies";

const DynamicExternalContentFromCMS = dynamic(() =>
  import("../components/AC-ExternalContentFromCMS/ExternalContentFromCMS")
);
const DynamicDrawer = dynamic(() =>
  import("../components/elements/Drawer/Drawer.jsx")
);
import App from "../themeSetUp/App";
import * as themes from "../themeSetUp/theme/schemas.json";
import { setToLS } from "../themeSetUp/utils/storage";
import { useTheme } from "../themeSetUp/theme/useTheme";

export default function Home({ allThemes }) {
  console.log("Sivaaaaaa", allThemes);
  setToLS("all-themes", themes.default);
  const [showThemes, setShowThemes] = useState(false);

  const { theme, themeLoaded, getFonts, getBanners, get } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState({
    id: "T_001",
    name: "Light",
    colors: {
      body: "#FFFFFF",
      text: "#000000",
      button: {
        text: "#FFFFFF",
        background: "#000000"
      },
      link: {
        text: "teal",
        opacity: 1
      }
    },
    font: "'Poor Story', cursive"
  });

  const [showDialog, setShowDialog] = useState(false);
  const [newTheme, setNewTheme] = useState();
  const createTheme = newTheme => {
    console.log("Homepagetheme", newTheme);
    setShowDialog(false);
    setNewTheme(newTheme);
  };

  let defaultThemes = window.localStorage.getItem("all-themes");
  // useEffect(() => {
  //   if (!defaultThemes) {
  //     setToLS("all-themes", themes.default);
  //   } else {
  //   }
  // }, [defaultThemes]);

  useEffect(() => {
    setSelectedTheme(theme);
  }, [themeLoaded]);

  const { t } = useTranslation("translation");
  const [catRegular, setCatRegular] = useState("regular");
  useEffect(() => {
    const currentRegularCat = JSON.parse(localStorage.getItem("Cat"));
    if (currentRegularCat) {
      setCatRegular(currentRegularCat);
    }
  }, [catRegular]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    async function fetchData() {
      let storeCid = menuData.childs.find(cat =>
        cat.URL.includes("stores")
      ).cid;

      let storesData = await fetch(categoryUrl({ id: storeCid }));
      let data = await storesData?.json();
      setStores(data[1]);
    }

    fetchData();
  }, []);

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const ThemeMenu = ({
    setTheme,
    //setThemeFont,
    //setColorTheme,
    close
  }) => {
    return (
      <MenuStyled>
        <div className="h-full bg-white">
          <div
            className="h-full flex flex-col w-full"
            style={{ overflow: "auto", paddingBottom: "80px" }}
          >
            <div className="Sivaaaa" style={{ width: isMobileState ? "90%" : "1000px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  justifyContent: "space-between",
                  backgroundColor: "white"
                }}
              >
                <div>
                  <div style={{ height: "700px", overFlow: "auto" }}>
                    <div className="palette-card p-5">
                      <App
                        allThemes={allThemes}
                        selectedTheme={selectedTheme}
                        setSelectedTheme={setSelectedTheme}
                        theme={theme}
                        themeLoaded={themeLoaded}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MenuStyled>
    );
  };

  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="placeholder" />{" "}
        <meta name="keywords" content="placeholder" />{" "}
        <meta name="metakeywords" content="placeholder" />
        <meta property="og:title" content="placeholder" />
        <meta property="og:image" content={`/images/sllogo.png`} />
        <meta property="og:image:secure_url" content={`/images/sllogo.png`} />
        <meta property="og:description" content="placeholder" />{" "}
        <meta property="twitter:title" content="placeholder" />
        <meta property="twitter:description" content="placeholder" />
        <meta property="og:url" content={LINK_DISTRIBUTION} />
        <meta property="og:type" content="website" />
        <meta property="twitter:creator" content={"@avetti"} />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <div className="themeSetting" onClick={() => setShowThemes(!showThemes)}>
        <svg
          class="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-11o4os1"
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="CogIcon"
        >
          <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"></path>
        </svg>
      </div>

      <DynamicDrawer open={showThemes} onClose={() => setShowThemes(false)}>
        <ThemeMenu
          close={() => setShowThemes(false)}
          //setTheme={setTheme}
          //SetMenuRegular={SetMenuRegular}
          //setColorTheme={setColorTheme}
          //setThemeFont={setThemeFont}
        />
      </DynamicDrawer>
    </>
  );
}

export async function getStaticProps({ locale }) {
  let allThemes;
  try {
    const url =
      "https://themes-c5a48-default-rtdb.firebaseio.com/schema/data.json";
    const res = await fetch(url);
    allThemes = await res.json();
  } catch (e) {
    console.log("THEMES CANNOT BE FETCHED ", e);
  }

  console.log("allThemessss", allThemes);

  return {
    props: {
      ...(await serverSideTranslations(
        locale,
        ["common", "translation", "currency-formatting"],
        { i18n }
      )),
      carousel,
      menu,
      storesData,
      featuredStoresData,
      shopbyData,
      collectionData,
      allThemes
    },
    revalidate: 3600 * 24
  };
}

const Wrapper = styled.main`
  margin-top: 30px;

  hr {
    border: none;
    border-bottom: 1px solid rgb(221, 221, 221);
    margin: 30px 0;
  }

  .one-column {
    /* width: 600px;
    position: relative; */

    img {
      width: 100%;
    }
  }

  .three-columns {
    width: 100%;
    display: inline-grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 10px;

    .article-img {
      grid-column: span 1;
    }
  }

  .image {
    object-fit: contain;
    width: 100% !important;
    position: relative !important;
    height: unset !important;
  }

  .unset {
    width: 100%;
  }

  .unset > div {
    position: unset !important;
  }

  @media only screen and (max-width: 768px) {
    .three-columns {
      grid-template-columns: 1fr;
    }
  }
`;
const MenuStyled = styled.div`
  .css-5cjz36 {
    margin: 0px 0px 0.625rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.15px;
    color: "rgba(76, 78, 100, 0.87);
  padding: 20px 20px 0px 20px;
}

.logo a{
 color: var(--text1);
 font-weight:bold;
}


.mainPart{
 display: flex;
 align-items: center;
}

  .buttons{
    
     ul{
      display: flex;
      justify-content: flex-start;
      padding: 10px 20px;
    }
    .button{
      cursor:pointer;
      margin-right:.2rem;
    }
    .fonts{
      color: #333;
      width: 100%;
      border: 1px solid #cdcdcd;
      margin-bottom: 12px;
      text-align: center;
    }
    .circle{
      width: 40px;
      height: 40px;
      display: flex;
      border-radius: 8px;
      cursor: pointer;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      margin: 0rem 0.375rem;
      color: " rgb(255, 255, 255);
    transition: box-shadow 0.25s ease 0s;
    background-color: var(--circle-colr);
    border: 2px solid var(--border);
  }
}

.align-items-center {
  -webkit-box-align: center !important;
  -ms-flex-align: center !important;
  align-items: center !important;
}

.justify-content-between {
  -webkit-box-pack: justify !important;
  -ms-flex-pack: justify !important;
  justify-content: space-between !important;
}

.p-5 {
  padding: 0.4rem;
}

.d-flex {
  display: -webkit-box !important;
  display: -ms-flexbox !important;
  display: flex !important;
}

.h4, h4 {
  font-size: 1.286rem;
}

.customizer-section {
  padding: 1.2rem 0px;
  border-bottom: 1px solid #ebe9f1;
}
`;
