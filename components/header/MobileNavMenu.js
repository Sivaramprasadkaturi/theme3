import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { shallowEqual, useSelector } from "react-redux";
import { VID, LINK_DISTRIBUTION, PREVIEW } from "../../project-config.js";
import { useRouter } from "next/router";
import Link from "next/link";
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from "react-icons/md";
import { IoChevronForwardOutline } from "react-icons/io5";
// import LoginBar from "../LoginBar";
import UnitSelector from "./UnitSelector";
import Search from "./Search";
import Modal from "../elements/Modal/Modal.jsx";
import AuthLogOut from "../elements/Auth/AuthLogOut";

const Wrapper = styled.div``;

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  margin-top: 0;
  z-index: 9999;

  li {
    padding: 18px 10px;
  }

  @media (max-width: 1023px) {
    flex-flow: column nowrap;
    background-color: #333;
    width: 100%;
    padding-top: 1.5rem;

    li {
      color: #fff;
      padding-left: 5%;
    }
  }
`;

const MobileNavMenu = ({ open, toggle, close, menu: { childs } }) => {
  const currentScreenWidthState = useSelector(
    state => state.mainReducer.currentScreenWidth,
    shallowEqual
  );

  const [authModal, setAuthModal] = useState(false);

  const loginNameState = useSelector(
    state => state.loginReducer.loginName,
    shallowEqual
  );

  const loggedInState = useSelector(
    state => state.loginReducer.firstName,
    shallowEqual
  );
  const langState = useSelector(state => state.mainReducer.lang, shallowEqual);

  const [isOpened, setIsOpened] = useState(false);

  const [isOpened1, setIsOpened1] = useState(false);

  function dropdownMobile() {
    setIsOpened(wasOpened => !wasOpened);
  }

  function dropdownMobile1() {
    setIsOpened1(wasOpened => !wasOpened);
  }

  useEffect(() => {
    if (open) document.body.classList.add("active-modal");
    else document.body.classList.remove("active-modal");

    return () => {
      document.body.classList.remove("active-modal");
    };
  }, [open]);

  return (
    <Wrapper className="mobile-nav-bar-container" open={open}>
      <div
        id="nav-menu-drawer"
        className="nav-wrapper actual-nav scroll-bar-thin-style"
      >
        <div className="nav-content-wrapper1">
          
          <ul>
          {childs.map(child => {
                let url = child.URL.replace('shop/thai-legal-protection', '/').replace('shop/discount-marketplace', '/').replace('shop/campaigns', '/');
                if (url.includes("stores")) {
                  url = "stores";
                }
                return (
                  <li
                    key={child.cid}
                  >
                    <div className="navmenumain">
                    <Link
                      href={`/${url}`}
                      onClick={() => handleCategoryChange()}
                      locale={langState}
                    >
                      <a onClick={toggle}>
                        {/* <img src={`https://ik.imagekit.io/ofb/TLP/${child.description.toLowerCase().replace(/\s+/g, '-')}.png`} /> */}
                        {child.description.replace('Shop By', 'Shop').replace(/&amp;/g,"&")} 
                      </a>
                    </Link>
                    {child.childs.length > 0 ? ( <div onClick={dropdownMobile}><IoChevronForwardOutline /></div> ) : null }
                    </div>
                    {isOpened ? (
                      
                      <div className="subcatdata">
                      <ul>
                        {child?.childs?.map(subcat => {
                          return (
                          <li className="hvr-col" key={subcat.cid} onClick={toggle}>
                            <Link
                              href={subcat.URL}
                              onClick={() => handleCategoryChange()}
                            >
                              <a>{subcat.description}</a>
                            </Link>
                            <ul className="megamenu-child">
                              {subcat.childs.map((subsubcat, index) => (
                                <li className="subchilds" key={index}>
                                  <Link
                                    href="/"
                                    onClick={() => handleCategoryChange()}
                                  >
                                    <a>{subsubcat.description}</a>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </li>);
                        })}
                      </ul>
                      </div>
                    ) : null}                    
                  </li>
                );
              })}
            
            <li onClick={toggle}><div className="navmenumain"><Link href={`/contact-us`}><a>Contact Us </a></Link></div></li>
            <li onClick={toggle}><div className="navmenumain"><Link href={`/contact-us`}><a>About Us </a></Link></div></li>
            <li onClick={toggle}><div className="navmenumain"><Link href={`/contact-us`}><a>Terms Of Use</a></Link></div></li>
            <li onClick={toggle}><div className="navmenumain"><Link href={`/contact-us`}><a>Shipping Information</a></Link></div></li>
            
            {/* {!loginNameState ? <li><div className="navmenumain"><a href={`${LINK_DISTRIBUTION}/signin.html?vid=20220426878&mt=1`}
                    target="_blank" rel="noreferrer">Login <MdKeyboardArrowRight /></a></div></li> : <><li><div className="navmenumain"><a onClick={dropdownMobile1}> {loggedInState} <MdKeyboardArrowRight /></a></div></li>
            {isOpened1 && (
              <div className="MobileDropdown">
              <ul onClick={toggle} className="mobileLogout">
               <AuthLogOut setIsOpened={setIsOpened}  />              
              </ul>
            </div>
            )}
            </>
            }  */}
          </ul>
        </div>
        
      </div>
    </Wrapper>
  );
};

export default MobileNavMenu;
