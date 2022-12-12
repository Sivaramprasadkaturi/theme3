import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { MdKeyboardArrowUp, MdKeyboardArrowDown, MdDone } from "react-icons/md";

const Wrapper = styled.div`
  width: auto;
    margin: 5px 0px 10px 0px;
    padding: 0px 0px;
    margin: 0 auto;

  h2 {
    cursor: pointer;
    font-size: 14px;
    border-bottom: 1px solid #e9e9ed;
  letter-spacing: 0px;
  color: #212B36;
  opacity: 1;
  font-weight: 500;
  width: 100%;
  padding-bottom: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }



  .facet-brand{
    display:none;
  }

  hr {
    margin-bottom: 15px;
    margin-top: 15px;
    border-bottom: 1px solid #e9e9ed;
    width: 100%;
  }

  .delivery-facet {
    border: 1px solid;
    padding: 5px;
    margin: 10px;
    font-size: 14px;
  }

  .clearBtn {
    float: right;
    font-size: 14px;
    color: orange;
    cursor: pointer;
  }
  

  .color-dots {
    height: 25px;
    width: 25px;
    background-color: #bbb;
    border-radius: 50%;
    display: inline-block;
    margin: 10px;
  }

  li {
    margin: 0px 10px;
  }

  .stars {
    color: orange;
    font-size: 1rem;
    display: inline-block;
    margin-right: 30px;
  }

  .distanceCheck {
    display: block;
  }

  input {
    margin-top: 10px;
    height: 20px;
    margin-right: 15px;
    width: 30px;
  }

  .viewBtn {
    color: var(--primary);
    display: inline-block;
    border: 1px solid var(--primary);
    font-size: 14px;
    padding: 10px;
    //margin-top:10px;
  }

  .storeInfo {
    flex: 1;
  }

  p {
    font-size: 15px;
    font-weight: 500;
    color:#cdcdcd;
  }
  span{
    font-size: 13px;
    font-weight: 400;
    color:#cdcdcd;
  }
  .selected p{
    color:#333;
  }
  .selected span{
    color:#333;
  }

  

  .content {
    width: 100%;
    //height: auto;
    margin-top: 10px;
    //border: 1px solid #686868;
    display: none;
    //justify-content: center;
    //border-radius: 10px;
  }

  .show {
    width: 88%;
    display: flex;
    align-items: center;
  }
`;

const Facet = ({
  facet,
  query,
  setQuery,
  collectionsOpen,
  index,
  queryIsNotChanged,
  setQueryIsNotChanged
}) => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const handleSetQuery = (query, facet, facetValue) => {
    if (queryIsNotChanged && setQueryIsNotChanged) setQueryIsNotChanged(false);

    setQuery([
      ...query,
      {
        name: facetValue.name,
        value: `${facet.code || facet.name}=${facetValue.code || facetValue.value
          }`,
        removeText: facetValue.removeText
      }
    ]);
  };

  useEffect(() => {
    if (
      facet?.title.toLowerCase() === "price" ||
      facet?.title.toLowerCase() === "sellers" ||
      (collectionsOpen && facet?.title.toLowerCase() === "collections")
    ) {
      setIsOpen(true);
    }
  }, [facet]);

  return (
    <>
      <Wrapper className={`facetmvp-${facet?.title.toLowerCase()}`}>
        <div className="productLineWrapperMain">
          <div className="productLineWrapper">
            <ul className="productLine">
              {facet?.facetValues
                ?.map(facetValue => {
                  return (
                    <li
                      onKeyDown={e => {
                        if (e.key === "Enter") {
                          e.target.click();
                        }
                      }}
                      tabIndex={"0"}
                      className={`focusAble productLineFacets newfacetline
                        }`}
                      key={facetValue.removeText}
                      onClick={() =>
                        query.length > 0
                          ? query.find(
                            q =>
                              q.value ===
                              `${facet.code || facet.name}=${facetValue.code || facetValue.value
                              }`
                          )
                            ? setQuery([
                              ...query.filter(
                                q =>
                                  q.value !==
                                  `${facet.code || facet.name}=${facetValue.code || facetValue.value
                                  }`
                              )
                            ])
                            : handleSetQuery(query, facet, facetValue)
                          : handleSetQuery(query, facet, facetValue)
                      }
                    >

                     
                      <div className={
                        facetValue.count === 0
                          ? "facet-box "
                          : "facet-box selected"
                      } >
                        <div className="productLineFacetsImgWrapper cat-wrap-img">
                        {facet?.title === "Furniture" ? <img alt={facet?.title} src={`https://ik.imagekit.io/ofb/themes/tr:h-250,q-70/${facetValue.text.toLowerCase().replace(/\s/g, "")}.png`} class="img-responsive" /> : null }
                        </div>
                        <div class="productText newfonttext"><p>{facetValue.text}</p><span>No. of Options ({facetValue.count})</span></div>
                      </div>


                    </li>
                  );
                })}
            </ul>
          </div>
        </div>




      </Wrapper>
    </>
  );
};

const H2 = styled.h2`
  font-size: 22px;
  line-height: 28px;
`;
const CheckBox = styled.div`
  position: relative;
  top: 0;
  left: 0;
  height: 17px;
  width: 17px;
  background-color: #fff;
  cursor: pointer;
  margin: 0 5px 0 0;
  border: 1px solid #c8c8c8;
`;
const TextFilter = styled.p`
  font-weight: normal;
  font-size: 13px;
  line-height: 22px;
  margin-left: 5px;
`;
const Line = styled.span`
  height: 2px;
  background: #c4c4c4;
  margin: 30px 0px;
`;
export default Facet;
