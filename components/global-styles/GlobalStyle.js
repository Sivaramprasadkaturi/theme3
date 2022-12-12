import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

@import url("https://fonts.googleapis.com/css2?family=Noto+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap");

    *{
        padding: 0px;
        margin: 0px;
    }
    :root{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #fff;
        --bg-topmenu: #fff;
        --primary-color: #212B36;
        --primary-color-hover: #CE3C59;
        --second-color: #fff;
        --second-color-hover: #CE3C59;
        --border: #CE3C59;
        --btn-color: #DE9D9A;
        --btn-hover: #CE3C59;
        --footer-bg: #FFF0EE;
        --content-bg: #FFF4F2;
        --circle-colr: #CE3C59;
    }
    .theme-pink{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #fff;
        --bg-topmenu: #fff;
        --primary-color: #212B36;
        --primary-color-hover: #CE3C59;
        --second-color: #fff;
        --second-color-hover: #CE3C59;
        --border: #CE3C59;
        --btn-color: #DE9D9A;
        --btn-hover: #CE3C59;
        --footer-bg: #FFF0EE;
        --content-bg: #FFF4F2;
        --circle-colr: #CE3C59;
        
    }
    .theme-gray{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #fff;
        --bg-topmenu: #fff;
        --primary-color: #35363A;
        --primary-color-hover: #35363A;
        --second-color: #fff;
        --second-color-hover: #35363A;
        --border: #35363A;
        --btn-color: #35363A;
        --btn-hover: #35363A;
        --footer-bg: #FCFCFC;
        --content-bg: #F4F4F4;
        --circle-colr: #35363A;
        
    }
    .theme-green{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #fff;
        --bg-topmenu: #fff;
        --primary-color: #051E38;
        --primary-color-hover: #28584B;
        --second-color: #FFF0EE;
        --second-color-hover: #28584B;
        --border: #28584B;
        --btn-color: #28584B;
        --btn-hover: #28584B;
        --footer-bg: #F7F7F7;
        --content-bg: #F7F7F7;
        --circle-colr: #28584B;
        
    }
    .theme-blue{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #fff;
        --bg-topmenu: #fff;
        --primary-color: #091236;
        --primary-color-hover: #0C1B54;
        --second-color: #F2F2F6;
        --second-color-hover: #0C1B54;
        --border: #0C1B54;
        --btn-color: #0C1B54;
        --btn-hover: #0C1B54;
        --footer-bg: #F2F2F6;
        --content-bg: #F2F2F6;
        --circle-colr: #0C1B54;
       
    }
    .theme-orange{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #fff;
        --bg-topmenu: #fff;
        --primary-color: #212B36;
        --primary-color-hover: #ff3d00;
        --second-color: #fbe9e7;
        --second-color-hover: #ff5722;
        --border: #ff5722;
        --btn-color: #ff5722;
        --btn-hover: #ff5722;
        --footer-bg: #ffccbc;
        --content-bg: #ffccbc;
        --circle-colr: #ff5722;
        
    }
    .theme-FFBE0B{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #fff;
        --bg-topmenu: #fff;
        --primary-color: #212B36;
        --primary-color-hover: #FFBE0B;
        --second-color: #fbe9e7;
        --second-color-hover: #ff5722;
        --border: #FFBE0B;
        --btn-color: #FFBE0B;
        --btn-hover: #FFBE0B;
        --footer-bg: #fff8e1;
        --content-bg: #fff8e1;
        --circle-colr: #FFBE0B;        
    }
    .theme-06D6A0{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #fff;
        --bg-topmenu: #fff;
        --primary-color: #212B36;
        --primary-color-hover: #06D6A0;
        --second-color: #e0f2f1;
        --second-color-hover: #ff5722;
        --border: #06D6A0;
        --btn-color: #06D6A0;
        --btn-hover: #06D6A0;
        --footer-bg: #b2dfdb;
        --content-bg: #e0f2f1;
        --circle-colr: #06D6A0;    
    }
    .theme-118AB2{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #fff;
        --bg-topmenu: #fff;
        --primary-color: #212B36;
        --primary-color-hover: #118AB2;
        --second-color: #e0f2f1;
        --second-color-hover: #ff5722;
        --border: #118AB2;
        --btn-color: #118AB2;
        --btn-hover: #118AB2;
        --footer-bg: #bbdefb;
        --content-bg: #e3f2fd;
        --circle-colr: #118AB2;       
    }
    .theme-073B4C{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #fff;
        --bg-topmenu: #fff;
        --primary-color: #212B36;
        --primary-color-hover: #073B4C;
        --second-color: #e0f2f1;
        --second-color-hover: #ff5722;
        --border: #073B4C;
        --btn-color: #073B4C;
        --btn-hover: #073B4C;
        --footer-bg: #c5cae9;
        --content-bg: #e8eaf6;
        --circle-colr: #073B4C;        
    }
    .theme-585123{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #fff;
        --bg-topmenu: #fff;
        --primary-color: #212B36;
        --primary-color-hover: #585123;
        --second-color: #eeede9;
        --second-color-hover: #ff5722;
        --border: #585123;
        --btn-color: #585123;
        --btn-hover: #585123;
        --footer-bg: #cccabd;
        --content-bg: #dddcd3;
        --circle-colr: #585123;        
    }
    .theme-EEC170{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #fff;
        --bg-topmenu: #fff;
        --primary-color: #212B36;
        --primary-color-hover: #EEC170;
        --second-color: #fdf8f0;
        --second-color-hover: #ff5722;
        --border: #EEC170;
        --btn-color: #EEC170;
        --btn-hover: #EEC170;
        --footer-bg: #fbf2e2;
        --content-bg: #fdf8f0;
        --circle-colr: #EEC170;        
    }




    .theme-F2A65A{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #fff;
        --bg-topmenu: #fff;
        --primary-color: #212B36;
        --primary-color-hover: #F2A65A;
        --second-color: #fdf6ee;
        --second-color-hover: #ff5722;
        --border: #F2A65A;
        --btn-color: #F2A65A;
        --btn-hover: #F2A65A;
        --footer-bg: #fcedde;
        --content-bg: #fdf6ee;
        --circle-colr: #F2A65A;        
    }
    .theme-F58549{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #fff;
        --bg-topmenu: #fff;
        --primary-color: #212B36;
        --primary-color-hover: #F58549;
        --second-color: #ffebdf;
        --second-color-hover: #ff5722;
        --border: #F58549;
        --btn-color: #F58549;
        --btn-hover: #F58549;
        --footer-bg: #ffd6c0;
        --content-bg: #ffebdf;
        --circle-colr: #F58549;        
    }
    .theme-772F1A{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #fff;
        --bg-topmenu: #fff;
        --primary-color: #212B36;
        --primary-color-hover: #772F1A;
        --second-color: #f1eae8;
        --second-color-hover: #ff5722;
        --border: #772F1A;
        --btn-color: #772F1A;
        --btn-hover: #772F1A;
        --footer-bg: #e3d5d1;
        --content-bg: #f1eae8;
        --circle-colr: #772F1A;            
    }
    .theme-D88C9A {
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #fff;
        --bg-topmenu: #fff;
        --primary-color: #212B36;
        --primary-color-hover: #D88C9A;
        --second-color: #fbf3f4;
        --second-color-hover: #ff5722;
        --border: #D88C9A;
        --btn-color: #D88C9A;
        --btn-hover: #D88C9A;
        --footer-bg: #f1d5da;
        --content-bg: #fbf3f4;
        --circle-colr: #D88C9A;        
    }
    .theme-F2D0A9{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #fff;
        --bg-topmenu: #fff;
        --primary-color: #212B36;
        --primary-color-hover: #F2D0A9;
        --second-color: #FDFAF6;
        --second-color-hover: #ff5722;
        --border: #F2D0A9;
        --btn-color: #F2D0A9;
        --btn-hover: #F2D0A9;
        --footer-bg: #FCF5ED;
        --content-bg: #FDFAF6;
        --circle-colr: #F2D0A9;       
    }





    .theme-AB47BC{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #fff;
        --bg-topmenu: #fff;
        --primary-color: #212B36;
        --primary-color-hover: #AB47BC;
        --second-color: #f6ecf8;
        --second-color-hover: #ff5722;
        --border: #AB47BC;
        --btn-color: #AB47BC;
        --btn-hover: #AB47BC;
        --footer-bg: #eedaf1;
        --content-bg: #f6ecf8;
        --circle-colr: #AB47BC;         
    }
    .theme-99C1B9{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #fff;
        --bg-topmenu: #fff;
        --primary-color: #212B36;
        --primary-color-hover: #99C1B9;
        --second-color: #f4f8f8;
        --second-color-hover: #ff5722;
        --border: #99C1B9;
        --btn-color: #99C1B9;
        --btn-hover: #99C1B9;
        --footer-bg: #eaf2f1;
        --content-bg: #f4f8f8;
        --circle-colr: #99C1B9;            
    }
    .theme-8E7DBE{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #fff;
        --bg-topmenu: #fff;
        --primary-color: #212B36;
        --primary-color-hover: #8E7DBE;
        --second-color: #f3f2f8;
        --second-color-hover: #ff5722;
        --border: #8E7DBE;
        --btn-color: #8E7DBE;
        --btn-hover: #8E7DBE;
        --footer-bg: #e8e5f2;
        --content-bg: #f3f2f8;
        --circle-colr: #8E7DBE;      
    }
    .theme-F58549{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #F58549;
        --bg-topmenu: #F58549;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #F58549;
        --border: #F58549;
        --btn-color: #F58549;
        --circle-colr: #F58549;
        --main-color:#F58549;        
    }
    .theme-772F1A{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #772F1A;
        --bg-topmenu: #772F1A;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #772F1A;
        --border: #772F1A;
        --btn-color: #772F1A;
        --circle-colr: #772F1A;
        --main-color:#772F1A;        
    }



    .theme-264653{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #264653;
        --bg-topmenu: #264653;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #264653;
        --border: #264653;
        --btn-color: #264653;
        --circle-colr: #264653;
        --main-color:#264653;        
    }
    .theme-2A9D8F{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #2A9D8F;
        --bg-topmenu: #2A9D8F;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #2A9D8F;
        --border: #2A9D8F;
        --btn-color: #2A9D8F;
        --circle-colr: #2A9D8F;
        --main-color:#2A9D8F;        
    }
    .theme-E9C46A{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #E9C46A;
        --bg-topmenu: #E9C46A;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #E9C46A;
        --border: #E9C46A;
        --btn-color: #E9C46A;
        --circle-colr: #E9C46A;
        --main-color:#E9C46A;        
    }
    .theme-F4A261{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #F4A261;
        --bg-topmenu: #F4A261;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #F4A261;
        --border: #F4A261;
        --btn-color: #F4A261;
        --circle-colr: #F4A261;
        --main-color:#F4A261;        
    }
    .theme-E76F51{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #E76F51;
        --bg-topmenu: #E76F51;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #E76F51;
        --border: #E76F51;
        --btn-color: #E76F51;
        --circle-colr: #E76F51;
        --main-color:#E76F51;        
    }




    .theme-FF99C8{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #FF99C8;
        --bg-topmenu: #FF99C8;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #FF99C8;
        --border: #FF99C8;
        --btn-color: #FF99C8;
        --circle-colr: #FF99C8;
        --main-color:#FF99C8;        
    }
    .theme-FCF6BD{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #FCF6BD;
        --bg-topmenu: #FCF6BD;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #FCF6BD;
        --border: #FCF6BD;
        --btn-color: #FCF6BD;
        --circle-colr: #FCF6BD;
        --main-color:#FCF6BD;        
    }
    .theme-D0F4DE{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #D0F4DE;
        --bg-topmenu: #D0F4DE;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #D0F4DE;
        --border: #D0F4DE;
        --btn-color: #D0F4DE;
        --circle-colr: #D0F4DE;
        --main-color:#D0F4DE;        
    }
    .theme-A9DEF9{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #A9DEF9;
        --bg-topmenu: #A9DEF9;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #A9DEF9;
        --border: #A9DEF9;
        --btn-color: #A9DEF9;
        --circle-colr: #A9DEF9;
        --main-color:#A9DEF9;        
    }
    .theme-E4C1F9{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #E4C1F9;
        --bg-topmenu: #E4C1F9;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #E4C1F9;
        --border: #E4C1F9;
        --btn-color: #E4C1F9;
        --circle-colr: #E4C1F9;
        --main-color:#E4C1F9;        
    }






    .theme-D88C9A{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #D88C9A;
        --bg-topmenu: #D88C9A;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #D88C9A;
        --border: #D88C9A;
        --btn-color: #D88C9A;
        --circle-colr: #D88C9A;
        --main-color:#D88C9A;        
    }
    .theme-F2D0A9{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #F2D0A9;
        --bg-topmenu: #F2D0A9;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #F2D0A9;
        --border: #F2D0A9;
        --btn-color: #F2D0A9;
        --circle-colr: #F2D0A9;
        --main-color:#F2D0A9;        
    }
    .theme-F1E3D3{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #F1E3D3;
        --bg-topmenu: #F1E3D3;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #EF476F;
        --border: #F1E3D3;
        --btn-color: #F1E3D3;
        --circle-colr: #F1E3D3;
        --main-color:#F1E3D3;        
    }
    .theme-99C1B9{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #99C1B9;
        --bg-topmenu: #99C1B9;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #99C1B9;
        --border: #99C1B9;
        --btn-color: #99C1B9;
        --circle-colr: #99C1B9;
        --main-color:#99C1B9;        
    }
    .theme-8E7DBE{
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #8E7DBE;
        --bg-topmenu: #8E7DBE;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #8E7DBE;
        --border: #8E7DBE;
        --btn-color: #8E7DBE;
        --circle-colr: #8E7DBE;
        --main-color:#8E7DBE;        
    }










































    .Source{
        --font-family: Poppins;
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #666cff;
        --bg-topmenu: #666cff;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #666cff;
        --border: #666cff;
        --btn-color: #F2F6FF;
        --circle-colr: #666cff;
        --main-color:#666cff;
    }
    .Roboto{
        --font-family: Poppins;
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #6d788d;
        --bg-topmenu: #6d788d;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #6d788d;
        --border: #6d788d;
        --btn-color: #F2F6FF;
        --circle-colr: #6d788d;
        --main-color:#6d788d;
    }
    .Open{
        --font-family: Poppins;
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #72e128;
        --bg-topmenu: #72e128;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #72e128;
        --border: #72e128;
        --btn-color: #F2F6FF;
        --circle-colr: #72e128;
        --main-color:#72e128;
    }
    .Raleway{
        --font-family: Poppins;
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #ff4d49;
        --bg-topmenu: #ff4d49;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #ff4d49;
        --border: #ff4d49;
        --btn-color: #F2F6FF;
        --circle-colr: #ff4d49;
        --main-color:#ff4d49;
    }
    .Dancing{
        --font-family: Poppins;
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #fdb528;
        --bg-topmenu: #fdb528;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #fdb528;
        --border: #fdb528;
        --btn-color: #F2F6FF;
        --circle-colr: #fdb528;
        --main-color:#fdb528;
    }
    .Pompiere{
        --font-family: Poppins;
        --bg-header: #fff;
        --bg-body: #fff;
        --bg-menu: #26c6f9;
        --bg-topmenu: #26c6f9;
        --text1: #000;
        --text2:#fff;
        --text3:#f00;
        --boldColr: #26c6f9;
        --border: #26c6f9;
        --btn-color: #F2F6FF;
        --circle-colr: #26c6f9;
        --main-color:#26c6f9;   
    }

    
`;

export default GlobalStyle;