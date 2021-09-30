import React, { useState, createContext, useContext } from "react";
import {
  ViroARScene,
  ViroARSceneNavigator,
  ViroMaterials,
  ViroBox,
} from "@viro-community/react-viro";
import { View, Text, Button, StyleSheet, Image } from "react-native";

ViroMaterials.createMaterials({
  box: {
    diffuseColor: "rgba(134, 69, 234, 0.8)",
  },
  white_sphere: {
    diffuseColor: "rgb(255,0,0)",
  },
});

const dimensions = ["width", "height", "depth"] as const;

type GetDimensions = Record<typeof dimensions[number], number>;
type SetDimensions = {
  [Property in keyof GetDimensions as `set${Capitalize<Property>}`]: (
    value: GetDimensions[Property],
  ) => void;
};
type ARContextState = GetDimensions & SetDimensions;

const ARContext = createContext({} as ARContextState);
const sizeIncrement = 0.05;

interface ARContextComponentProps {
  children: React.ReactNode;
}

const ARContextComponent = ({
  children,
}: ARContextComponentProps): React.ReactElement => {
  const value = {} as ARContextState;

  for (const getStateName of dimensions) {
    const setStateName = `set${
      getStateName.charAt(0).toUpperCase() + getStateName.slice(1)
    }` as keyof SetDimensions;
    const [state, setState] = useState(0.1);

    value[getStateName] = state;
    value[setStateName] = (value) =>
      setState(Math.round(Math.max(0.1, value) * 100) / 100);
  }

  return <ARContext.Provider value={value}>{children}</ARContext.Provider>;
};

const ARComponent = () => {
  const { width, height, depth } = useContext(ARContext);

  return (
    <ViroARScene>
      <ViroBox
        dragType="FixedToWorld"
        onDrag={() => {}}
        position={[0, -1, -1]}
        scale={[width, height, depth]}
        height={2}
        length={2}
        width={2}
        materials={["box"]}
      />
    </ViroARScene>
  );
};

const ARApp = () => {
  const [isAr, setAr] = useState(false);
  const { width, setWidth, height, setHeight, depth, setDepth } =
    useContext(ARContext);

  return (
    <>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: ARComponent,
        }}
        style={styles.f1}
      />
      {isAr && (
        <View style={styles.controls}>
          <View style={styles.controlsRow}>
            <Text style={{ color: "white", marginTop: 10 }}>Width {width}</Text>
            <Button
              onPress={() => {
                setWidth(width + sizeIncrement);
              }}
              title="+"
              color="#8645EA"
            />
            <Button
              onPress={() => {
                setWidth(width - sizeIncrement);
              }}
              title="-"
              color="#8645EA"
            />
          </View>
          <View style={styles.controlsRow}>
            <Text style={{ color: "white", marginTop: 10 }}>
              Height {height}
            </Text>
            <Button
              onPress={() => {
                setHeight(height + sizeIncrement);
              }}
              title="+"
              color="#8645EA"
            />
            <Button
              onPress={() => {
                setHeight(height - sizeIncrement);
              }}
              title="-"
              color="#8645EA"
            />
          </View>
          <View style={styles.controlsRow}>
            <Text style={{ color: "white", marginTop: 10 }}>depth {depth}</Text>
            <Button
              onPress={() => {
                setDepth(depth + sizeIncrement);
              }}
              title="+"
              color="#8645EA"
            />
            <Button
              onPress={() => {
                setDepth(depth - sizeIncrement);
              }}
              title="-"
              color="#8645EA"
            />
          </View>
        </View>
      )}
      {!isAr && (
        <View style={styles.homeScreen}>
          <Image style={styles.logo} source={require("./logo.png")} />
          <Button
            onPress={() => setAr(true)}
            title="Go to AR"
            color="#8645EA"
          />
        </View>
      )}
    </>
  );
};

export default () => {
  return (
    <ARContextComponent>
      <ARApp />
    </ARContextComponent>
  );
};

const styles = StyleSheet.create({
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
