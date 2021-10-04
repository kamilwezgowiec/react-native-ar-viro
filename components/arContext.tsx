import React, { createContext, useContext, useState } from "react";

export type StateFn = (value: number) => void;
type GetDimensions = Record<"width" | "height" | "depth", number>;
type SetDimensions = {
  [Property in keyof GetDimensions as `set${Capitalize<Property>}`]: StateFn;
};

interface ARContextState extends GetDimensions, SetDimensions {
  spawned: boolean;
  setSpawned: (spawned: boolean) => void;
}

const ARContext = createContext<ARContextState | undefined>(undefined);
const defaultSize = 0.3;
const minimumSize = 0.1;
const maximumSize = 1.5;
export const sizeIncrement = 0.05;

interface ARContextComponentProps {
  children: React.ReactNode;
}

const useDimensionState = (): [number, (size: number) => void] => {
  const [size, setSize] = useState(defaultSize);

  return [
    size,
    (value: number) =>
      setSize(+Math.max(minimumSize, Math.min(maximumSize, value)).toFixed(2)),
  ];
};

export const useARContext = (): ARContextState => {
  const context = useContext(ARContext);

  if (!context) {
    throw new Error("useARContext must be within ARContextComponent");
  }

  return context;
};

export const ARContextProvider = ({
  children,
}: ARContextComponentProps): React.ReactElement => {
  const [width, setWidth] = useDimensionState();
  const [height, setHeight] = useDimensionState();
  const [depth, setDepth] = useDimensionState();
  const [spawned, setSpawned] = useState(false);

  return (
    <ARContext.Provider
      value={{
        width,
        setWidth,
        height,
        setHeight,
        depth,
        setDepth,
        spawned,
        setSpawned,
      }}
    >
      {children}
    </ARContext.Provider>
  );
};
