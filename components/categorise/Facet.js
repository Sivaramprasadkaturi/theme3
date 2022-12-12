import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { MdKeyboardArrowUp, MdKeyboardArrowDown, MdDone } from "react-icons/md";

const Wrapper = styled.div`
  //justify-content: center;
  //margin-top: 100px;
  //margin-left: 50px;
  width: auto;
    margin: 5px 0px 10px 0px;
    padding: 0px 30px;

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


div a {
  text-decoration: none;
  color: #111;
  font-size: 20px;
  padding: 15px;
  display:inline-block;
}
ul {
  display: inline;
  margin: 0;
  padding: 0;
}
ul li {display: inline-block;}
ul li a{display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-weight: 500;}
  ul li a img{height: 35px;
    margin-right: 10px;}
    ul li a:hover {color:#F28312}
ul li:hover {background: #fff;}
ul li:hover ul {display: block;}
ul li ul {
  position: absolute;
  width: 190px;
  display: none;
  background: #fff;
    z-index: 9999;
        border-top: 4px solid #F28312;
        background: #FFFFFF 0% 0% no-repeat padding-box;
box-shadow: 3px 3px 8px #00000029;
opacity: 1;
}

ul li ul:before {
  border-bottom: 25px solid #fff;
  border-left: 25px solid transparent;
  border-right: 25px solid transparent;
  right: 95px;
  bottom: -5px;
}
ul li ul li { 
  display: block; 
}
ul li ul li a {display:block !important;} 
ul li ul li:hover { }

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
    margin: 10px;
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
    font-size: 12px;
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
      <Wrapper className={`facet-${facet?.title.toLowerCase()}`}>
      

        <ul>
          <li>
            <a href="#"><img src={`https://ik.imagekit.io/ofb/themes/tr:h-52,q-70/${facet?.title}.svg`} /> {facet?.title}</a>
            <ul className="triangle triangle-top">
              {facet?.facetValues
                ?.filter(f => f.count > 0)
                .map(facetValue => {
                  return (
                    <li
                      onKeyDown={e => {
                        if (e.key === "Enter") {
                          e.target.click();
                        }
                      }}
                      tabIndex={"0"}
                      className={`focusAble flex my-2 cursor-pointer ${isOpen ? "content show" : "content show"
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

                   
                      <CheckBox className="flex items-center justify-center w-6 h-6 mr-4">
                        {query.find(
                          q =>
                            q.value ===
                            `${facet.code || facet.name}=${facetValue.code || facetValue.value
                            }`
                        ) ? (
                          <MdDone
                            className="text-sm"
                            style={{
                              color: "#DC7863",
                              fontSize: "38px"
                            }}
                          />
                        ) : (
                          ""
                        )}
                      </CheckBox>
                      <TextFilter>{facetValue.text}</TextFilter>
                      <p style={{ marginLeft: "auto" }}>{facetValue.count}</p>
                    </li>
                  );
                })}
            </ul>
          </li>
        </ul>




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
