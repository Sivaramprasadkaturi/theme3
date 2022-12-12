import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import classes from "./CategoriesListTheme1.module.css";
import {Fade} from "react-awesome-reveal";

const HomeBanner = (props) => {
  return (
    <>
      <Head>
        <title>B2BN Starter Home Page</title>
        <meta
          name="description"
          content="Placeholder description for the B2B Starter Marketplace Home Page"
        />
      </Head>
      {props.selectedTheme.card === "3 cards per Row" ? 

      <div className={classes.categoryList}>
        <div className={classes.categoryListInner}>
        <Fade direction="left" delay={1e3} cascade damping={0.1} triggerOnce >
          <div className={classes.fond}>
          
         
            <div className={classes.carreaux_presentation_light} style={{ backgroundImage: "url(https://ik.imagekit.io/ofb/themes/Group_51_OqAgPBm2x.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052316554)", marginRight: "20px" }}>
              <div className={classes.shadow_swhow_mini}>
                <div className={classes.deroul_titre}> 
                <Link
                      href={`/shop/browse-categories/shop-by-collection/new-arrivals`}
                    >
                      <a style={{color: "#fff"}}>New Arrivals</a></Link></div>
                
              </div>
            </div>
            
            <div className={classes.carreaux_presentation_light} style={{ backgroundImage: "url(https://ik.imagekit.io/ofb/themes/Group_51-1_75cXK3vV2.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052317747)", marginRight: "20px" }}>
              <div className={classes.shadow_swhow_mini}>
                <div className={classes.deroul_titre}><Link
                      href={`/shop/browse-categories/shop-by-collection/seasons`}
                    >
                      <a style={{color: "#fff"}}>Season Collection</a></Link></div>
                
              </div>
            </div>
            <div className={classes.carreaux_presentation_light} style={{ backgroundImage: "url(https://ik.imagekit.io/ofb/themes/Group_51-2_TOAVQ5S9G.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052318298)" }}>
              <div className={classes.shadow_swhow_mini}>
                <div className={classes.deroul_titre}><Link
                      href={`/shop/browse-categories/shop-by-collection/prints`}
                    >
                      <a style={{color: "#fff"}}>Shoes</a></Link></div>
                
              </div>
            </div>
          </div>
          </Fade>
        </div>
      </div> : <div className={classes.categoryList1}>
        <div className={classes.categoryListInner1}>
        <Fade direction="left" delay={1e3} cascade damping={0.1} triggerOnce >
          <div className={classes.fond1}>
          
          
            <div className={classes.carreaux_presentation_light1} style={{ backgroundImage: "url(https://ik.imagekit.io/ofb/themes/Group_51_OqAgPBm2x.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052316554)", marginRight: "20px" }}>
              <div className={classes.shadow_swhow_mini1}>
                <div className={classes.deroul_titre1}><Link
                      href={`/shop/browse-categories/shop-by-collection/new-arrivals`}
                    >
                      <a style={{color: "#fff"}}>New Arrivals</a></Link></div>
                
              </div>
            </div>
            
            <div className={classes.carreaux_presentation_light1} style={{ backgroundImage: "url(https://ik.imagekit.io/ofb/themes/Group_51-1_75cXK3vV2.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052317747)", marginRight: "20px" }}>
              <div className={classes.shadow_swhow_mini1}>
                <div className={classes.deroul_titre1}><Link
                      href={`/shop/browse-categories/shop-by-collection/seasons`}
                    >
                      <a style={{color: "#fff"}}>Season Collection</a></Link></div>
                
              </div>
            </div>
            <div className={classes.carreaux_presentation_light1} style={{ backgroundImage: "url(https://ik.imagekit.io/ofb/themes/Group_51-2_TOAVQ5S9G.png?ik-sdk-version=javascript-1.4.3&updatedAt=1665052318298)", marginRight: "20px" }}>
              <div className={classes.shadow_swhow_mini1}>
                <div className={classes.deroul_titre1}><Link
                      href={`/shop/browse-categories/shop-by-collection/prints`}
                    >
                      <a style={{color: "#fff"}}>Shoes</a></Link></div>
                
              </div>
            </div>

            <div className={classes.carreaux_presentation_light1} style={{ backgroundImage: "url(https://cdn.shopify.com/s/files/1/0062/5642/7093/files/demo04_02_1024x.jpg?v=1613771615)" }}>
              <div className={classes.shadow_swhow_mini1}>
                <div className={classes.deroul_titre1}><Link
                      href={`/shop/browse-categories/shop-by-collection/prints`}
                    >
                      <a style={{color: "#fff"}}>New In</a></Link></div>
              
              </div>
            </div>
          </div>
          </Fade>
        </div>
      </div> }


    </>
  );
};

export default HomeBanner;
