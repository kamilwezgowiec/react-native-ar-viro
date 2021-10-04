import React, { useState } from "react";
import {
  ViroARSceneNavigator,
  ViroARSceneNavigatorElement,
} from "@viro-community/react-viro";
import { Button, Image, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { SceneBox } from "./sceneBox";
import { Control } from "./control";
import { ViroMaterials } from "@viro-community/react-viro";
import { ARContextProvider, useARContext } from "./arContext";

ViroMaterials.createMaterials({
  box: {
    diffuseColor: "rgba(134, 69, 234, 0.8)",
  },
});

const ARApp = (): React.ReactElement => {
  const [isAr, setAr] = useState(false);
  const {
    width,
    setWidth,
    height,
    setHeight,
    depth,
    setDepth,
    spawned,
    setSpawned,
  } = useARContext();
  const totalVolume = +(width * height * depth).toFixed(4);
  const navigator = React.useRef<ViroARSceneNavigatorElement>(null);

  React.useEffect(() => {
    if (spawned && navigator.current) {
      navigator.current.arSceneNavigator.resetARSession(true, true);
    }
  }, [spawned]);

  return (
    <>
      <ViroARSceneNavigator
        ref={navigator}
        autofocus={true}
        initialScene={{
          scene: SceneBox,
        }}
      />
      {isAr && (
        <>
          {spawned && (
            <View style={styles.controls}>
              <View style={styles.controlsRow}>
                <View>
                  <Control label="Width" size={width} setSize={setWidth} />
                  <Control label="Height" size={height} setSize={setHeight} />
                  <Control label="Depth" size={depth} setSize={setDepth} />
                </View>
                <View style={styles.totalVolume}>
                  <View style={{ alignItems: "flex-end" }}>
                    <Text>Total volume {totalVolume} m</Text>
                  </View>
                  <View style={{ alignItems: "flex-start" }}>
                    <Text style={{ fontSize: 10 }}>3</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          {!spawned && (
            <View style={styles.container}>
              <TouchableOpacity onPress={() => setSpawned(true)}>
                <Text style={styles.clickToSpawn}>Tap to spawn a cube</Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
      {!isAr && (
        <View style={{ ...styles.container, ...styles.homeScreen }}>
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
    <ARContextProvider>
      <ARApp />
    </ARContextProvider>
  );
};
