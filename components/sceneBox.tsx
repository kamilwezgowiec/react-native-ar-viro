import React from "react";
import { ViroARScene, ViroBox } from "@viro-community/react-viro";
import { useARContext } from "./arContext";

export const SceneBox = (): React.ReactElement => {
  const { width, height, depth } = useARContext();

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
