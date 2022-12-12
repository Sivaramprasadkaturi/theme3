import React, { useState } from "react";
import htmldecoder from "../../utils/htmlDecoder";
import styled from "styled-components";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  .product-details-specs-container {
    margin-bottom: 20px;
  }

  .product-details-specs-container h3 {
    padding-bottom: 12px;
    margin-top: 11px;
    font-size: 15px;
    border-bottom: 1px solid #cdcd;
    font-weight: 600;
  }

  p.activeItemTab {
    border-bottom: 2px solid #0077ac;
  }
`;



const OtherInfoTab = ({ longDesc, properties, hiddenProps }) => {
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
        className="product-details-specs-container tableproduct1">
          {/* <h1 className="discountdetails">More Details</h1> */}
          <ul>
          {/* <li className="text-[12px] lg:text-[13px]">
                  <span >Categories</span> {" "}
                  <p >Categories</p>
                </li> */}
         {properties ? (
              properties.map((prop, i) => (
                <li key={i} className="text-[12px] lg:text-[13px]" id={`others-${prop.propname}`}>
                  <span >{prop.propname.replace('_', ' ')}</span> {" "}
                  {/* <p >{prop.propvalue}</p> */}

                  {prop.propname == "directions" ?
                          <>
                            <p >
                              <a style={{color: "#0077ac"}} title={prop.propvalue} rel="noreferrer" target="_blank" href={prop.propvalue}>
                                {prop.propvalue}
                              </a>
                            </p>
                          </> :

                          <p  title={prop.propvalue}>
                            {prop.propvalue}
                          </p>
                        }
                </li>
              ))
            ) : (
              <p className="text-[12px] lg:text-[13px]">
                There is no Specifications to show
              </p>
            )}
            </ul>
      </div>
    </Wrapper>
  );
};

export default OtherInfoTab;
