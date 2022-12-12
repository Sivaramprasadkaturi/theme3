import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { MdSearch } from "react-icons/md";
import styled from "styled-components";
import { TYPEAHEADSEARCH_LINK } from "../../redux/links";
import Translate from "../../utils/Translate";
import { useTranslation } from "next-i18next";
const Search = ({ closeMobileNav }) => {
  const [keyword, setKeyword] = useState("");
  const [typeAheadResult, setTypeAheadResult] = useState([]);
  const [dropdownSelectedIndex, setDropdownSelectedIndex] = useState(null);
  const [searchInputFocused, setSearchInputFocused] = useState(false);

  const inputRef = useRef();
  const { t } = useTranslation("translation");
  const handleArrowNavigateDropdown = e => {
    console.info("clicked", dropdownSelectedIndex);
    e = e || window.event;
    if (e.keyCode == "27") {
      if (closeMobileNav) closeMobileNav();
      setKeyword("");
      setTypeAheadResult([]);
      setDropdownSelectedIndex(null);
    }

    if (dropdownSelectedIndex !== null) {
      if (e.keyCode == "38") {
        P;
        if (dropdownSelectedIndex > 0)
          setDropdownSelectedIndex(
            dropdownSelectedIndex => dropdownSelectedIndex - 1
          );
        else if (dropdownSelectedIndex === 0) setDropdownSelectedIndex(null);
      } else if (e.keyCode == "40") {
        if (
          dropdownSelectedIndex < typeAheadResult.length - 1 &&
          dropdownSelectedIndex < 5
        )
          setDropdownSelectedIndex(
            dropdownSelectedIndex => dropdownSelectedIndex + 1
          );
      }
    } else if (dropdownSelectedIndex === null) {
      if (e.keyCode == "40") {
        setDropdownSelectedIndex(0);
      }
    }
  };

  useEffect(() => {
    if (typeAheadResult && typeAheadResult.length > 0) {
      //setDropdownSelectedIndex(0);
    } else {
      setDropdownSelectedIndex(null);
    }
  }, [typeAheadResult]);

  const handleKeyClicked = key => {
    if (closeMobileNav) closeMobileNav();
    console.info("clicked", key);
    setTypeAheadResult([]);
    setKeyword("");
    setSearchInputFocused(false);
    router.push(`/search?keyword=${key}`);
  };

  /*  const setStyles = () => {
    if (inputRef.current) {
      let inputPosition = inputRef.current.getBoundingClientRect();
      console.info("inputPosition", inputPosition);
      return {
        top: `${inputPosition.top - 23}px`,
        left: `${inputPosition.left}px`,
        width: `${inputPosition.width}px`
      };
    }
  }; */

  const router = useRouter();
  return (
    <Wrapper>
      <form className="form-input" role="search">
        <label htmlFor="siteSearch" className="screen-reader-text">
          Search for products
        </label>
        <input
          onBlur={() => setSearchInputFocused(false)}
          onFocus={() => setSearchInputFocused(true)}
          ref={inputRef}
          id="siteSearch"
          type="search"
          name="search"
          // className="outline-none appearance-none "
          placeholder="Search for Product"
          value={keyword}
          // name="keyword"
          onChange={e => {
            e.preventDefault();

            let { value } = e.target;

            value = value.replace(/\*/g, "");
            setKeyword(e.target.value);

            if (value.length > 2) {
              let link = TYPEAHEADSEARCH_LINK("EN", value);
              fetch(link).then(res => {
                res.text().then(text => {
                  console.error("WED2", text);
                  text = text.split("\n");
                  setTypeAheadResult(text);
                  return text;
                });
              });
            }
            if (value == "") {
              setTypeAheadResult([]);
              setKeyword("");
            }
          }}
          onKeyDown={e => {
            handleArrowNavigateDropdown(e);
            if (e.key === "Enter") {
              if (closeMobileNav) closeMobileNav();
              if (
                dropdownSelectedIndex !== null &&
                typeAheadResult &&
                typeAheadResult.length > 0
              ) {
                setKeyword("");
                setTypeAheadResult([]);
                router.push(
                  `/search?keyword=${typeAheadResult[dropdownSelectedIndex]}`
                );
                return;
              }
              setSearchInputFocused(false);
              keyword !== "" && router.push(`/search?keyword=${keyword}`);
            }
          }}
        />
        {/* <img src="https://ik.imagekit.io/ofb/themes/Path_3_lOXgVmjzE.svg?ik-sdk-version=javascript-1.4.3&updatedAt=1665052322256" /> */}
        <button
          type="submit"
          aria-label="Search"
          onClick={e => {
            e.preventDefault();
            if (closeMobileNav) closeMobileNav();
            setSearchInputFocused(false);
            keyword !== "" && router.push(`/search?keyword=${keyword}`);
          }}
        >
          {/* <MdSearch
            onClick={e => {
              e.preventDefault();
              if (closeMobileNav) closeMobileNav();
              setSearchInputFocused(false);
              keyword !== "" && router.push(`/search?keyword=${keyword}`);
            }}
            style={{ fontSize: "1.5rem", cursor: "pointer" }}
          /> */}
          <svg fill="#212b36" width="15" height="15" viewBox="0 0 15 15">
            <path d="M14.8,13.7L12,11c0.9-1.2,1.5-2.6,1.5-4.2c0-3.7-3-6.8-6.8-6.8S0,3,0,6.8s3,6.8,6.8,6.8c1.6,0,3.1-0.6,4.2-1.5l2.8,2.8c0.1,0.1,0.3,0.2,0.5,0.2s0.4-0.1,0.5-0.2C15.1,14.5,15.1,14,14.8,13.7zM1.5,6.8c0-2.9,2.4-5.2,5.2-5.2S12,3.9,12,6.8S9.6,12,6.8,12S1.5,9.6,1.5,6.8z"></path>
          </svg>
        </button>
        {/* <MdSearch
          onClick={e => {
            e.preventDefault();
            if (closeMobileNav) closeMobileNav();
            setSearchInputFocused(false);
            keyword !== "" && router.push(`/search?keyword=${keyword}`);
          }}
          style={{ fontSize: "1.5rem", cursor: "pointer" }}
        />{" "} */}
      </form>
      {typeAheadResult &&
      typeAheadResult.length > 0 &&
      typeAheadResult[0] &&
      keyword ? (
        <div
          /*     style={setStyles()} */
          className={
            searchInputFocused
              ? "search-typeahead-container active"
              : "search-typeahead-container"
          }
        >
          <ul>
            {typeAheadResult.map((key, index) => {
              if (index >= 6) return null;
              return (
                <li
                  style={{ textTransform: "uppercase" }}
                  key={`${key}`}
                  className={`${
                    index === dropdownSelectedIndex ? "active" : ""
                  }`}
                  onMouseDown={() => {
                    setKeyword("");
                    handleKeyClicked(key);
                  }}
                >
                  {key}
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  justify-content: flex-end;
  display: flex;
  .form-input {
    display: flex;
    height: 40px;
    align-items: center;
    opacity: 1;
    max-width: 80%;
    justify-content: space-around;
    background: #FFFFFF 0% 0% no-repeat padding-box;
    border: 0.5px solid #F28312;
    border-radius: 5px;
    opacity: 1;
  }
  input {
    font-family: 'Poppins', sans-serif;
    width: 305px !important;
    margin: 0 !important;
    height: 32px !important;
    border-radius: 0 !important;
    font-size: 16px !important;
    border: none !important;
    color: #192a3d !important;
    padding-left: 20px !important;
    background: none;
    ::placeholder {
      color: gray !important;
      font-weight: 300;
    }
    max-width: 80%;
  }
  .form-input img {
    width: 26px;
    height: 26px;
    margin-right: 15px;
  }
  input::placeholder {
    color: #212b36;
  }
  .search-typeahead-container {
    display: none;
    position: absolute;
    background-color: #fff;
    width: 80%;
    z-index: 1;
    padding: 3px;
    border: 1px solid;
    border-color: #fff #cdcdcd #cdcdcd !important;
    top:40px;
  }

  .search-typeahead-container.active {
    display: block;
  }

  .search-typeahead-container li {
    padding-left: 16px;
    line-height: 35px;
    cursor: pointer;
  }
  .search-typeahead-container li.active,
  .search-typeahead-container li:hover {
    background-color: #ddd;
  }

  .search-typeahead-container li strong {
    color: #fe4f00;
  }

  @media only screen and (max-width: 1023px) {
    #siteSearch {
      width: 100% !important;
    }

    .form-input {
      padding: 0 10px;
    }
  }
`;

export default Search;
