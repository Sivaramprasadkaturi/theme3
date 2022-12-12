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

function AboutItem({ description, properties }) {
  console.log("PROPERTIESSSSS ", properties);
  const [currentSection, setCurrentSection] = useState(0);
  const RenderCurrentSection = () => {
    switch (currentSection) {
      case 0:
        return (
          <p
            className="text-[12px] lg:text-[13px]"
            dangerouslySetInnerHTML={{
              __html: description
                ? description
                : "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Asperiores, commodi consequuntur id impedit magni mollitia nostrum optio saepe soluta velit?"
            }}
          ></p>
        );
      
      default:
        return <p>Something went wrong...</p>;
    }
  };
  return (
    <div>
      
         
       
        <div>
          <RenderCurrentSection />
        </div>
    </div>
  );
}

const OtherInfoTab = ({ longDesc, properties, hiddenProps, description }) => {
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
        className="product-details-specs-container tableright">
        <AboutItem description={longDesc} properties={properties} />
       
      </div>
    </Wrapper>
  );
};

export default OtherInfoTab;
