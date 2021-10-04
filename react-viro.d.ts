declare module "@viro-community/react-viro" {
  export const ViroBox: any;
  export const ViroMaterials: any;
  export const ViroARSceneNavigator: any;
  export const ViroARScene: any;

  export interface ViroARSceneNavigatorElement {
    arSceneNavigator: {
      resetARSession: (resetTracking: boolean, removeAnchors: boolean) => void;
    };
  }
}
