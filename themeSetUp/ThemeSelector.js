import React, { useState, useEffect } from "react";
import styled from "styled-components";
import _ from "lodash";
import { useTheme } from "./theme/useTheme";
import { getFromLS } from "./utils/storage";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  MdDeleteOutline,
  MdOutlineModeEditOutline,
  MdClose
} from "react-icons/md";

const ThemedButton = styled.button`
    border: 0;
    display: inline-block;
    padding: 7px 24px;
    font-size: 14px;
    border-radius: 4px;
    margin-top: 5px;
    width: 100%;
    cursor: pointer;
`;

const Wrapper = styled.div`
    
.footer{
  display: flex;
  font-size: 12px;
  margin: 3px 5px;
  justify-content: space-between;
    align-items: center;
}
.footerright ul{
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px !important;
}

.hide {
  display: none;
}
    
.myDIV:hover + .hide {
  display: block;
  color: #222;
}

    .fade {
      transition: opacity 0.15s linear;
    }
    .customizer-contain h6 {
    text-transform: uppercase;
    font-weight: 500;
    letter-spacing: 0.5px;
    margin-top: 15px;
    padding-top: 15px;
    margin-bottom: 10px;
    }
    .customizer-contain .customizer-body .main-layout > li {
      height: 100px;
      width: 140px;
      border: 1px solid #f4f4f4;
      border-radius: 10px;
      display: inline-block;
    }
    .customizer-contain .customizer-body li.active {
      opacity: 1;
  }
  .layout-grid:not(.customizer-color) li {
    padding: 5px;
}
.customizer-contain li.active {
  box-shadow: 0 0 11px 5px rgba(226, 226, 226, 0.5);
}
.customizer-contain li {
  position: relative;
}
.layout-grid:not(.customizer-color) li > .header {
  height: 17px;
  border-radius: 3px;
  position: relative;
  
}

.layout-grid:not(.customizer-color) li > .footer {
  height: 17px;
  border-radius: 3px;
  position: relative;
  margin-top:5px;
}

.layout-grid:not(.customizer-color) li > .header ul {
  position: absolute;
  top: -6px;
  left: 9px;
}
.layout-grid:not(.customizer-color) li > .header ul > li {
  display: inline-block;
  top: calc(50% - 3px);
  margin-right: 2px;
  padding: 0;
  font-size: 8px;
  color: #fff;
}
.customizer-contain .customizer-body li {
  cursor: pointer;
  opacity: 0.9;
}
.layout-grid:not(.customizer-color) li > .body {
  background-color: #f4f4f4;
  height: calc(100% - 23px);
  border-radius: 3px;
  position: relative;
  margin-top: 5px;
  text-align: center;
  line-height: 3.1;
}
.layout-grid:not(.customizer-color) li > .header ul > li:nth-child(2) {
  background-color: var(--theme-secondary);
}
.layout-grid:not(.customizer-color) li > .header ul > li:nth-child(3) {
  background-color: #51bb25;
}
.layout-grid:not(.customizer-color) li > .body ul {
  height: 100%;
  background-color: #fff;
}
.layout-grid:not(.customizer-color) li > .body ul .sidebar {
  width: 18px;
  height: 100%;
  border-radius: 3px;
  display: inline-block;
  margin-right: 3px;
  padding: 0;
}
.bg-light {
  background-color: #f4f4f4;
}
.layout-grid:not(.customizer-color) li > .body ul .body {
  width: calc(100% - 0px);
  padding: 0;
  margin: 0;
  height: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
}
.layout-grid:not(.customizer-color) li > .body ul .body .badge {
  position: absolute;
}
.badge {
  padding: 0.44em 0.7em;
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
}
.badge-primary {
  
}
.badge {
  display: inline-block;
  padding: 0.35em 0.65em;
  font-size: 0.75em;
  font-weight: 500;
  line-height: 1;
  color: #fff;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 0.25rem;
  box-shadow: 0 0 2px #cdcdcd;
}
`;

const Container = styled.div`
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(6, 1fr);
    margin-top: 0.5rem;
    padding: 10px;

    @media screen and (max-width: 768px) {
      {
        grid-template-columns: repeat(2, 1fr) !important;
      }
    }
  
    
`;






const Header = styled.h2`
    display: flex;
    justify-content: flex-start;
    letter-spacing: normal;
`;

export default (props, allThemes) => {

  const themesFromStore = getFromLS("all-themes");
  const [data, setData] = useState(props.allThemes);
  const [themes, setThemes] = useState([]);
  const { setMode } = useTheme();

  const [style, setStyle] = useState({
    display: "none",
  });

  const themeSwitcher = selectedTheme => {
    console.log(selectedTheme);
    setMode(selectedTheme);
    props.setter(selectedTheme);
  };

  const themeState = useSelector(
    state => state.themeReducer,
    shallowEqual
  );

  useEffect(() => {
    setThemes(_.keys(data));
  }, [data]);

  useEffect(() => {
    props.newTheme &&
      updateThemeCard(props.newTheme);
  }, [props.newTheme]);

  const updateThemeCard = theme => {
    const key = _.keys(theme)[0];
    const updated = { ...data, [key]: theme[key] };
    setData(updated);
  };

  console.log('allThemes')

  const ThemeCard = props => {
    console.log('propsprops', props);
    return (
      // <Wrapper style={{
      //   backgroundColor: `${props?.theme?.colors?.body}`,
      //   color: `${props?.theme?.colors?.text}`,
      //   fontFamily: `${props?.theme?.font}`
      // }}>
      //   <span>Click on the button to set this theme {props?.theme?.colors?.body}</span>
      //   <ThemedButton onClick={(theme) => themeSwitcher(props?.theme)}
      //                 style={{
      //                   backgroundColor: `${props?.theme?.colors?.button?.background}`,
      //                   color: `${props?.theme?.colors?.button?.text}`,
      //                   fontFamily: `${props?.theme?.font}`
      //                 }}>
      //     {props?.theme.name}
      //   </ThemedButton>
      // </Wrapper>
      <Wrapper>
        <div className="customizer-contain open" onClick={(theme) => themeSwitcher(props?.theme)}>
          <div className="customizer-body custom-scrollbar">
            <div className="tab-pane fade active show" id="c-pills-home">
              <ul className="main-layout layout-grid">
                <li data-attr="ltr" className="active">
                  <div className="header bg-light" style={{
                    backgroundColor: `${props?.theme?.colors?.body}`,
                    color: `${props?.theme?.colors?.text}`,
                    fontFamily: `${props?.theme?.font}`
                  }}>
                    <ul>
                      <li style={{
                        color: `${props?.theme?.colors?.text}`,
                        fontFamily: `${props?.theme?.font}`
                      }}>LOGO</li>
                    </ul>
                  </div>
                  <div className="body">
                    <ul>

                      <li className="bg-light body" style={{
                        backgroundColor: `${props?.theme?.colors?.body}`,
                        color: `${props?.theme?.colors?.text}`,
                        fontFamily: `${props?.theme?.font}`
                      }}>
                        <span className="badge badge-primary" style={{
                          backgroundColor: `${props?.theme?.colors?.button?.background}`,
                          color: `${props?.theme?.colors?.button?.text}`,
                          fontFamily: `${props?.theme?.font}`
                        }}>Button</span>
                      </li>
                    </ul>
                  </div>
                  
                </li>

              </ul>
            </div>
            <div className="footer bg-light" style={{
                    backgroundColor: `#fff`,
                    color: `#222`
                  }}>
                      <div className="myDIV" style={{
                        color: `#222`
                      }}>{props?.theme?.name}</div>
                      <div className="footerright hide">
                          <ul>
                            <li title={`Theme Edit`}><MdOutlineModeEditOutline /></li>
                            <li title={`Theme Delete`}><MdDeleteOutline /></li>
                          </ul>
                        </div>
                  </div>
          </div>
        </div>
      </Wrapper>
    );
  };

  return (
    <div>
      <Header style={{
        fontSize: "19px", color: "#000", fontFamily: "'Poppins', sans-serif", paddingLeft:
          "10px", marginTop: "10px"
      }}>Select a Theme from below</Header>
      <Container>


        {
          themes.length > 0 &&
          themes.map(theme => (
            <ThemeCard theme={data[theme]} key={data[theme].id} />
          ))
        }
      </Container>
    </div>
  );
}