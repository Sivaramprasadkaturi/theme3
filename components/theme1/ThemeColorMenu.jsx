import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';


function ThemeMenu({
     setTheme,
     //setThemeFont, 
     //setColorTheme, 
     close }) {

     const [colorTheme, setColorTheme] = useState('theme-blue');
     //const [bannerTheme, setBannerTheme] = useState('one');
     const [featuredTheme, setFeaturedTheme] = useState('row6');

     console.log('bannerTheme', bannerTheme.banner);

     useEffect(() => {
          const currentColor = JSON.parse(localStorage.getItem("themes"));
          if (currentColor) {
               setColorTheme(currentColor);
               document.documentElement.className = currentColor.color;
          }

     }, [colorTheme]);

     useEffect(() => {
          const currentBanner = JSON.parse(localStorage.getItem("themesbanner"));
          if (currentBanner) {
               setBannerTheme(currentBanner);
          }

     }, [bannerTheme]);

     useEffect(() => {
          const currentFeatured = JSON.parse(localStorage.getItem("themesfeatured"));
          if (currentFeatured) {
               setFeaturedTheme(currentFeatured);
          }

     }, [featuredTheme]);

     const handleClick = (theme) => {
          let consent = {
               color: theme,
               IsAllPages: "Yes",
               isLoaded: true
          };
          localStorage.setItem('themes', JSON.stringify(consent));
          setColorTheme(consent);
     }

     const handleClickBanners = (banner) => {
          let consent = {
               banner: banner,
               isLoaded: true
          };
          localStorage.setItem('themesbanner', JSON.stringify(consent));
          setBannerTheme(consent);
     }

     const handleClickrowfeatured = (featured) => {
          let consent = {
               featured: featured,
               isLoaded: true
          };
          localStorage.setItem('themesfeatured', JSON.stringify(consent));
          setFeaturedTheme(consent);
     }



     return (
          <MenuStyled>

               <div className="Sivaaaa"
                    style={{ width: "400px" }}
               >
                    <div
                         style={{
                              display: "flex",
                              flexDirection: "column",
                              height: "100%",
                              justifyContent: "space-between",
                              backgroundColor: "white"
                         }}
                    >

                         <div>
                              <div style={{ backgroundColor: "#fff", color: "#000" }}>
                                   <div className="minicart-title">
                                        <h6 className='css-1qtpgeh'>THEME CUSTOMIZER</h6>
                                        <span className='css-bsvkvv'>Customize & Preview in Real Time</span>
                                        <button class="css-16o6xgp" onClick={() => close()} tabindex="0" type="button"><svg className="MuiSvgIcon-root MuiSvgIcon-fontSizeSmall css-1k33q06" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="CloseIcon"><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"></path></svg><span className="MuiTouchRipple-root css-w0pj6f"></span></button>

                                   </div>
                              </div>

                              <div

                              >
                                   
                                   <div className='palette-card'>
                                   <p className="maincss">Primary Color</p>
                                        <div className="palette-card_colors">
                                             <div style={{ background: "rgb(239, 71, 111)" }} id='theme-EF476F' onClick={() => handleClick('theme-EF476F')}><span>EF476F</span></div>
                                             <div style={{ background: "rgb(255, 209, 102)" }} id='theme-FFD166' onClick={() => handleClick('theme-FFD166')}><span>FFD166</span></div>
                                             <div style={{ background: "rgb(6, 214, 160)" }} id='theme-06D6A0' onClick={() => handleClick('theme-06D6A0')}><span>06D6A0</span></div>
                                             <div style={{ background: "rgb(17, 138, 178)" }} id='theme-118AB2' onClick={() => handleClick('theme-118AB2')}><span>118AB2</span></div>
                                             <div style={{ background: "rgb(7, 59, 76)" }} id='theme-073B4C' onClick={() => handleClick('theme-073B4C')}><span>073B4C</span></div>
                                        </div>
                                        <div className="palette-card_colors">
                                             <div  style={{background: "rgb(255, 190, 11)"}} id='theme-FFBE0B' onClick={() => handleClick('theme-FFBE0B')}><span>FFBE0B</span></div>
                                             <div  style={{background: "rgb(251, 86, 7)"}} id='theme-FB5607' onClick={() => handleClick('theme-FB5607')}><span>FB5607</span></div>
                                             <div  style={{background: "rgb(255, 0, 110)"}} id='theme-FF006E' onClick={() => handleClick('theme-FF006E')}><span>FF006E</span></div>
                                             <div  style={{background: "rgb(131, 56, 236)"}} id='theme-8338EC' onClick={() => handleClick('theme-8338EC')}><span>8338EC</span></div>
                                             <div  style={{background: "rgb(58, 134, 255)"}} id='theme-3A86FF' onClick={() => handleClick('theme-3A86FF')}><span>3A86FF</span></div>
                                        </div>
                                        <div className="palette-card_colors">
                                             <div  style={{background: "rgb(88, 81, 35)"}} id='theme-585123' onClick={() => handleClick('theme-585123')}><span>585123</span></div>
                                             <div  style={{background: "rgb(238, 193, 112)"}} id='theme-EEC170' onClick={() => handleClick('theme-EEC170')}><span>EEC170</span></div>
                                             <div  style={{background: "rgb(242, 166, 90)"}} id='theme-F2A65A' onClick={() => handleClick('theme-F2A65A')}><span>F2A65A</span></div>
                                             <div  style={{background: "rgb(245, 133, 73)"}} id='theme-F58549' onClick={() => handleClick('theme-F58549')}><span>F58549</span></div>
                                             <div  style={{background: "rgb(119, 47, 26)"}} id='theme-772F1A' onClick={() => handleClick('theme-772F1A')}><span>772F1A</span></div>
                                        </div>
                                        <div className="palette-card_colors">
                                             <div  style={{background: "rgb(38, 70, 83)"}} id='theme-264653' onClick={() => handleClick('theme-264653')}><span>264653</span></div>
                                             <div  style={{background: "rgb(42, 157, 143)"}} id='theme-2A9D8F' onClick={() => handleClick('theme-2A9D8F')}><span>2A9D8F</span></div>
                                             <div  style={{background: "rgb(233, 196, 106)"}} id='theme-E9C46A' onClick={() => handleClick('theme-E9C46A')}><span>E9C46A</span></div>
                                             <div  style={{background: "rgb(244, 162, 97)"}} id='theme-F4A261' onClick={() => handleClick('theme-F4A261')}><span>F4A261</span></div>
                                             <div  style={{background: "rgb(231, 111, 81)"}} id='theme-E76F51' onClick={() => handleClick('theme-E76F51')}><span>E76F51</span></div>
                                        </div>
                                        <div className="palette-card_colors">
                                             <div  style={{background: "rgb(255, 153, 200)"}} id='theme-FF99C8' onClick={() => handleClick('theme-FF99C8')}><span>FF99C8</span></div>
                                             <div  style={{background: "rgb(252, 246, 189)"}} id='theme-FCF6BD' onClick={() => handleClick('theme-FCF6BD')}><span>FCF6BD</span></div>
                                             <div  style={{background: "rgb(208, 244, 222)"}} id='theme-D0F4DE' onClick={() => handleClick('theme-D0F4DE')}><span>D0F4DE</span></div>
                                             <div  style={{background: "rgb(169, 222, 249)"}} id='theme-A9DEF9' onClick={() => handleClick('theme-A9DEF9')}><span>A9DEF9</span></div>
                                             <div  style={{background: "rgb(228, 193, 249)"}} id='theme-E4C1F9' onClick={() => handleClick('theme-E4C1F9')}><span>E4C1F9</span></div>
                                        </div>
                                        <div className="palette-card_colors">
                                             <div  style={{background: "rgb(216, 140, 154)"}} id='theme-D88C9A' onClick={() => handleClick('theme-D88C9A')}><span>D88C9A</span></div>
                                             <div  style={{background: "rgb(242, 208, 169)"}} id='theme-F2D0A9' onClick={() => handleClick('theme-F2D0A9')}><span>F2D0A9</span></div>
                                             <div  style={{background: "rgb(241, 227, 211)"}} id='theme-F1E3D3' onClick={() => handleClick('theme-F1E3D3')}><span>F1E3D3</span></div>
                                             <div  style={{background: "rgb(153, 193, 185)"}} id='theme-99C1B9' onClick={() => handleClick('theme-99C1B9')}><span>99C1B9</span></div>
                                             <div  style={{background: "rgb(142, 125, 190)"}} id='theme-8E7DBE' onClick={() => handleClick('theme-8E7DBE')}><span>8E7DBE</span></div>
                                        </div>
                                        <p className="maincss">Banner Wizards</p>

                                        <div className="palette-card_colors">
                                                  <div className="singlebanner" onClick={() => handleClickBanners('one')}>Single Banner</div>
                                                  <div className='doublebanner' onClick={() => handleClickBanners('two')}>Double Banner</div>
                                             </div>

                                             <p className="maincss">Featured Cards</p>

                                        <div className="palette-card_colors">
                                                  <div className="singlebanner" onClick={() => handleClickrowfeatured('row6')}>Row 6 Ptoducts</div>
                                                  <div className='doublebanner' onClick={() => handleClickrowfeatured('row10')}>Row 10 Ptoducts</div>
                                             </div>


                                             <p className="maincss">Color Sets</p>

<div className="palette-card_colors">
          <div className="singlebanner" onClick={() => handleClickBanners('one')}>Color Set One</div>
          <div className='doublebanner' onClick={() => handleClickBanners('two')}>Color Set One</div>
     </div>
                                        
                                   </div>
                                   
          
                                   {/* <div className='buttons'>
                                        <ul>
                                             <li className='button' id='theme-blue' onClick={() => handleClick('theme-blue')}
                                             //onClick={() => setTheme('blue')}
                                             >
                                                  <div className='circle theme-blue'></div>
                                             </li>
                                             <li className='button' id='theme-gray' onClick={() => handleClick('theme-gray')}
                                             //onClick={() => setTheme('gray')}
                                             >
                                                  <div className='circle theme-gray'></div>
                                             </li>
                                             <li className='button' id='theme-green' onClick={() => handleClick('theme-green')}
                                             //</ul>onClick={() => setTheme('green')}
                                             >
                                                  <div className='circle theme-green'></div>
                                             </li>
                                             <li className='button' id='theme-red' onClick={() => handleClick('theme-red')}
                                             //onClick={() => setTheme('red')}
                                             >
                                                  <div className='circle theme-red'></div>
                                             </li>
                                             <li className='button' id='theme-orange' onClick={() => handleClick('theme-orange')}
                                             //</ul>onClick={() => setTheme('orange')}
                                             >
                                                  <div className='circle theme-orange'></div>
                                             </li>
                                             <li className='button' id='theme-skyblue' onClick={() => handleClick('theme-skyblue')}
                                             //onClick={() => setTheme('skyblue')}
                                             >
                                                  <div className='circle theme-skyblue'></div>
                                             </li>
                                        </ul>
                                   </div> */}

                                   {/* <p className="css-5cjz36">Primary Fonts</p>
             <div className='buttons'>
            <ul style={{display: "block"}}>
                <li className='button fonts' onClick={() => handleClickFonts('Source')}>
                     <div className='Source'>Source Sans Pro</div> 
                </li>
                <li className='button fonts' onClick={() => handleClickFonts('Roboto')}>
                     <div className='Roboto'>Roboto</div> 
                </li>
            </ul>
        </div> */}


                              </div>

                         </div>

                    </div>
               </div>
          </MenuStyled>
     )

}

{/* <nav className="social">
          <ul>
            <li><a href="https://www.facebook.com/bspgaminginstitute/" target="_blank">Facebook <img src="https://www.backstagepass.co.in/zgast/programs/fb.webp" srcset="https://www.backstagepass.co.in/zgast/programs/fb.webp 1400w, https://www.backstagepass.co.in/zgast/programs/fb.webp 900w, https://www.backstagepass.co.in/zgast/programs/fb.webp 600w, https://www.backstagepass.co.in/zgast/programs/fb.webp 300w" alt="Facebook" /></a></li>
            <li><a href="https://twitter.com/bsp_gaming/" target="_blank">Twitter <img src="https://www.backstagepass.co.in/zgast/programs/Twitter.webp" srcset="https://www.backstagepass.co.in/zgast/programs/Twitter.webp 1400w, https://www.backstagepass.co.in/zgast/programs/Twitter.webp 900w, https://www.backstagepass.co.in/zgast/programs/Twitter.webp 600w, https://www.backstagepass.co.in/zgast/programs/Twitter.webp 300w" alt="Twitter" /></a>
            </li>
            <li><a href="https://www.youtube.com/channel/UC8-3EcO9JQO8cRJklp8Gdvg" target="_blank">Youtube <img src="https://www.backstagepass.co.in/zgast/programs/youtube.webp" srcset="https://www.backstagepass.co.in/zgast/programs/youtube.webp 1400w, https://www.backstagepass.co.in/zgast/programs/youtube.webp 900w, https://www.backstagepass.co.in/zgast/programs/youtube.webp 600w, https://www.backstagepass.co.in/zgast/programs/youtube.webp 300w" alt="Youtube" /></a></li>
            <li><a href="https://www.instagram.com/backstagepass01/" target="_blank">Instagram <img src="https://www.backstagepass.co.in/zgast/programs/instagram.webp"srcset="https://www.backstagepass.co.in/zgast/programs/instagram.webp 1400w, https://www.backstagepass.co.in/zgast/programs/instagram.webp 900w, https://www.backstagepass.co.in/zgast/programs/instagram.webp 600w, https://www.backstagepass.co.in/zgast/programs/instagram.webp 300w" alt="Instagram"/></a></li>
            <li><a href="https://api.whatsapp.com/send/?phone=918008002794&text&app_absent=0" target="_blank">Whatsapp <img src="https://www.backstagepass.co.in/zgast/programs/Whatsapp.png"  srcset="https://www.backstagepass.co.in/zgast/programs/Whatsapp.png 1400w, https://www.backstagepass.co.in/zgast/programs/Whatsapp.png 900w, https://www.backstagepass.co.in/zgast/programs/Whatsapp.png 600w, https://www.backstagepass.co.in/zgast/programs/Whatsapp.png 300w" alt="Whatsapp"/></a></li>

          </ul>
        </nav> */}



const MenuStyled = styled.div`
.css-5cjz36 {
    margin: 0px 0px 0.625rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.15px;
    color: "rgba(76, 78, 100, 0.87);
    padding: 20px 20px 0px 20px;
}

    .buttons{
        
         ul{
            display: flex;
            justify-content: flex-start;
            padding: 10px 20px;
        }
        .button{
            cursor:pointer;
            margin-right:.2rem;
        }
        .fonts{
            color: #333;
            width: 100%;
            border: 1px solid #cdcdcd;
            margin-bottom: 12px;
            text-align: center;
        }
        .circle{
            width: 40px;
            height: 40px;
            display: flex;
            border-radius: 8px;
            cursor: pointer;
            -webkit-box-align: center;
            align-items: center;
            -webkit-box-pack: center;
            justify-content: center;
            margin: 0rem 0.375rem;
            color: "rgb(255, 255, 255);
            transition: box-shadow 0.25s ease 0s;
            background-color: var(--circle-colr);
            border:2px solid var(--border);
        }
    }
`;

export default ThemeMenu;