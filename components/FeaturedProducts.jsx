import { useSelector, shallowEqual, useDispatch } from "react-redux";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Fade} from "react-awesome-reveal";
import PopularOffersoftheDayCard from "../components/PopularOffersoftheDayCard";
import Grid from "./AC-UI-Elements/Grid/Grid";

import { toggleWishListAction } from "../redux/actions/wishlistActions";

function PopularOffersoftheDay({ shopby }) {
  console.log("shopbyshopby", shopby);
  const dispatch = useDispatch();

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const userLocationState = useSelector(
    state => state.userLocationReducer,
    shallowEqual
  );

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1600 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 1600, min: 1360 },
      items: 4
    },
    mdDesktop: {
      breakpoint: { max: 1360, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 768, min: 520 },
      items: 2
    },
    xsMobile: {
      breakpoint: { max: 520, min: 0 },
      items: 2
    }
  };

  const wishListState = useSelector(
    state => state.wishListReducer.wishlist,
    shallowEqual
  );

  const toggleWish = (e, id, title, desc, currency_sign, image, price, url) => {
    e.preventDefault();
    dispatch(
      toggleWishListAction(
        id,
        title,
        desc,
        currency_sign,
        image,
        price,
        url,
        wishListState
      )
    );
  };

  const renderPlaceholderCards = () => {
    return (
      <Carousel
        swipeable={false}
        draggable={true}
        showDots={false}
        responsive={responsive}
        ssr={false} // means to render carousel on server-side.
        infinite={true}
        autoPlay={isMobileState ? false : false}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        transitionDuration={500}
        containerClass="carousel-container"
        // removeArrowOnDeviceType={["mobile", "xsMobile"]}
        // deviceType={this.props.deviceType}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {Array(4)
          .fill(0, 0, 4)
          .map((v, i) => (
            <Grid key={i} item className="item-card-item" xs={12}>
              <div
                className="placeholder-item-card-wrapper"
                style={{ boxShadow: "0px 0px 1px 0px #c8c8c8" }}
              >
                <div
                  style={{
                    backgroundColor: "#fff",
                    height: "400px"
                  }}
                ></div>
                <div>
                  <div
                    style={{
                      backgroundColor: "#f5f5f5",
                      height: "40px"
                    }}
                  ></div>
                </div>
              </div>
            </Grid>
          ))}
      </Carousel>
    );
  };
  console.info('wwww', shopby?.[1]?.items);
  return (
    <div className="popularowl">
      <div className="browseCat-container">
        <br />
        <Fade direction="left" delay={1e3} cascade damping={0.1} triggerOnce >
        <div className="mainpopular">
        <h3 className="browseCat">Popular Products</h3>
        {/* <button><Link href={`/shop/shop-by/`}><a>View More <MdKeyboardArrowRight /></a></Link></button> */}
        </div>
        {shopby && shopby?.[1]?.items?.length > 0 ? (
          <Carousel
            swipeable={true}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={false} // means to render carousel on server-side.
            infinite={true}
            autoPlay={false}
            autoPlaySpeed={20000}
            keyBoardControl={true}
            transitionDuration={500}
            containerClass="carousel-container"
            // removeArrowOnDeviceType={["mobile", "xsMobile"]}
            // deviceType={this.props.deviceType}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            {shopby &&
              shopby?.[1]?.items?.map(item => (
                <div key={item.id} className="owl-item popularProducts">
                  <PopularOffersoftheDayCard key={item.id} itemCard={item} />
                </div>
              ))}
          </Carousel>
        ) : (
          renderPlaceholderCards()
        )}
        </Fade>
      </div>
    </div>
  );
}

export default PopularOffersoftheDay;
