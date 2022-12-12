import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { setHTMLElementFixedPosition } from "../utils/functions";


const Wrapper = styled.div`
  background-color: #212B36;
  color: #fff;
  display: flex;
    justify-content: center;

  //nav,
  //.navContainLeft {
  //  display: flex;
  //}

  .navLink {
    flex-grow: 1;
    color: var(--white);
  }
  
  

  .menu-list li.megamenu {
    position: static;
    padding: 0 0px;
  }
  
  /*----------------- DropDown ---------------*/
  
  .menu-list .sub-menu {
    left: 0px;
    top: 134px;
    min-width: 100%;
    opacity: 0;
    position: absolute;
    text-align: left;
    visibility: hidden;
    white-space: nowrap;
    width: 0px;
    z-index: 12;
    transition: all 0.2s ease 0s;
    overflow: hidden;
    box-shadow: 0 4px 6px 0 rgb(0 0 0 / 15%);
    box-sizing: border-box;
    height: auto;
  }
  
  .menu-list .sub-menu>li {
    float: none;
    padding-left: 5%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .menu-list .sub-menu>li img{
    height: 140px;
    width: 208px;
    object-fit: cover;
  }
  .menu-list .sub-menu>li>a {
    line-height: inherit;
    padding: 2px 0px 5px 0px;
    text-transform: capitalize;
    font-weight: 500;
    font-size: 15px !important;
    color: #4b4b4b;
  }
  
  .menu-list .sub-menu>li>a:hover {
    text-decoration: underline;
  }
  
  .menu-list .sub-menu .sub-menu {
    top: 0;
    left: 100%;
  }
  
  .has-dropdown>.sub-menu {
    z-index: 10000;
    display: flex;
    flex-direction: column;
  }
  .megamenu-child{
    line-height: initial;
    margin-left: 8%;
  }
  
  .has-dropdown:hover>.sub-menu {
    opacity: 1;
    visibility: visible;
    z-index: 10000;
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  
  .has-dropdown .dropdown-holder {
    display: none;
  }
  
  .sub-menu>li .arrow {
    font-size: 16px;
    position: absolute;
    right: 24px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
  }
  
  .HomeCateg {
    width: 100%;
    /* box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1); */
    background: #fff;
    margin: 10px;
    text-align: left;
    /* padding-bottom: 20px; */
    /* width: calc(50% - 20px); */
    display: flex;
  }
  
  .HomeSubChilds p {
    color: #242424;
    list-style: circle;
    border-bottom: 0px !important;
    text-transform: capitalize !important;
    padding-top: 2px !important;
    padding-left: 10px !important;
    padding-bottom: 2px !important;
    margin-bottom: 0px !important;
    font-size: 15px !important;
  }
  .menuMainChild a{
    display:block;
    margin-bottom:15px;
    font-size:21px;
    color: var(--primary-color) !important;
  }
  
  .HomeSubChilds a {
    display: flex;
  }
  .nav-hover-1 {
    display: flex;
}
.subchilds a{
  margin-bottom: 10px;
  display: block;
  font-weight: 500 !important;
  color: var(--primary-color) !important;
}
.sub-menu.megamenu-wrapper {
  height: auto;
  min-width: auto;
  padding: 30px 0px;
}
.has-dropdown>.sub-menu {
  display: flex;
  z-index: 10000;
}
  .navContainLeft {
    background: none;
    display: flex;
    //justify-content: center;
    height: 63px;
    //display: flex;
    width: 100%;
    //margin-left: 0%;
    justify-content: space-between;
  }

  .navContainRight {
    width: 40%;
  }

  .navAddStore {
    float: right;
    background-color: var(--primary-minus-1);
    padding: 15px 60px;
  }

  .navLink a,
  .navAddStore a {
    color: #fff;
    text-decoration: none;
    font-size: 15px;
  }
  
`;

const Navlink = styled.a`
  .navlink-sublinks-container a {
    padding: 5px;
    width: 100%;
  }

  .navlink-sublinks-container {
    display: none;
  }
`;

const Nav = ({ menu: { childs } }) => {
  const [navMenuOpen, setNavMenuOpen] = useState(false);

  useEffect(() => {
    setHTMLElementFixedPosition(navMenuOpen);
    return () => {
      setHTMLElementFixedPosition(false);
    };
  }, [navMenuOpen]);

  const handleCategoryChange = (cid, cat, parents, longdesc) => {
    // let catName = cat;
    setNavMenuOpen(!navMenuOpen);
  };

  return (
    <Wrapper>
      <nav>
        <div>
          <div className="navLink">
            <ul className="menu-list nav-hover-1 sf-menu clear list-none">
              {childs.map(child => {
                let url = child.URL;
                if (url.includes("stores")) {
                  url = "stores";
                }
                return (
                  <li
                    key={child.cid}
                    className="has-dropdown megamenu"
                    style={{ listStyleType: "none", marginRight: "50px" }}
                  >
                    <Link
                      className={`menuCat category-menu `}
                      style={{ color: "#fff" }}
                      href={`/${url}`}
                      onClick={() => handleCategoryChange()}
                    >
                      <a>{child.description}</a>
                    </Link>
                    
                    {child.childs.length > 0 ? (
                      <ul className="sub-menu megamenu-wrapper flex">
                        {child.childs.map(subcat => {
                          let suburl = subcat.URL;
                          
                          
                          return(
                            <li 
                            className={`hvr-col desktopmenu-${subcat.description}`}>
                            <Link
                              href={`/${suburl}`}
                              onClick={() => handleCategoryChange()}
                            >
                              <a><img src={`https://ik.imagekit.io/ofb/themes/${subcat.description.toLowerCase().replace(/ /g, "-")}.png `} /></a>
                            </Link>
                            <ul className="megamenu-child">
                              <li className="menuMainChild"><Link
                              href={`/${suburl}`}
                              onClick={() => handleCategoryChange()}
                            >
                              <a>{subcat.description}</a></Link></li>
                              {subcat.childs.map((subsubcat, index) => (
                                <li className="subchilds" key={index}>
                                  <Link
                                    href={`/${subsubcat.URL.replace("shop", "")}`}
                                    onClick={() => handleCategoryChange()}
                                  >
                                    <a>{subsubcat.description}</a>
                                  </Link>
                                </li>
                              ))}
                            </ul> 
                          </li>
                          )
                          
                        })}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        {/* <ul className="megamenu-child">
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
                            </ul> */}
        {/*<div className="navContainRight">*/}
        {/*    <div className="navAddStore">*/}
        {/*        <a href="">Add your Store</a>*/}
        {/*    </div>*/}
        {/*    <div className="clearfix"></div>*/}
        {/*</div>*/}
      </nav>
    </Wrapper>
  );
};

export default Nav;
