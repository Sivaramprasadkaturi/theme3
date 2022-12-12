import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import classes from "./EndOfSeason.module.css";
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

      <div className={classes.EndOfSeason}>
        <div className={classes.EndOfSeasonInner}>
          <div className={classes.EndOfSeasonBanner}>
          <Fade direction="right" delay={1e3} cascade damping={0.1} triggerOnce >
            <h1>End of Season upto to 70% off</h1>
            <h6>Be the first to shop the drop</h6>
            <Link
                      href={`/shop/browse-categories/shop-by-collection/new-arrivals`}
                    >
                      <a ><button>Shop Now</button></a></Link>
            </Fade>
          </div>
        </div>
      </div>


    </>
  );
};

export default HomeBanner;
