import { useEffect, useRef, useState, useMemo } from "react";
import { useSelector, shallowEqual } from "react-redux";
import Image from "next/image";

import styled from "styled-components";
import { ImageModal } from "./ImageModal";

const Carousel = ({ code, hiddenProps, className, video }) => {
  const itemDetailState = useSelector(
    state => state.productReducer.itemDetail,
    shallowEqual
  );

  const baseUrl = process.env.NEXT_PUBLIC_IMAGEKIT;
  const YOUTUBE_IMAGE_URL = videoId => {
    return `https://img.youtube.com/vi/${videoId}/default.jpg`;
  };
  console.log("code33", code);
  const numImgsObj = useMemo(() => {
    const foundProp = (itemDetailState?.hiddenProperties || hiddenProps).find(
      prop => {
        if (prop.propname == "Sys_Num_Images") return true;
      }
    );

    return foundProp;
  }, [itemDetailState, hiddenProps]);

  console.log("numImgsObj", numImgsObj, itemDetailState, hiddenProps);

  /*   const numImgsObj = (
    (itemDetailState && itemDetailState.hiddenProperties) ||
    hiddenProps
  ).find((prop, index) => {
    if (prop.propname == "Sys_Num_Images") return true;
  });
 */
  const numImgs = parseInt(numImgsObj?.propvalue);

  const [mainImage, setMainImage] = useState(
    `${baseUrl}/tr:w-500,q-80/store/20180522154/assets/items/largeimages/${code}.jpg`
  );

  const [mainVideo, setMainVideo] = useState(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const [showModal, setShowModal] = useState(false);

  const isMobileState = useSelector(state => state.mainReducer.isMobile);

  const openModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    setMainImage(
      `${baseUrl}/tr:w-500,q-80/store/20180522154/assets/items/largeimages/${code}.jpg`
    );
    setActiveIndex(0);
  }, [itemDetailState, baseUrl]);

  const handleImageChange = (code, i) => {
    setActiveIndex(i);
    setMainImage(
      `${baseUrl}/tr:w-500,q-80/store/20180522154/assets/items/largeimages/${code}${
        i > 0 ? `-${i + 1}.jpg` : `.jpg`
      }`
    );
    if (!isImage) setIsImage(true);
  };

  const handleVideoChange = v => {
    setMainVideo(v.code);
    if (isImage) setIsImage(false);
  };

  const targetRef = useRef();

  const [height, setHeight] = useState(null);
  useEffect(() => {
    setHeight(document.getElementById(`main-img-${code}`).offsetHeight);
  }, [code]);

  useEffect(() => {
    if (targetRef.current) {
      setHeight(targetRef.current.offsetWidth);
    }
  }, []);

  const renderThumbnails = () => {
    return (
      <ul>
        {numImgs > 0 &&
          [...Array(numImgs)].map((e, i) => {
            return (
              <li
                className={`smallimages small-${code}-${i + 1}`}
                key={i}
                onClick={() => handleImageChange(code, i)}
              >
                <img
                  src={`${baseUrl}/tr:w-300,q-80/store/20180522154/assets/items/largeimages/${
                    // itemDetailState && itemDetailState.code
                    code
                  }${i > 0 ? `-${i + 1}.jpg` : `.jpg`}`}
                  width="150"
                  height="150"
                  alt={"product " + code}
                  className={
                    activeIndex === i ? "active childImgs" : "childImgs"
                  }
                />
              </li>
            );
          })}
        {video.map((v, i) => {
          return (
            <li
              className="w-full "
              key={i}
              onClick={() => handleVideoChange(v)}
            >
              <img
                src={YOUTUBE_IMAGE_URL(v.code)}
                width="150"
                height="150"
                alt={"product " + code}
                // className={activeIndex === i ? "active" : ""}
              />
            </li>
          );
        })}
      </ul>
    );
  };

  const [isImage, setIsImage] = useState(true);

  const renderMainImage = () => {
    if (isImage) {
      return (
        <div className="imgmain">
          {/*<div className="absolute left-1 top-1/2 text-gray-900 bg-white shadow rounded-full text-xl p-4 cursor-pointer">*/}
          {/*  */}
          {/*</div>*/}
          <img
            ref={targetRef}
            onClick={() => openModal(!showModal)}
            id={`main-img-${code}`}
            src={mainImage}
            alt=""
            width="800"
            height="500"
            className="mainimgs"
          />
        </div>
      );
    } else {
      return (
        <div
          style={{
            display: "block",
            width: "100%"
          }}
        >
          <iframe
            id={`main-img-${code}`}
            width="100%"
            height="100%"
            src={`//www.youtube.com/embed/${
              mainVideo !== null ? mainVideo : video[0].code
            }?rel=0`}
            frameBorder={0}
            iv_load_policy="3"
            modestbranding="1"
            allowFullScreen={true}
          ></iframe>
        </div>
      );
    }
  };

  return (
    <div className={className}>
      <Wrapper>
        <div
          className="flex-col-reverse md:flex-row"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {" "}
          {renderMainImage()}
          {renderThumbnails()}
          
          {!isMobileState ? (
            <ImageModal
              showModal={showModal}
              setShowModal={setShowModal}
              image={mainImage}
              itemDetailState={itemDetailState}
              code={code}
            />
          ) : null}
        </div>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  ul {
    width: 100%;
    margin-right: 0px;

    li:not(:last-child) {
      margin-bottom: 15px;
    }
  }
  ul:hover {
    
  }
  .smallimages{
    width:220px;
    float: left;
  }
  .childImgs {
    height: 150px;
    object-fit: cover;
    object-position: top;
  }
  .mb-3 {
    margin-bottom: 10px !important;
  }
  .mb-t {
    margin-bottom: 0px !important;
  }
  @media (min-width: 768px) {
    .md\:w-8\/12 {
      width: 75.666667% !important;
    }
  }

  img {
    width: 100%;
  }

  .thumbnails {
    li {
      cursor: pointer;

      img {
        opacity: 0.5;
      }

      img:hover,
      img.active {
        opacity: 1;
        border: 1px solid #ccc;
      }
    }
  }
  .mainimgs {
    height: 550px;
    object-fit: contain;
    object-position: top;
  }

  @media screen and (max-width: 768px) {
    clear: both;
    margin-top: 30px;
    grid-template:
      "itemMain"
      "itemThumb";

    #itemMain {
      grid-area: itemMain;
    }
    .childImgs {
      margin-top: 10px;
    }
    .mainimgs {
      height: 420px !important;
      object-fit: cover;
      object-position: top;
    }

    #itemThumbs {
      grid-area: itemThumb;
    }

    #itemThumbs .thumbnails {
      margin-top: 15px;
      display: flex;
      gap: 5px;
    }
  }
`;

export default Carousel;
