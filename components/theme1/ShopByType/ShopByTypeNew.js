import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import classes from "./ShopByTypeNew.module.css";
import { Fade } from "react-awesome-reveal";

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

      <div className={classes.ListOfBest}>
        <div className={classes.categoryListInner}>
          <Fade direction="right" delay={1e3} cascade damping={0.1} triggerOnce>
            <div className={classes.fond}>
              <div
                className={classes.carreaux_presentation_light}
                style={{
                  backgroundImage:
                    "url(https://ik.imagekit.io/ofb/themes/AdobeStock_198108361_cr-YtWxDZ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052299859)"
                }}
              >
                <Link
                      href={`/shop/browse-categories/shop-by-collection/new-arrivals`}
                    >
                      <a style={{color: "#fff"}}>
                <div className={classes.shadow_swhow_mini}>
                  <div className={classes.deroul_titre}>
                    Dresses <br /> <span>121 Items</span>
                  </div>
                  <div className={classes.deroul_soustitre}>
                    <span>Shop Now</span>
                  </div>
                </div></a></Link>
              </div>
              <div
                className={classes.carreaux_presentation_light}
                style={{
                  backgroundImage:
                    "url(https://ik.imagekit.io/ofb/themes/AdobeStock_199376342_5wPM8JOk9.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052299895)"
                }}
              >
                <div className={classes.shadow_swhow_mini}>
                  <div className={classes.deroul_titre}>
                    Tops <br />
                    <span>158 Items</span>
                  </div>
                  <div className={classes.deroul_soustitre}>
                    <span>Shop Now</span>
                  </div>
                </div>
              </div>
              <div
                className={classes.carreaux_presentation_light}
                style={{
                  backgroundImage:
                    "url(https://ik.imagekit.io/ofb/themes/AdobeStock_284343355_OPkPH2p8P.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052305123)"
                }}
              >
                <div className={classes.shadow_swhow_mini}>
                  <div className={classes.deroul_titre}>
                    Bottoms <br />
                    <span>450 Items</span>
                  </div>
                  <div className={classes.deroul_soustitre}>
                    <span>Shop Now</span>
                  </div>
                </div>
              </div>
              <div
                className={classes.carreaux_presentation_light}
                style={{
                  backgroundImage:
                    "url(https://ik.imagekit.io/ofb/themes/AdobeStock_259166468_hnUS1m8J4.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052299866)"
                }}
              >
                <div className={classes.shadow_swhow_mini}>
                  <div className={classes.deroul_titre}>
                    Pantsuits and Jumpsuits <br />
                    <span>121 Items</span>
                  </div>
                  <div className={classes.deroul_soustitre}>
                    <span>Shop Now</span>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </div>
    </>
  );
};

export default HomeBanner;
