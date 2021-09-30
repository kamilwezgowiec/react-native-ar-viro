import React, { useState, useContext } from "react";
import { ViroARSceneNavigator } from "@viro-community/react-viro";
import { Button, Image, View } from "react-native";
import { styles } from "./styles";
import { ARContext } from "./arContext";
import { SceneBox } from "./sceneBox";
import { Control } from "./control";
import { ViroMaterials } from "@viro-community/react-viro";
import { ARContextComponent } from "./arContext";

ViroMaterials.createMaterials({
  box: {
    diffuseColor: "rgba(134, 69, 234, 0.8)",
  },
  white_sphere: {
    diffuseColor: "rgb(255,0,0)",
  },
});

const ARApp = (): React.ReactElement => {
  const [isAr, setAr] = useState(false);
  const { width, setWidth, height, setHeight, depth, setDepth } =
    useContext(ARContext);

  return (
    <>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: SceneBox,
        }}
        style={styles.f1}
      />
      {isAr && (
        <View style={styles.controls}>
          <Control label="Width" size={width} setSize={setWidth} />
          <Control label="Height" size={height} setSize={setHeight} />
          <Control label="Depth" size={depth} setSize={setDepth} />
        </View>
      )}
      {!isAr && (
        <View style={styles.homeScreen}>
          <Image style={styles.logo} source={require("../assets/logo.png")} />
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

export const App = (): React.ReactElement => {
  return (
    <ARContextComponent>
      <ARApp />
    </ARContextComponent>
  );
};
