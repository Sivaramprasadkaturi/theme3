
import React, { useState, useEffect } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import Link from "next/link";
import ExternalContentFromCMS from "../AC-ExternalContentFromCMS/ExternalContentFromCMS";
import Image from "next/image";
import Head from "next/head";
import Translate from "../../utils/Translate";
import { Fade } from "react-awesome-reveal";
import { useTheme } from "../../themeSetUp/theme/useTheme";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const HomeBanner = (props, allThemes) => {

  const [data, setData] = useState(props.allThemes);

  const [themes, setThemes] = useState([]);
  useEffect(() => {
    setThemes(_.keys(data));
  }, [data]);
  console.log('12345', props.selectedTheme);

  useEffect(() => {
    props.newTheme &&
      updateThemeCard(props.newTheme);
  }, [props.newTheme]);

  const updateThemeCard = theme => {
    const key = _.keys(theme)[0];
    const updated = { ...data, [key]: theme[key] };
    setData(updated);
  };
  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );
  const responsive1 = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1600 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 1600, min: 1360 },
      items: 1
    },
    mdDesktop: {
      breakpoint: { max: 1360, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 768, min: 520 },
      items: 1
    },
    xsMobile: {
      breakpoint: { max: 520, min: 0 },
      items: 1
    }
  };

  console.log('Sivaprops', props);

  return (
    <>
      <Head>
        <title>B2BN Starter Home Page</title>
        <meta
          name="description"
          content="Placeholder description for the B2B Starter Marketplace Home Page"
        />
      </Head>
      {/* {props.selectedTheme.banner} */}
      {props.selectedTheme.banner === "single" ?
      <div id="homeBanner">
        <div className="homebanner-image-wrapper">
          <Fade direction="right" delay={1e3} cascade damping={0.1} triggerOnce >
            <h1>Summer Collection </h1>
            <h6>Discover our summer collection and much more</h6>
            <Link
                      href={`/shop/browse-categories`}
                    >
                      <a> <button>Explore Collection</button></a></Link>
          </Fade>
        </div>

      </div> :

      <Carousel
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive1}
          ssr={false}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          transitionDuration={500}
          containerClass="carousel-container"

          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        >
          <div>
            <li>
              <div>
                <img style={{
                  width: "100%",
                  // height: isMobileState ? "240px" : "400px",
                  objectFit: "cover",
                  objectPosition: "center",
                  height: isMobileState ? "200px" : "500px"
                }} src="https://cdn.shopify.com/s/files/1/0062/5642/7093/files/demo_01_02_x1024.jpg?v=1613758586" />
              </div>
            </li>
          </div>
          <div>
            <li>
              <div>
                <img style={{
                  width: "100%",
                  // height: isMobileState ? "240px" : "400px",
                  objectFit: "cover",
                  objectPosition: "top",
                  height: isMobileState ? "200px" : "500px"
                }} src="https://cdn.shopify.com/s/files/1/0062/5642/7093/files/demo_01_01_x1024.jpg?v=1613758586" />
              </div>
            </li>
          </div>

          <div >
            <li>
              <div>
                <img style={{
                  width: "100%",
                  // height: isMobileState ? "240px" : "400px",
                  objectFit: "cover",
                  objectPosition: "center",
                  height: isMobileState ? "200px" : "500px"
                }} src="https://cdn.shopify.com/s/files/1/0062/5642/7093/files/demo04_01_x1024.jpg?v=1613771614" />
              </div>
            </li>
          </div>







        </Carousel>}


    </>
  );
};

export default HomeBanner;
