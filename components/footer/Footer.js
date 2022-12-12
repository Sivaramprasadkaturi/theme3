import React, { useState } from "react";
import { useSelector, shallowEqual } from "react-redux";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import Container from "../shared-components/Container";
import FinePrint from "./FinePrint";
import Translate from "../../utils/Translate";
import ExternalContentFromCMS from "../AC-ExternalContentFromCMS/ExternalContentFromCMS";
// import { maxWidth } from "tailwindcss/lib/plugins";

const Footer = () => {
  const [activeFooterSection, setActiveFooterSection] = useState("");

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  const handleOnClickFooterSection = e => {
    const { target: clickedFooterSectionTarget } = e.target.dataset;
    setActiveFooterSection(
      activeFooterSection !== clickedFooterSectionTarget &&
        clickedFooterSectionTarget
    );
  };

  const handleWhatIconToDisplay = footerSectionName => {
    return activeFooterSection === footerSectionName ? (
      <MdKeyboardArrowUp />
    ) : (
      <MdKeyboardArrowDown />
    );
  };

  return (
    <div>
      <ExternalContentFromCMS
        place="banners"
        position="Bottom"
        renderedBy="Header"
      />
      <Wrapper>
        <div className="footer--mobile">
          <Container style={{ marginBottom: "20px" }}>
            <div className="new-footer" style={{ maxWidth: "100%" }}>
              <div className="columns" style={{ maxWidth: "100%" }}>
                <div className="footer_line">
                  <div>
                    <div className="footerLogo pull-left">
                      <div style={{ width: "220px" }}>
                        <Link href="/" passHref>
                          <a>SHOP LOGO</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footer-container">
                <div
                  className="liHead"
                  id="policy-menu"
                  onClick={e => handleOnClickFooterSection(e)}
                  data-target="terms"
                  aria-controls="terms"
                  aria-expanded={activeFooterSection === "terms"}
                  style={
                    activeFooterSection && activeFooterSection === "terms"
                      ? {
                          height: "35px",
                          transition: "all 0.6s linear"
                        }
                      : {
                          height: "25px",
                          transition: "all 0.6s linear"
                        }
                  }
                >
                  Terms Of Use{" "}
                  <span
                    className="material-icons footer-icon"
                    style={{ float: "right" }}
                    data-target="about"
                  >
                    {handleWhatIconToDisplay("terms")}
                  </span>
                </div>
                <div
                  className="menu-footer"
                  id="terms"
                  aria-labelledby="terms-menu"
                  role="region"
                  style={{
                    display: activeFooterSection === "terms" ? "block" : "none"
                  }}
                >
                  <ul className="footer-list">
                    <li>
                      <Link href="/terms-of-use">
                        <a>Terms Of Use</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/shipping-information">
                        <a>Shipping Information</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/return-policy">
                        <a>Return Policy</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy-policy">
                        <a>Privacy Policy</a>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div
                  className="liHead"
                  id="info"
                  onClick={e => handleOnClickFooterSection(e)}
                  data-target="info"
                  aria-controls="info"
                  aria-expanded={activeFooterSection === "info"}
                  style={
                    activeFooterSection && activeFooterSection === "info"
                      ? {
                          height: "35px",
                          transition: "all 0.6s linear"
                        }
                      : {
                          height: "25px",
                          transition: "all 0.6s linear"
                        }
                  }
                >
                  Info{" "}
                  <span
                    style={{ float: "right" }}
                    className="material-icons footer-icon"
                    data-target="info"
                  >
                    {handleWhatIconToDisplay("info")}
                  </span>
                </div>
                <div
                  className="menu-footer"
                  aria-labelledby="info-menu"
                  role="region"
                  style={{
                    display: activeFooterSection === "info" ? "block" : "none"
                  }}
                >
                  <ul className="footer-list">
                    <li>
                      <Link href="mailto:bilgi@starter.com">
                        <a>E-mail : ecommerce@avetti.com</a>
                      </Link>
                    </li>
                    <li>
                      <a
                        href="https://www.avetticommerce.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Container>

          <FinePrint />
        </div>

        <div className="footer--desktop">
          <Container style={{ marginBottom: "20px" }}>
            <div className="header"></div>
            <div className="links-container">
              <div className="menu-footer" id="about">
                <ul className="footer-list">
                  <li>
                    <Link href="/terms-of-use">
                      <a>Terms Of Use</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/shipping-information">
                      <a>Shipping Information</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/return-policy">
                      <a>Return Policy</a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/privacy-policy">
                      <a>Privacy Policy</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="menu-footer" id="shop">
                <ul>
                  <li>
                    <Link href="mailto:bilgi@starter.com">
                      <a>E-mail : ecommerce@avetti.com</a>
                    </Link>
                  </li>
                  <li>
                    <a
                      href="https://www.avetticommerce.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </div>
              <div className="menu-footer" id="network">
                <div style={{ width: "220px" }}>
                  <Link href="/" passHref>
                    <a>SHOP LOGO</a>
                  </Link>
                </div>
              </div>
            </div>
          </Container>
          <FinePrint />
        </div>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.footer`
  padding: 2% 0 0% 0;
  background: var(--content-bg);
  margin-top: 30px;
  /* border-top: 1px solid #c8c8c8; */

  .header {
    display: flex;

    img {
      margin-top: 10px;
    }
  }

  .links-container {
    margin-top: 1%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }

  li {
    margin-bottom: 5px;
    line-height: 24px;
  }

  a {
    font-size: 14px;
    color: var(--text-color);
    text-decoration: none;
  }

  @media only screen and (max-width: 1023px) {
    .footer--desktop {
      display: none;
    }
  }

  @media only screen and (min-width: 1024px) {
    .footer--mobile {
      display: none;
    }
  }
`;

export default Footer;
