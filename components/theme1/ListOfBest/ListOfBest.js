import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import classes from "./ListOfBest.module.css";
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
        <div className={classes.ListOfBestInner}>
          <Fade direction="right" delay={1e3} cascade damping={0.1} triggerOnce>
            <div className={classes.fond}>
              <div
                className={classes.carreaux_presentation_light}
                style={{
                  backgroundImage:
                    "url(https://ik.imagekit.io/ofb/tr:h-350,q-80/themes/AdobeStock_336181022_KVrfXBULO.png)"
                }}
              >
                <div className={classes.shadow_swhow_mini}>
                  <div className={classes.deroul_titre}>
                    What's New <br />{" "}
                    <span>A collection of our latest arrivals</span>
                  </div>
                  <div className={classes.deroul_soustitre}>
                    <span>
                      <Link
                        href={`/shop/browse-categories/shop-by-collection/new-arrivals`}
                      >
                        <a style={{ color: "#fff" }}>Shop Now</a>
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={classes.carreaux_presentation_light}
                style={{
                  backgroundImage:
                    "url(https://ik.imagekit.io/ofb/tr:h-350,q-80/themes/AdobeStock_336183104_tqO9zSPQuN.png)"
                }}
              >
                <div className={classes.shadow_swhow_mini}>
                  <div className={classes.deroul_titre}>
                    Best Selling <br />
                    <span>Explore our best sellers</span>
                  </div>
                  <div className={classes.deroul_soustitre}>
                    <span>
                      <Link
                        href={`/shop/browse-categories/shop-by-collection/new-arrivals`}
                      >
                        <a style={{ color: "#fff" }}>Shop Now</a>
                      </Link>
                    </span>
                  </div>
                </div>
              </div>
              <div
                className={classes.carreaux_presentation_light}
                style={{
                  backgroundImage:
                    "url(https://ik.imagekit.io/ofb/tr:h-350,q-80/themes/AdobeStock_265897134_e0OGAMMPJ.png)"
                }}
              >
                <div className={classes.shadow_swhow_mini}>
                  <div className={classes.deroul_titre}>
                    Accessories in Style <br />
                    <span>
                      Find your look in our carefully curated collection
                    </span>
                  </div>
                  <div className={classes.deroul_soustitre}>
                    <span>
                      <Link
                        href={`/shop/browse-categories/shop-by-collection/new-arrivals`}
                      >
                        <a style={{ color: "#fff" }}>Shop Now</a>
                      </Link>
                    </span>
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
