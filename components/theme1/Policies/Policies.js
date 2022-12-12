import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import classes from "./Policies.module.css";
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

      <div className={classes.Policies}>
        <div className={classes.PoliciesInner}>
        <Fade direction="left" delay={1e3} cascade damping={0.1} triggerOnce >
          <div className={classes.fond}>
            <div className={classes.ddf}>
              <div className={classes.shadow_swhow_mini}>
                <div className={classes.deroul_titre}>FREE SHIPPING</div>
                <div className={classes.deroul_soustitre}>Spend $100 and receive Free 2 day shipping</div>
              </div>
            </div>
            <div className={classes.ddf}>
              <div className={classes.shadow_swhow_mini}>
                <div className={classes.deroul_titre}>FLEXIBLE PAYMENTS</div>
                <div className={classes.deroul_soustitre}>Spread your purchase with 4 easy payments</div>
              </div>
            </div>
            <div className={classes.ddf}>
              <div className={classes.shadow_swhow_mini}>
                <div className={classes.deroul_titre}>FREE RETURNS</div>
                <div className={classes.deroul_soustitre}>Buy in confidence with no-hassle returns</div>
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
