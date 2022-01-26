import React, { useRef, useState } from "react";
import {
  Animated,
  Pressable,
  Dimensions,
  Easing,
  TouchableOpacity,
} from "react-native";
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
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function App() {
  /*   const [up, setUp] = useState(false);;
  // useRef 랜더링시 값이 초기화되는걸 막기 위해
  const POSITION = useRef(new Animated.ValueXY({ x: 0, y: 300 })).current;
  const toggleUp = () => setUp((prev) => !prev);
  const moveUp = () => {
  // decay: 점차적으로 정지, spring: 바운스, timing: easing functions.
  // timing을 가장 많이 사용함! option이 많고 애니메이션을 다양하게 조작 가능!
  Animated.timing(POSITION, {
    toValue: up ? 300 : -300,
    // backgroundColor 와 몇가지 것들은 native(기기)에서 지원을 안해줘서
    // false로 작성해주어야 함
    useNativeDriver: false,
    duration: 1000,
  }).start(toggleUp);
  };
 */
  const POSITION = useRef(
    new Animated.ValueXY({
      x: -SCREEN_WIDTH / 2 + 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    })
  ).current;
  const topLeft = Animated.timing(POSITION, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    },
    useNativeDriver: false,
  });
  const bottomLeft = Animated.timing(POSITION, {
    toValue: {
      x: -SCREEN_WIDTH / 2 + 100,
      y: SCREEN_HEIGHT / 2 - 100,
    },
    useNativeDriver: false,
  });
  const bottomRight = Animated.timing(POSITION, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: SCREEN_HEIGHT / 2 - 100,
    },
    useNativeDriver: false,
  });
  const topRight = Animated.timing(POSITION, {
    toValue: {
      x: SCREEN_WIDTH / 2 - 100,
      y: -SCREEN_HEIGHT / 2 + 100,
    },
    useNativeDriver: false,
  });

  const moveUp = () => {
    Animated.loop(
      Animated.sequence([bottomLeft, bottomRight, topRight, topLeft])
    ).start();
  };
  // interpolate => inputRange와 outputRange 의 length가 같아야 함
  // Y의 값이 -300일 때 opacity 값이 1이 되고 Y의 값이 0일 때 opacity 값이 0이 된다
  // 즉 input과 output index에 따라 값이 주어짐! very awesome!!
  const borderRadius = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: [100, 0],
  });
  const bgColor = POSITION.y.interpolate({
    inputRange: [-300, 300],
    outputRange: ["rgb(255, 99, 71)", "rgb(71, 166, 255)"],
  });

  // 그냥 console.log() 하면 안되고 POSITION.addListener(() => {console.log()}) 식으로 사용해야함
  POSITION.addListener(() => {
    console.log("Y VALUE", POSITION);
    console.log("borderRadius VALUE", borderRadius);
  });
  return (
    <Container>
      <Pressable onPress={moveUp}>
        <AnimatedBox
          style={{
            borderRadius,
            backgroundColor: bgColor,
            transform: [...POSITION.getTranslateTransform()],
          }}
        />
      </Pressable>
    </Container>
  );
}
