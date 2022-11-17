import { Dimensions } from "react-native";

var screenWidth = Dimensions.get("window").width; //full width
var screenHeight = Dimensions.get("window").height; //full height

export const variable = {
  maxWidth: screenWidth,
  maxHeight: screenHeight,

  globalPadding: 20,

  /* STANDARD */
  primary: "#19826D",
  secondary: "rgba(22, 99, 94, 1)",
  secondary50: "#ffffff",
  white: "#ffffff",
  black: "#000000",
  lightgray: "#CDCDCD",
  gray: "#A0A0A0",
  alert: "crimson",
  modalBlack: "#00000050",
  modalWhite: "#ffffff50",
  blue: "dodgerblue",
  red: "red",
  green: "green",
  whitesmoke: "whitesmoke",
  realGray: "gray",

  //! NEW
  background: "#fff",
  border: "lightgray",
  primaryIcon: "#2eb0b4",
  whiteIcon: "#ffffff",
  border: "lightgray",
  boxShadow: "#000000",
  title: "#2eb0b4",
  btn: "#2eb0b4",
  btnText: "#ffffff",
  whiteText: "#ffffff",
  blackText: "#000000",

  smFontSize: 12,
  mdFontSize: 15,
  lgFontSize: 17,
  xlFontSize: 20,
  xxlFontSize: 22,
  btnFontSize: 17,
  iconFontSize: 20,

  //! OLD - TO BE REMOVED
  /** Below are a list that eventually will need to be removed entirely */
  highlight: "#45cbd0",
  lightShade: "#abdfe1",
  darkShade: "#1b696c",
  silver: "#E6E6E6",
  /* WHITE/BLACK */
  light: "#ffffff",
  dark: "#000000",
};