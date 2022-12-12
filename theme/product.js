import styled from "styled-components";

export const ColorArray = {
  Gray: "#E0E0E0",
  Black: "#000000",
  White: "#FFFFFF",
  Red: "#FF0000",
  Green: "#8eb27a",
  Blue: "#0000FF",
  Yellow: "#FFFF00",
  Cyan: "#00FFFF",
  Magenta: "#FF00FF",
  Silver: "#C0C0C0",
  Maroon: "#800000",
  Olive: "#808000",
  Purple: "#800080",
  Teal: "#008080",
  Navy: "#000080",
  Orange: "#FFA500",
  Lime: "#8eb27a",
  Aqua: "#00FFFF",
  Turquoise: "#40E0D0",
  LightBlue: "#ADD8E6",
  Royal_Blue: "#4169E1",
  Wine_Red: "#B22222",
  Light_Gray: "#D3D3D3",
  Dark_Gray: "#A9A9A9",
  Light_Silver: "#C0C0C0",
  Dark_Silver: "#808080",
  Light_Gold: "#FFD700",
  Dark_Gold: "#FFD700",
  Light_Brown: "#A52A2A",
  Dark_Brown: "#8B4513",
  Dark_Blue: "#0000FF",
  Light_Pink: "#FFC0CB",
  Dark_Pink: "#FF1493",
  Light_Red: "#FF0000",
  Pink: "#FFC0CB"
  //   BLK: "#000000",
  //   BLU: "#0000FF",
  //   BRW: "#8B4513",
  //   BUR: "#800020",
  //   CLR: "#FCFCFF",
  //   COP: "#B87333",
  //   DGR: "#006400",
  //   FBL: "#0055A4",
  //   GLD: "#D8AD53",
  //   GRN: "#008000",
  //   GRY: "#808080",
  //   IVO: "#FFFFF0",
  //   LBL: "#ADD8E6",
  //   LGR: "#D3D3D3",
  //   NAT: "#C4B289",
  //   NVY: "#000052",
  //   OLV: "#8D8B55",
  //   ORG: "#FF8C00",
  //   OWH: "#F9F5EC",
  //   PCH: "#FA9A85",
  //   PNK: "#FF80BF",
  //   PRP: "#800080",
  //   RED: "#CF0E11",
  //   ROY: "#1866E1",
  //   SAG: "#B1BCA0",
  //   SAL: "#FA8072",
  //   SGR: "#20B2AA",
  //   SLV: "#C0C0C0",
  //   STN: "#918E85",
  //   TAN: "#D2B48C",
  //   TEL: "#008080",
  //   WHT: "#FFFFFF",
  //   YEL: "#F2E30C",
  //   DKT: "#046286"
};

export const ColorItem = styled.button`
  height: 42px;
  width: 42px !important;
  border-radius: 50%;
  // border: 2px solid props => props.color ? ColorArray[props.color] : props.selected ?"#0077AC" : "#F5F5F5"};
  border: 2px solid
    ${props => (props.selected ? "#0077AC" : "rgba(238,241,239,1)")};
  margin: 5px 5px 5px 5px;
  padding: 0px;
  position: relative;
  background: ${props =>
    props.color ? ColorArray[props.color] || "none" : "none"};
  color: ${props => "#121212"};
  
  &:hover {
    background: ${props =>
      props.color ? ColorArray[props.color] || "none" : "#F5F5F5"};
  }
  
  }
`;

export const ColorSpan = styled.span`
  font-weight: ${props => (props.selected ? "bold" : "normal")} ;
  color: ${props => "#121212"};
  font-size:12px;
`;
