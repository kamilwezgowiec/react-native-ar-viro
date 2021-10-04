import React from "react";
import { ViroARScene, ViroBox } from "@viro-community/react-viro";
import { useARContext } from "./arContext";

enum MoveState {
  Start = 1,
  Move = 2,
  End = 3,
}

export const SceneBox = (): React.ReactElement => {
  const { width, setWidth, height, setHeight, depth, setDepth, spawned } =
    useARContext();
  const [rotation, setRotation] = React.useState(0);

  const handleDrag = (): void => {
    /* empty function required */
  };

  const handlePinch = (state: MoveState, scaleFactor: number): void => {
    if (state !== MoveState.Move) {
      return;
    }

    setWidth(width * scaleFactor);
    setHeight(height * scaleFactor);
    setDepth(depth * scaleFactor);
  };

  const handleRotate = (moveState: MoveState, rotationFactor: number): void => {
    if (moveState === MoveState.Move) {
      setRotation(rotationFactor);
    }
  };

  return (
    <ViroARScene>
      {spawned && (
        <ViroBox
          dragType="FixedToWorld"
          onDrag={handleDrag}
          onPinch={handlePinch}
          onRotate={handleRotate}
          position={[0, -1, -1]}
          rotation={[0, rotation, 0]}
          height={height}
          length={depth}
          width={width}
          materials={["box"]}
        />
      )}
    </ViroARScene>
  );
};
