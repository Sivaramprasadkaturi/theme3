import React from "react";
import Link from "next/link";
import { htmlDecode } from "../../utils/htmlDecoder";
import styled from "styled-components";
import ExternalContentFromCMS from "../AC-ExternalContentFromCMS/ExternalContentFromCMS";
import { LINK_DISTRIBUTION } from "../../project-config";
import Head from "next/head";
import { Fade } from "react-awesome-reveal";

const Wrapper = styled.div`
  .sub-nav-wrapper {
    background-image: url("https://ik.imagekit.io/ofb/themes/Group_267_Ts2Gdnuxu.png?ik-sdk-version=javascript-1.4.3&updatedAt=1670391491382") !important;
    /* background-size: cover !important; */
    background-position-x: center !important;
    background-position-y: center !important;
    background-repeat: no-repeat !important;
    background-size: cover;
  }

  @media screen and (max-width: 768px) {
    .sub-nav-title-desc-wrapper > div > div div {
      padding: 10px;
      background-color: rgba(255, 255, 255, 0.5);
    }
    .sub-nav-title-desc-wrapper p {
      width: 100% !important;
    }
  }

  .sub-nav-menu {
    height: 350px;
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
    width: 30%;
    text-align: left;
    letter-spacing: 0px;
    color: #212b36;
    opacity: 1;
    margin-top: 10px;
    font-size:14px;
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
  }
`;

const CategoryHeader = ({ data }) => {
  console.log("data34", data);
  return (
    <Wrapper>
      <Fade>
        <div
          className="sub-nav-wrapper"
          style={{
            width: "100%",
            marginBottom: "30px"
          }}
        >
          {/* <Fade direction="left" delay={1e3} cascade damping={0.1} triggerOnce>
        <div className="bred">
          <div><Link href={"/"}><a>Home</a></Link> / {data.description}</div>
        </div>
        </Fade> */}
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
                    <h2
                      style={{ backgroundColor: "transparent" }}
                      className="sub-nav-menu-title"
                      dangerouslySetInnerHTML={{
                        __html: htmlDecode(data.description)
                      }}
                    />
                    <p>
                    Nothing defines your living room more than your sofa. This central furniture shelters a convenient place where the family and friends spend hours of chatting and fun.{" "}
                    </p>
                  </Fade>
                </div>
              </div>
            </div>
          </div>
          {/* <CategoryBreadcrumb /> */}
        </div>
      </Fade>
    </Wrapper>
  );
};

export default CategoryHeader;
