import React, { createContext, useState } from "react";

const dimensions = ["width", "height", "depth"] as const;
const defaultSize = 0.1;
export const sizeIncrement = 0.05;

export type StateFn = (value: number) => void;
type GetDimensions = Record<typeof dimensions[number], number>;
type SetDimensions = {
  [Property in keyof GetDimensions as `set${Capitalize<Property>}`]: StateFn;
};
type ARContextState = GetDimensions & SetDimensions;

export const ARContext = createContext({} as ARContextState);

interface ARContextComponentProps {
  children: React.ReactNode;
}

const boundsFn = (setState: StateFn): StateFn => {
  return (value: number) =>
    setState(Math.round(Math.max(0.1, value) * 100) / 100);
};

export const ARContextComponent = ({
  children,
}: ARContextComponentProps): React.ReactElement => {
  const value = {} as ARContextState;

  for (const getStateName of dimensions) {
    const setStateName = `set${
      getStateName.charAt(0).toUpperCase() + getStateName.slice(1)
    }` as keyof SetDimensions;
    const [state, setState] = useState(defaultSize);

    value[getStateName] = state;
    value[setStateName] = boundsFn(setState);
  }

  return <ARContext.Provider value={value}>{children}</ARContext.Provider>;
};
