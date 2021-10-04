import React from "react";
import { Button, Text, View } from "react-native";
import { sizeIncrement, StateFn } from "./arContext";
import { styles } from "./styles";

interface ControlProps {
  label: string;
  size: number;
  setSize: StateFn;
}

export const Control = ({
  label,
  size,
  setSize,
}: ControlProps): React.ReactElement => {
  return (
    <View style={styles.controlsRow}>
      <Text style={{ marginTop: 10 }}>
        {label} {size}m
      </Text>
      <Button
        onPress={() => setSize(size + sizeIncrement)}
        title="+"
        color="#8645EA"
      />
      <Button
        onPress={() => setSize(size - sizeIncrement)}
        title="-"
        color="#8645EA"
      />
    </View>
  );
};
