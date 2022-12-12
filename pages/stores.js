import { useEffect, useState } from "react";
// import Mapbox from "../components/map/Mapbox";
import Link from "next/link";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import menuData from "../preBuildData/menu/menu.json";
import { categoryUrl } from "../preScripts/links";
import StoreItems from "../components/StoreItems";
import styled from "styled-components";
import Container from "../components/elements/Container";
// import Mapbox from "../components/map/Mapbox";
import ExternalContentFromCMS from "../components/AC-ExternalContentFromCMS/ExternalContentFromCMS";
import { LINK_DISTRIBUTION } from "../project-config";
import Head from "next/head";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { i18n } from "../next-i18next.config";
const DynamicMapbox = dynamic(() => import("../components/map/Mapbox"));
import { Fade } from "react-awesome-reveal";
const storeCid = menuData.childs.find(cat => cat.URL.includes("stores"))?.cid;

const Wrapper = styled.div`
  .sub-nav-wrapper {
    background-image: url("https://ik.imagekit.io/ofb/themes/Group_267_Ts2Gdnuxu.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670391491382") !important;
    background-position-x: center !important;
    background-position-y: center !important;
    background-repeat: no-repeat !important;
    background-size: cover;
  }

  .sub-nav-menu {
    height: 320px;
    justify-content: center;
    align-items: center;
    text-align: left;
    margin: 0 auto;
    color: #000;
    display: inline-flex;
    width: 100%;
    padding: 0px 0 0px 0;
    position: relative;
    flex-direction: row;
  }

  .sub-nav-title-desc-wrapper {
    display: flex;
    width: 90%;
    margin: 0 auto;
  }
  .sub-nav-title-desc-wrapper p {
    width: 50%;
    text-align: left;
    letter-spacing: 0px;
    color: #212b36;
    opacity: 1;
    margin-top: 10px;
  }

  .sub-nav-menu-title {
    margin: 0;
    line-height: initial;
    font-size: 40px;
    text-transform: capitalize;
    letter-spacing: normal;
    padding-left: 0px;
    letter-spacing: 0px;
    color: #212b36;
    opacity: 1;
    font-weight: 500;
  }

  @media only screen and (max-width: 768px) {
    background: url("https://ik.imagekit.io/ofb/themes/Group_267_Ts2Gdnuxu.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670391491382") !important;

    .sub-nav-title-desc-wrapper p {
      width: 100% !important;
    }
  }
`;

const setFacetsAPI = (setFacets, facets) => {
  if (facets) {
    console.log("facets", facets);
    const tempFacets = [];

    facets.forEach(facet => {
      if (facet?.Price || facet?.Reviews) {
        tempFacets.push({
          title: Object.keys(facet)[0],
          name: Object.keys(facet)[0].toLowerCase(),
          facetValues: Object.values(facet)
            .flat(1)
            .map(value => {
              return {
                ...value,
                name: Object.keys(facet)[0],
                text: value.removeText?.split(": ")[1]
              };
            }),
          positiveCount:
            Object.values(facet)
              .flat(1)
              .reduce(function (total, item) {
                total += item.count;
                return total;
              }, 0) > 0,
          show: false
        });
      } else if (facet?.Other) {
        tempFacets.push(
          ...Object.values(facet)
            .flat(1)
            .map(v => {
              return { ...v, show: false };
            })
        );
      }
    });
    console.log("tempFacets", tempFacets);
    setFacets(tempFacets);
  }
};

const Stores = ({ storesProps }) => {
  console.log("storesProps", storesProps);
  const [stores, setStores] = useState(storesProps);
  const [storeItems, setStoreItems] = useState(stores?.[1]?.items || []);

  const [facets, setFacets] = useState([]);
  const [numOfPages, setNumOfPages] = useState(0);
  const [query, setQuery] = useState([]);
  const [sortBy, setSortBy] = useState("");

  const [currentScrollPage, setCurrentScrollPage] = useState(1);

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  /*   useEffect(async () => {
    let storeCid = menuData.childs.find(cat => cat.URL.includes("stores")).cid;

    let storesData = await fetch(categoryUrl({ id: storeCid }));
    let data = await storesData?.json();
    setStores(data);
    console.log({ storeCid, data });
  }, []); */

  const fetchQueryData = async (query, sortBy) => {
    const storesData = await fetch(
      categoryUrl({
        id: storeCid,
        query:
          query.length > 0
            ? query
                .map(q => "&" + q.name.toLowerCase() + "=" + q.value)
                .join("")
            : "",
        sortBy
      })
    );
    let data = await storesData.json();

    setStores(data);
    setFacetsAPI(setFacets, data?.[2]?.facets);
  };

  useEffect(async () => {
    if (typeof stores !== "undefined" && stores.length > 0) {
      setFacetsAPI(setFacets, stores?.[2]?.facets);
      setNumOfPages(Number(stores[0].numOfPages));
      setStoreItems(stores?.[1]?.items);
    }

    return () => {
      setFacets([]);
      setNumOfPages(0);
      setCurrentScrollPage(1);
    };
  }, [stores]);

  useEffect(() => {
    if (query.length > 0 || sortBy !== "") {
      fetchQueryData(query, sortBy);
    }
  }, [query, sortBy]);

  return (
    <>
      <Head>
        <title>Stores</title>
        <meta name="description" content="placeholder" />{" "}
        <meta name="keywords" content="placeholder" />{" "}
        <meta name="metakeywords" content="placeholder" />
        <meta property="og:title" content="placeholder" />
        <meta property="og:image" content={`/images/Logonew_white.png`} />
        <meta
          property="og:image:secure_url"
          content={`/images/Logonew_white.png`}
        />
        <meta property="og:description" content="placeholder" />{" "}
        <meta property="twitter:title" content="placeholder" />
        <meta property="twitter:description" content="placeholder" />
        <meta property="og:url" content={LINK_DISTRIBUTION} />
        <meta property="og:type" content="website" />
        <meta property="twitter:creator" content={"@avetti"} />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <ExternalContentFromCMS
        place="home"
        position="Top"
        renderedBy="HomeBanner"
      />
      <Wrapper>
        <div
          className="sub-nav-wrapper"
          style={{
            width: "100%",
            marginBottom: "30px"
          }}
        >
          <Fade direction="left" delay={1e3} cascade damping={0.1} triggerOnce>
            <div className="bred">
              <div>
                <Link href={"/"}>
                  <a>Home</a>
                </Link>{" "}
                / Brands
              </div>
            </div>
          </Fade>
          <div className="sub-nav-menu">
            <div className="sub-nav-title-desc-wrapper">
              <div>
                <div>
                  <Fade
                    direction="left"
                    delay={1e3}
                    cascade
                    damping={0.2}
                    triggerOnce
                  >
                    <h2 className="sub-nav-menu-title">Brands</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                    </p>
                  </Fade>
                </div>
              </div>
            </div>
          </div>
          {/* <CategoryBreadcrumb /> */}
        </div>

        {/* <div>
            <div className="w-full mb-6 bg-gray-50" style={{ height: 400 }}>
              {stores?.[1]?.items.length > 0 && (
                <DynamicMapbox stores={stores?.[1]?.items} />
              )}
            </div>
          </div> */}
        <Container>
          <div className="flex">
            
            <div>
              {typeof window !== undefined &&
              typeof XMLHttpRequest !== undefined ? (
                <StoreItems
                  sortBy={sortBy}
                  query={query}
                  storeCid={storeCid}
                  numOfPages={numOfPages}
                  currentScrollPage={currentScrollPage}
                  setCurrentScrollPage={setCurrentScrollPage}
                  storeItems={storeItems}
                  setStoreItems={setStoreItems}
                />
              ) : null}
            </div>
          </div>
        </Container>
      </Wrapper>
    </>
  );
};

export const getStaticProps = async ({ locale }) => {
  if (storeCid) {
    const storesData = await fetch(
      categoryUrl({
        id: storeCid
      })
    );

    console.log("storesData", storesData, locale);
    const data = await storesData.json();
    return {
      props: {
        ...(await serverSideTranslations(
          locale,
          ["common", "translation", "currency-formatting"],
          { i18n }
        )),
        storesProps: data
      },
      revalidate: 3600 * 24
    };
  } else {
    return {
      props: {
        ...(await serverSideTranslations(
          locale,
          ["common", "translation", "currency-formatting"],
          { i18n }
        )),
        storesProps: []
      },
      revalidate: 3600 * 24
    };
  }
};

export default Stores;
