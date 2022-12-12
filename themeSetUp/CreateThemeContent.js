
import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { generate } from 'shortid';
import _ from 'lodash';
import { useTheme } from './theme/useTheme';
import Axios from 'axios';


const Container = styled.div`
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
    margin-top: 1rem;

    @media screen and (max-width: 768px) {
        {
          grid-template-columns: repeat(1, 1fr) !important;
        }
      }
`;

const Section = styled.div`
    vertical-align: top;
    margin-right: 10px;
    padding: 10px;

    @media screen and (max-width: 768px) {
        {
            margin-right: 0px !important;
            padding: 10px 0px !important;
        }
      }
`;

const Row = styled.div`
        padding: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 7px;
        font-family: 'Poppins', sans-serif;
        font-size: 15px;
`;

const Preview = styled.div`
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
    height: 350px;
    width: 450px;
    border: 1px solid #f4f4f4;
    border-radius: 10px;
    display: inline-block;
  }

  @media screen and (max-width: 768px) {
    .customizer-contain .customizer-body .main-layout > li {
        height: 350px;
        width: 100% !important;
        border: 1px solid #f4f4f4;
        border-radius: 10px;
        display: inline-block;
      }
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
height: 40px;
border-radius: 3px;
position: relative;
}

.layout-grid:not(.customizer-color) li > .banner {
    height: 80px;
    border-radius: 3px;
    position: relative;
    margin-top: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
    }
    .layout-grid:not(.customizer-color) li > .banner ul {
        
    }
    .layout-grid:not(.customizer-color) li > .banner ul > li {
        display: inline-block;
        
        padding: 0;
        font-size: 15px;
    }

    .layout-grid:not(.customizer-color) li > .footer {
        height: 46px;
        border-radius: 3px;
        position: relative;
        margin-top: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        }
        .layout-grid:not(.customizer-color) li > .footer ul {
            
        }
        .layout-grid:not(.customizer-color) li > .footer ul > li {
            display: inline-block;
            
            padding: 0;
            font-size: 12px;
            margin-right: 40px;
        }
.layout-grid:not(.customizer-color) li > .header ul {
    position: absolute;
    top: 8px;
    left: 19px;
}
.layout-grid:not(.customizer-color) li > .header ul > li {
    display: inline-block;
    top: calc(50% - 3px);
    margin-right: 2px;
    padding: 0;
    font-weight: 500;
    font-size: 13px;
}
.customizer-contain .customizer-body li {
cursor: pointer;
opacity: 0.9;
}
.layout-grid:not(.customizer-color) li > .body {
background-color: #f4f4f4;
height: calc(100% - 243px);
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
align-items: baseline;
justify-content: center;
border-radius: 3px;
}
.bg-light p{
    font-size:12px;
}
.layout-grid:not(.customizer-color) li > .body ul .body .badge {
position: absolute;
top: 54px;
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
.cardlist{
    background: #fff;
    margin-top:7px;
    margin-bottom:7px;
}
.cardlist ul{
    width:100%;
    margin: 0 auto;
    display:flex;
}
.cardlist ul li{
    width: calc(33.33% - 0px);
    margin-right: 7px !important;
    padding: 0 !important;
    margin: 0;
    height: 100%;
    display: inline-flex;
    border-radius: 3px;
    background: #f5f5f5;
    height:50px;
}

`;

const CreateThemeContent = props => {



    const defaultTheme = {
        themeName: "",
        bgColor: "#Cf4307",
        txtColor: "#FFFFFF",
        btnBgColor: "#000000",
        btnTxtColor: "#FFFFFF",
        linkColor: "#10BEEA",
        font: "Roboto",
        banner: "single",
        card: "3 cards per Row"

    };
    const { getFonts } = useTheme();
    const { getBanners } = useTheme();
    const { getCards } = useTheme();
    const [state, setState] = useState(defaultTheme);

    const [newTheme, setNewTheme] = useState({});
    const mainValue = state.themeName;

    console.log('newTheme', newTheme);

    const getThemeObj = () => {
        const themeObj = {};
        console.log('rrr', themeObj);
        themeObj[_.camelCase(state.themeName)] = {
            "id": generate(),
            "name": state.themeName,
            "colors": {
                "body": state.bgColor,
                "text": state.txtColor,
                "button": {
                    "text": state.btnBgColor,
                    "background": state.btnTxtColor
                },
                "link": {
                    "text": state.linkColor,
                    "opacity": 1
                }
            },
            "font": state.font,
            "banner": state.banner,
            "card": state.card

        };
        return themeObj;

    }
    console.log('sss', getThemeObj);

    useEffect(() => {
        const updated = getThemeObj();
        console.log('sssssss', updated);
        setNewTheme({ ...updated });
        console.log("AS NEW ", newTheme);
    }, [state]);

    const [error, setError] = useState(false);

    const handleChange = evt => {
        const value = evt.target.value;
        setState({
            ...state,
            [evt.target.name]: value
        });
       
    }

    

    const createTheme = (e) => {
        e.preventDefault();
        
        
        // if (mainValue.length == 0){
        //     setError(true);
        // }
        const jsonData = JSON.stringify(newTheme);

        const postData = {
            "id": generate(),
            "name": state.themeName,
            "colors": {
                "body": state.bgColor,
                "text": state.txtColor,
                "button": {
                    "text": state.btnBgColor,
                    "background": state.btnTxtColor
                },
                "link": {
                    "text": state.linkColor,
                    "opacity": 1
                }
            },
            "font": state.font,
            "banner": state.banner,
            "card": state.card
        }

        //localStorage.setItem('all-themes', JSON.stringify(consent));

        Axios.post(
            `https://themes-c5a48-default-rtdb.firebaseio.com/schema/data.json`,
            postData,
        ).then(response => {
            console.log(response);
            //localStorage.setItem('all-themes', JSON.stringify(jsonData));
        })

        // useEffect(() => {
        //       fetch(FINAL_POST_DATA)
        //         .then(data => data.json())
        //         .catch(err => {
        //           console.error("err fetching item videos", err);
        //         });
        //     }
        //   , []);

        // Axios.post('https://b2bndemo1-c11ca-admin.avetti.ca/preview/store/20221017620/datafeed/schema.json', {
        //     "id": generate(),
        //     "name": state.themeName,
        //     "colors": {
        //         "body": state.bgColor,
        //         "text": state.txtColor,
        //         "button": {
        //             "text": state.btnBgColor,
        //             "background": state.btnTxtColor
        //         },
        //         "link": {
        //             "text": state.linkColor,
        //             "opacity": 1
        //         }
        //     },
        //     "font": state.font
        // }).then(res => console.log('Posting Data', res)). catch(err => console.log(err));
        // fetch("https://b2bndemo1-c11ca-admin.avetti.ca/preview/store/20221017620/datafeed/schema.json", { method: "POST", body: jsonData });
        console.log('locals', jsonData)
        setState({ ...newTheme });
        props.create(newTheme);
        //localStorage.setItem('menu', JSON.stringify(newTheme));
    }


    return (
        <>

            <Container>

                <Section>
                    <Row>
                        <label htmlFor="th_name">Theme Name:</label> {' '}
                        <input
                            type="text"
                            id="themeName"
                            name="themeName"
                            value={state.themeName}
                            style={{ textAlign: "right" }}
                            placeholder="Specify a name"
                            onChange={handleChange}
                            //onChange={e => setThemeName(e.target.value)}
                            />
                            {error ? <span>Theme Name can't be Empty</span> : null }
                    </Row>
                    <Row>
                        <label htmlFor="bg_color">Background Color:</label> {' '}
                        <input type="color" id="bg_color" name="bgColor" value={state.bgColor} onChange={handleChange} />
                    </Row>
                    <Row>
                        <label htmlFor="txt_color">Text Color:</label> {' '}
                        <input type="color" id="txt_color" name="txtColor" value={state.txtColor} onChange={handleChange} />
                    </Row>
                    <Row>
                        <label htmlFor="btn_bg_color">Button Background Color:</label> {' '}
                        <input type="color" id="btn_bg_color" name="btnBgColor" value={state.btnBgColor} onChange={handleChange} />
                    </Row>
                    <Row>
                        <label htmlFor="btn_txt_color">Button Text Color:</label> {' '}
                        <input type="color" id="btn_txt_color" name="btnTxtColor" value={state.btnTxtColor} onChange={handleChange} />
                    </Row>
                    <Row>
                        <label htmlFor="link_color">Link Color:</label> {' '}
                        <input type="color" id="link_color" name="linkColor" value={state.linkColor} onChange={handleChange} />
                    </Row>
                    <Row>
                        <label htmlFor="font">Select a Font:</label> {' '}
                        <select name="font" id="font" onChange={handleChange} value={state.font}>
                            {getFonts().map((font, index) =>
                                <option value={font} key={index}>{font}</option>
                            )}
                        </select>
                    </Row>
                    <Row>
                        <label htmlFor="banner">Banner Style</label> {' '}
                        <select name="banner" id="banner" onChange={handleChange} value={state.banner}>

                            <option value="Single">Single</option>
                            <option value="Multiple">Multiple</option>

                        </select>
                    </Row>
                    <Row>
                        <label htmlFor="card">Card Style</label> {' '}
                        <select name="card" id="card" onChange={handleChange} value={state.card}>

                            <option value="3 cards per Row">3 cards per Row</option>
                            <option value="4 cards per Row">4 cards per Row</option>

                        </select>
                    </Row>
                </Section>

                <Section>
                    <span><b>Preview</b></span>
                    {/* <Preview style={{backgroundColor: state.bgColor, color: state.txtColor, fontFamily: state.font}}>
                    <p>
                        This is for preview only. Pick the color and font from the 
                        left side to see it working.
                    </p>
                    <button className="btn" style={{margin: "10px 0px", padding: "10px 30px", backgroundColor:state.btnBgColor, color:state.btnTxtColor, fontFamily: state.font}}>
                        I am a Button
                    </button> {'  '}
                    <a href="#" style={{color:state.linkColor, fontFamily: state.font}}>I am Link</a>
                    <a href="#">{state.banner === "single" ? "Siva" : "Ram"}</a>
                </Preview> */}
                    <Preview>
                        <div className="customizer-contain open">
                            <div className="customizer-body custom-scrollbar">
                                <div className="tab-pane fade active show" id="c-pills-home">
                                    <ul className="main-layout layout-grid">
                                        <li data-attr="ltr" className="active">
                                            <div className="header bg-light" style={{ backgroundColor: state.bgColor, color: state.txtColor, fontFamily: state.font }}>
                                                <ul>
                                                    <li>LOGO</li>
                                                </ul>
                                            </div>

                                            <div className="banner bg-light">
                                                <ul>
                                                    <li style={{ fontFamily: state.font }}>{state.banner === "single" ? "Single Banner" : "Multiple Banners"}</li>
                                                </ul>
                                            </div>
                                            {state.card === "3 cards per Row" ? <div className="cardlist bg-light">
                                                <ul>
                                                    <li></li>
                                                    <li></li>
                                                    <li></li>
                                                </ul>
                                            </div> : <div className="cardlist bg-light">
                                                <ul>
                                                    <li></li>
                                                    <li></li>
                                                    <li></li>
                                                    <li></li>
                                                </ul>
                                            </div>}
                                            
                                            <div className="body">
                                                <ul>

                                                    <li className="bg-light body">
                                                        <p style={{ fontFamily: state.font }}>End of Season upto to 70% off</p><br />
                                                        <span className="badge badge-primary" style={{ borderRadius: "32px", padding: "8px 30px", backgroundColor: state.btnBgColor, color: state.btnTxtColor, fontFamily: state.font }}>Button</span>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div className="footer bg-light">
                                                <ul>
                                                    <li style={{ fontFamily: state.font }}>Footer Logo</li>
                                                    <li style={{ fontFamily: state.font }}>Column 1</li>
                                                    <li style={{ fontFamily: state.font }}>Column 2</li>
                                                    <li style={{ fontFamily: state.font }}>Column 3</li>
                                                </ul>
                                            </div>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Preview>
                </Section>
                {mainValue?.length === 0 ? <button
                    style={{ float: 'right', margin: "0px 0px 20px 0px", padding: "10px 30px", fontFamily: "Roboto", background: "#cdcdcd", color: "#fff", cursor: "not-allowed" }}
                   
                >
                    Save Data
                </button> : <button
                    style={{ float: 'right', margin: "0px 0px 20px 0px", padding: "10px 30px", fontFamily: "Roboto", background: "#000000", color: "#fff" }}
                    onClick={createTheme}
                >
                    Save Data
                </button>}
                

            </Container>

        </>
    )
};

export default CreateThemeContent;