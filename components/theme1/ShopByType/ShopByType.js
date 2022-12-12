import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import classes from "./ShopByType.module.css";
import {Fade} from "react-awesome-reveal";

const HomeBanner = () => {
  return (
    <>
      <Head>
        <title>B2BN Starter Home Page</title>
        <meta
          name="description"
          content="Placeholder description for the B2B Starter Marketplace Home Page"
        />
      </Head>

      <div className={classes.ShopByType}>
        <div className={classes.ShopByTypeInner}>
          <h1 className={classes.ShopByTypeHeading}>Shop by Type</h1>
          <Fade direction="left" delay={1e3} cascade damping={0.1} triggerOnce >
          <div className={classes.ShopByTypeUl}>
            <ul>
              <li><Link
                      href={`/shop/browse-categories/shop-by-type/pant-suits`}
                    >
                      <a style={{color: "#fff"}}>
                <div className={classes.ShopByTypeImg}><img src="https://ik.imagekit.io/ofb/themes/AdobeStock_198108361_cr-YtWxDZ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052299859" /></div>
                <div className={classes.ShopByTypeContent}>
                  <h1>Dresses</h1>
                  <h6>121 Items</h6>
                </div></a></Link>
              </li>
              <li>
                <div className={classes.ShopByTypeImg}><img src="https://ik.imagekit.io/ofb/themes/AdobeStock_199376342_5wPM8JOk9.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052299895" /></div>
                <div className={classes.ShopByTypeContent}>
                  <h1>Tops</h1>
                  <h6>158 Items</h6>
                </div>
              </li>
              <li>
                <div className={classes.ShopByTypeImg}><img src="https://ik.imagekit.io/ofb/themes/AdobeStock_284343355_OPkPH2p8P.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052305123" /></div>
                <div className={classes.ShopByTypeContent}>
                  <h1>Bottoms</h1>
                  <h6>450 Items</h6>
                </div>
              </li>
              <li>
                <div className={classes.ShopByTypeImg}><img src="https://ik.imagekit.io/ofb/themes/AdobeStock_259166468_hnUS1m8J4.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052299866" /></div>
                <div className={classes.ShopByTypeContent}>
                  <h1>Pantsuits and Jumpsuits</h1>
                  <h6>121 Items</h6>
                </div>
              </li>
            </ul>
          </div>
          </Fade>
        </div>
      </div>


    </>
  );
};

export default HomeBanner;
