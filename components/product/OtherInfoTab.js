import React, { useState } from "react";
import htmldecoder from "../../utils/htmlDecoder";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useTranslation } from "next-i18next";
import {
  MdOutlineCancel,
  MdClose,
  MdRemove,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdStarRate,
  MdStarHalf,
  MdAdd,
  MdStarOutline
} from "react-icons/md";


const Wrapper = styled.div`
  .product-details-specs-container {
    margin-bottom: 20px;
  }
  .descr{
    border-bottom: 1px solid #cdcdcd;
  }
  .descr h2{
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 17px;
    padding: 10px 0px;
    letter-spacing: 0px;
    color: #212B36;
    opacity: 1;
    font-weight:600;
    cursor:pointer;
  }
  .botop{
    border-bottom: 3px solid #f1f1f1;
  }
  .botop p{
    font-size: 15px;
    font-weight: 500;
    padding: 10px 20px;
    position: relative;
    top: 3px;
    min-width: 200px;
    text-align: center;
    margin-right: 0px;
  }
  .leading-loose p{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 400px;
    line-height: 45px;
    border: 1px solid #f1f1f1;
    padding: 0px 10px;
    font-size: 15px;
}
.leading-loose p span{
  font-weight:500;
}
  .product-details-specs-container h3 {
    padding-bottom: 12px;
    margin-top: 50px;
    font-size: 20px;
    border-bottom: 1px solid #cdcd;
  }
  .hidden {
    display:none;
  }
  .title{
    font-size: 14px;
    margin-bottom: 15px;
  }

  p.activeItemTab {
    border-bottom: 3px solid #F39B42;
  }
`;

function AboutItem({ description, properties }) {
  const { t } = useTranslation("translation");

  const [currentSection, setCurrentSection] = useState(0);
  const RenderCurrentSection = () => {
    switch (currentSection) {
      case 0:
        return (
          <p
            className="text-[12px] lg:text-[16px] p-3"
            dangerouslySetInnerHTML={{
              __html: description
                ? description
                : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, commodi consequuntur id impedit magni mollitia nostrum optio saepe soluta velit?"
            }}
          ></p>
        );
      case 1:
        return (
          <div className="leading-loose">
            {properties ? (
              properties.map((prop, i) => (
                <p key={i} className="text-[12px] lg:text-[16px] ml-3">
                  <span>{prop.propdesc}</span> :{" "}
                  {prop.propvalue}
                </p>
              ))
            ) : (
              <p className="text-[12px] lg:text-[16px]">
                There is no Specifications to show
              </p>
            )}
          </div>
        );
      case 2:
        return (
          <p className="text-[12px] lg:text-[16px]">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ad
            assumenda atque cum cupiditate laboriosam nulla odio odit pariatur
            totam!
          </p>
        );
      default:
        return <p>Something went wrong...</p>;
    }
  };
  return (
    <div className="w-full h-full flex my-6">
      <div className="flex flex-col w-full">
        <div className="flex items-center botop">
          <p
            tabIndex={"0"}
            onKeyDown={e => {
              if (e.code === "Enter") {
                e.target.click();
              }
            }}
            className={
              currentSection == 0
                ? " cursor-pointer itemTab activeItemTab"
                : " cursor-pointer itemTab"
            }
            onClick={() => setCurrentSection(0)}
          >
            Description
          </p>
          <p
            tabIndex={"0"}
            onKeyDown={e => {
              if (e.code === "Enter") {
                e.target.click();
              }
            }}
            className={
              currentSection == 1
                ? "cursor-pointer itemTab activeItemTab"
                : "cursor-pointer itemTab"
            }
            onClick={() => setCurrentSection(1)}
          >
            Additional-info
          </p>
          <p
            tabIndex={"0"}
            onKeyDown={e => {
              if (e.code === "Enter") {
                e.target.click();
              }
            }}
            className={
              currentSection == 2
                ? "cursor-pointer itemTab activeItemTab"
                : "cursor-pointer itemTab"
            }
            onClick={() => setCurrentSection(2)}
          >
            Reviews
          </p>
          <p
            tabIndex={"0"}
            onKeyDown={e => {
              if (e.code === "Enter") {
                e.target.click();
              }
            }}
            className={
              currentSection == 3
                ? "cursor-pointer itemTab activeItemTab"
                : "cursor-pointer itemTab"
            }
            onClick={() => setCurrentSection(3)}
          >
           Other Content
          </p>
          <p
            tabIndex={"0"}
            onKeyDown={e => {
              if (e.code === "Enter") {
                e.target.click();
              }
            }}
            className={
              currentSection == 4
                ? "cursor-pointer itemTab activeItemTab"
                : "cursor-pointer itemTab"
            }
            onClick={() => setCurrentSection(4)}
          >
            Comments
          </p>
        </div>
        <div className="my-5 ml-2 ">
          <RenderCurrentSection />
        </div>
      </div>
    </div>
  );
}

const OtherInfoTab = ({ longDesc, properties, hiddenProps }) => {
  const { t } = useTranslation("translation");
  const [showInfo, setShowInfo] = useState(false);
  const [showInfo1, setShowInfo1] = useState(false);
  const [showInfo2, setShowInfo2] = useState(false);
  const [showInfo3, setShowInfo3] = useState(false);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };

  return (
    <Wrapper>
      <div
        className="product-details-specs-container"
        style={{ backgroundColor: "white" }}
      >
    
        



        

       

       
        <AboutItem description={longDesc} properties={properties} />
      </div>
    </Wrapper>
  );
};

export default OtherInfoTab;
