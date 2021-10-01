import React, { createContext, useContext, useState } from "react";

export type StateFn = (value: number) => void;
type GetDimensions = Record<"width" | "height" | "depth", number>;
type SetDimensions = {
  [Property in keyof GetDimensions as `set${Capitalize<Property>}`]: StateFn;
};
type ARContextState = GetDimensions & SetDimensions;

const ARContext = createContext<ARContextState | undefined>(undefined);
const defaultSize = 0.1;
export const sizeIncrement = 0.05;

interface ARContextComponentProps {
  children: React.ReactNode;
}

const boundsFn = (setState: StateFn): StateFn => {
  return (value: number) =>
    setState(Math.round(Math.max(defaultSize, value) * 100) / 100);
};

export const useARContext = (): ARContextState => {
  const context = useContext(ARContext);

  if (context === undefined) {
    throw new Error("useARContext must be within ARContextComponent");
  }

  return context;
};

export const ARContextProvider = ({
  children,
}: ARContextComponentProps): React.ReactElement => {
  const [width, setWidth] = useState(defaultSize);
  const [height, setHeight] = useState(defaultSize);
  const [depth, setDepth] = useState(defaultSize);

  return (
    <ARContext.Provider
      value={{
        width,
        setWidth: boundsFn(setWidth),
        height,
        setHeight: boundsFn(setHeight),
        depth,
        setDepth: boundsFn(setDepth),
      }}
    >
      {children}
    </ARContext.Provider>
  );
};
