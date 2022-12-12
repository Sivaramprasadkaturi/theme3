import React, { useLayoutEffect, useState, useRef } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useFocusWithin } from "react-aria";

const NavWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  nav {
    height: 100%;
  }
  .menu {
    display: flex;
    height: 100%;
    gap: 25px;

    .menu-item:hover > a {
      color: #d6a09b;
    }
    .menu-item:hover svg {
      fill: #d6a09b;
    }

    .menu-item {
      cursor: pointer;
      display: flex;
      align-items: center;
      /* gap: 8px; */
      position: relative;

      button {
        padding: 8px;
      }

      a {
        font-weight: 700;
        text-transform: uppercase;
        font-size: 12px;
        line-height: 1.3;
        color: #3a4f66;
      }
    }
  }

  .menu > .open .sub-menu {
    opacity: 1;
    visibility: visible;
    transform: translate3d(0, 0, 0);
  }

  .sub-menu {
    opacity: 0;
    visibility: hidden;

    left: -12.5px;
    z-index: 10;
    transform: translate3d(0, 10px, 0);
    position: absolute;
    top: 100%;
    min-width: 100px;
    border-radius: 0 0 2px 2px;
    width: 200px;
    background-color: #192a3d;
    box-shadow: 0px 10px 20px rgba(41, 51, 61, 0.1);
    transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease,
      margin 0.2s ease, height 0.2s ease;

    .menu-item {
      display: flex;
      flex-direction: column;
      border-top: 1px dashed rgba(255, 255, 255, 0.1);
      box-shadow: 0px 10px 20px rgba(41, 51, 61, 0.1);
      border-radius: 0px 0px 2px 2px;

      :first-child {
        border-top: none;
      }

      a {
        width: 100%;
        font-family: 'Poppins', sans-serif;
        padding: 13px calc(13px * 1.5);
        color: #fff;
        text-transform: none;
        font-weight: 300;
        font-size: 12px;
        line-height: 1.65;
      }
    }
  }
`;

const NavItem = ({ item, subcats }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isKey, setIsKey] = useState(false);
  const navRef = useRef(null);
  const menuRef = useRef(null);

  let [events, setEvents] = useState([]);
  let [isFocusWithin, setFocusWithin] = useState(false);
  let { focusWithinProps } = useFocusWithin({
    onFocusWithin: e => setEvents(events => [...events, "focus within"]),
    onBlurWithin: e =>
      setEvents(events => [...events, setIsOpen(false), setIsKey(false)]),
    onFocusWithinChange: isFocusWithin => setFocusWithin(isFocusWithin)
  });

  // https://github.com/microsoft/react-native-windows/issues/9292
  function onRender(callback) {
    // We need to wait until native has rendered a frame before measuring will
    // return non-zero results. Use RAF to schedule work on the next render, to
    // then shceduled work on the render after (at which point we should be all
    // good).
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        callback();
      });
    });
  }

  useLayoutEffect(() => {
    if (isOpen) {
      navRef.current.classList.add("open");

      if (isKey) {
        const focusableMenuElements = menuRef.current.querySelectorAll("a");
        const firstElement = focusableMenuElements[0];

        console.info("menu ref styles", menuRef.current);

        onRender(() => {
          firstElement.focus();
        });
      }
    } else {
      navRef.current.classList.remove("open");
    }
  }, [isOpen, isKey]);

  const handleMouseOver = () => {
    setIsOpen(true);
  };

  const handleMouseOut = () => {
    setIsOpen(false);
  };

  const handleKeypress = e => {
    if (e.keyCode === 13) {
      setIsOpen(!isOpen);
      setIsKey(true);
    }
  };

  return (
    <li
      ref={navRef}
      className="menu-item"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <Link href={item.url} passHref>
        {item.label}
      </Link>
      <button
        aria-expanded={isOpen}
        onKeyDown={handleKeypress}
        // onClick={handleOnClick}
        className="ct-toggle-dropdown-desktop"
      >
        <svg className="ct-icon" width="8" height="8" viewBox="0 0 15 15">
          <path d="M2.1,3.2l5.4,5.4l5.4-5.4L15,4.3l-7.5,7.5L0,4.3L2.1,3.2z"></path>
        </svg>
        {/* visually hidden span */}
        <span className="screen-reader-text">
          show submenu for {item.label}
        </span>
      </button>
      <ul
        {...focusWithinProps}
        ref={menuRef}
        className="sub-menu"
        onKeyPress={e => keyDownHandler(e)}
      >
        {subcats.map((child, index) => (
          <li key={child.label} className="menu-item">
            <Link href={child.url} passHref>
              {index === 0 ? <a>{child.label}</a> : <a>{child.label}</a>}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
};

const Nav = ({ menu: { childs } }) => {
  return (
    <NavWrapper>
      {/* <nav
        className="header-menu-1"
        data-id="menu"
        data-interaction="hover"
        data-menu="type-1"
        data-dropdown="type-1:simple"
        data-responsive="yes"
        itemScope
        itemType="https://schema.org/SiteNavigationElement"
        aria-label="Header Menu"
      >
        <ul className="menu">
          <NavItem
            item={{
              label: "Shop By Type",
              url: "/shop/browse-categories/shop-by-type"
            }}
            subcats={[
              {
                label: "Dresses",
                url: "/shop/browse-categories/shop-by-type/dresses"
              },
              {
                label: "Tops",
                url: "/shop/browse-categories/shop-by-type/tops"
              },
              {
                label: "Bottoms",
                url: "/shop/browse-categories/shop-by-type/bottoms"
              },
              {
                label: "Pant Suits",
                url: "/shop/browse-categories/shop-by-type/pant-suits"
              }
            ]}
          />
          <NavItem
            item={{
              label: "Shop By Collection",
              url: "/shop/browse-categories/shop-by-collection"
            }}
            subcats={[
              {
                label: "New Arrivals",
                url: "/shop/browse-categories/shop-by-collection/new-arrivals"
              },
              {
                label: "Seasons",
                url: "/shop/browse-categories/shop-by-collection/seasons"
              },
              {
                label: "Prints",
                url: "/shop/browse-categories/shop-by-collection/prints"
              },
              {
                label: "Formal Wear",
                url: "/shop/browse-categories/shop-by-collection/formal-wear"
              }
            ]}
          />
        </ul>
      </nav> */}

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

                          return (
                            <li
                              className={`hvr-col desktopmenu-${subcat.description}`}
                            >
                              <Link
                                href={`/${suburl}`}
                                onClick={() => handleCategoryChange()}
                              >
                                <a>
                                  <img
                                    src={`https://ik.imagekit.io/ofb/themes/${subcat.description
                                      .toLowerCase()
                                      .replace(/ /g, "-")}.png `}
                                  />
                                </a>
                              </Link>
                              <ul className="megamenu-child">
                                <li className="menuMainChild">
                                  <Link
                                    href={`/${suburl}`}
                                    onClick={() => handleCategoryChange()}
                                  >
                                    <a>{subcat.description}</a>
                                  </Link>
                                </li>
                                {subcat.childs.map((subsubcat, index) => (
                                  <li className="subchilds" key={index}>
                                    <Link
                                      href={`/${subsubcat.URL}`}
                                      onClick={() => handleCategoryChange()}
                                    >
                                      <a>{subsubcat.description}</a>
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </li>
                          );
                        })}
                      </ul>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </NavWrapper>
  );
};

export default Nav;
