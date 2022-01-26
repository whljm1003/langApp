import React, { useRef, useState } from "react";
import { Animated, Easing, Pressable, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const Box = styled.View`
  background-color: tomato;
  width: 200px;
  height: 200px;
`;
const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function App() {
  const [up, setUp] = useState(false);
  // useRef 랜더링시 값이 초기화되는걸 막기 위해
  const Y_POSITION = useRef(new Animated.Value(300)).current;
  const toggleUp = () => setUp((prev) => !prev);
  const moveUp = () => {
    // decay: 점차적으로 정지, spring: 바운스, timing: easing functions.
    // timing을 가장 많이 사용함! option이 많고 애니메이션을 다양하게 조작 가능!
    Animated.timing(Y_POSITION, {
      toValue: up ? 300 : -300,
      useNativeDriver: true,
      duration: 1000,
    }).start(toggleUp);
  };
  // interpolate => inputRange와 outputRange 의 length가 같아야 함
  // Y의 값이 -300일 때 opacity 값이 1이 되고 Y의 값이 0일 때 opacity 값이 0이 된다
  // 즉 input과 output index에 따라 값이 주어짐! very awesome!!
  const opacity = Y_POSITION.interpolate({
    inputRange: [-300, 0, 300],
    outputRange: [1, 0.5, 1],
  });
  const borderRadius = Y_POSITION.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });

  // 그냥 console.log() 하면 안되고 Y_POSITION.addListener(() => {console.log()}) 식으로 사용해야함
  Y_POSITION.addListener(() => {
    console.log("Y VALUE", Y_POSITION);
    console.log("opacity VALUE", opacity);
    console.log("borderRadius VALUE", borderRadius);
  });
  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{
            opacity,
            borderRadius,
            transform: [{ translateY: Y_POSITION }],
          }}
        />
      </Pressable>
    </Container>
  );
}
