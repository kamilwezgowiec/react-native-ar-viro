import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  homeScreen: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
    justifyContent: "center", //Centered horizontally
    alignItems: "center", //Centered vertically
    flex: 1,
  },
  logo: {
    marginBottom: 20,
  },
  controls: {
    height: "20%",
  },
  controlsRow: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});
