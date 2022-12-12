import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./theme/GlobalStyles";
import { IoAddOutline } from "react-icons/io5";
import ThemeSelector from "./ThemeSelector";
import { shallowEqual, useSelector } from "react-redux";
import Dialog from "./Dialog";
import CreateThemeContent from "./CreateThemeContent";

const Container = styled.div`
  margin: 5px auto 5px auto;
`;

function App({
  allThemes,
  theme,
  themeLoaded,
  selectedTheme,
  setSelectedTheme,
  setShowThemes
}) {
  const themeState = useSelector(state => state.themeReducer, shallowEqual);

  console.log("setShowThemes", setShowThemes);

  const [showDialog, setShowDialog] = useState(false);
  const [newTheme, setNewTheme] = useState();

  //  useEffect(() => {
  //     WebFont.load({
  //       google: {
  //         families: getFonts()
  //       }
  //     });
  //   });

  const manageDialog = () => {
    setShowDialog(!showDialog);
  };

  const createTheme = newTheme => {
    setShowDialog(false);
    setNewTheme(newTheme);
  };

  const isMobileState = useSelector(
    state => state.mainReducer.isMobile,
    shallowEqual
  );

  console.log("SELECTED THEME ", selectedTheme);

  console.log("THEME SATE TESTINGGGG", themeState);

  return (
    <>
      <div className="customizer-section d-flex justify-content-between align-items-center">
        <div>
          <h4
            className="text-uppercase mb-0"
            style={{ color: "#000", fontFamily: "'Poppins', sans-serif" }}
          >
            Theme Customizer{" "}
          </h4>
          <small style={{ color: "#000", fontFamily: "'Poppins', sans-serif" }}>
            Customize &amp; Preview in Real Time
          </small>
        </div>
        <button
          className="btn"
          onClick={manageDialog}
          style={{
            background: "#000",
            color: "#fff",
            padding: "8px 25px",
            fontFamily: "Roboto",
            fontSize: "14px",
            borderRadius: "24px"
          }}
        >
          {isMobileState ? (
            <IoAddOutline style={{ fontSize: "21px" }} />
          ) : (
            "Create New Theme"
          )}
        </button>
        {/* <button onClose={() => setShowThemes(true)}>Close</button>
        <div
            
            className="text-white text-3xl cursor-pointer"
          >
            <MdClose />
          </div> */}
        <button onClick={() => setShowThemes(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ color: "#000" }}
            width="18px"
            height="18px"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="cursor-pointer feather feather-x"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      {themeLoaded && (
        <ThemeProvider theme={selectedTheme}>
          <GlobalStyles />
          <Container style={{ fontFamily: selectedTheme?.font }}>
            {/* <h1>Theming System</h1> */}

            <Dialog
              header="Create New Theme"
              body={<CreateThemeContent create={createTheme} />}
              open={showDialog}
              callback={manageDialog}
            />
            <ThemeSelector
              setter={setSelectedTheme}
              newTheme={newTheme}
              allThemes={allThemes}
            />
          </Container>
        </ThemeProvider>
      )}
    </>
  );
}

export default App;
