import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  homeScreen: {
    backgroundColor: "white",
    flex: 1,
  },
  clickToSpawn: {
    fontSize: 30,
    color: "white",
  },
  logo: {
    marginBottom: 20,
  },
  controls: {
    backgroundColor: "white",
    height: "20%",
    padding: 15,
  },
  controlsRow: {
    flexWrap: "wrap",
    alignItems: "flex-start",
    flexDirection: "row",
  },
  totalVolume: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 10,
  },
});
