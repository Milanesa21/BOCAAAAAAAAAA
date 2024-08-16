import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Animated, {
  useSharedValue,
  withDelay,
  withTiming,
  useAnimatedStyle
} from 'react-native-reanimated';

const DURATION = 1000;
const DELAY = 500;

const text = ['Ri', 'Ve', 'R'];

export default function App() {
  const [isShown, setShown] = useState(false);
  const [bgColor, setBgColor] = useState('blue')

  const opacity1 = useSharedValue(0);
  const opacity2 = useSharedValue(0);
  const opacity3 = useSharedValue(0);

  const translateY1 = useSharedValue(-100)
  const translateY2 = useSharedValue(-100)
  const translateY3 = useSharedValue(-100)

  const  titleY= useSharedValue(-100);

  useEffect(() => {
    titleY.value = withTiming(0, {duration:DURATION});
  }, []);

  const show = () => {
    if (isShown) {
      opacity3.value = withDelay(0 * DELAY, withTiming(0, { duration: DURATION }));
      opacity2.value = withDelay(1 * DELAY, withTiming(0, { duration: DURATION }));
      opacity1.value = withDelay(2 * DELAY, withTiming(0, { duration: DURATION }));
      translateY3.value = withTiming(-100, { duration: DURATION})
      translateY2.value = withTiming(-100, { duration: DURATION})
      translateY1.value = withTiming(-100, { duration: DURATION})
      titleY.value = withTiming(-100, {duration: DURATION});
      setBgColor('blue');
    } else {
      opacity1.value = withDelay(0 * DELAY, withTiming(1, { duration: DURATION }));
      opacity2.value = withDelay(1 * DELAY, withTiming(1, { duration: DURATION }));
      opacity3.value = withDelay(2 * DELAY, withTiming(1, { duration: DURATION }));
      translateY1.value = withTiming(0, { duration: DURATION });
      translateY2.value = withDelay(DELAY, withTiming(0, { duration: DURATION }));
      translateY3.value = withDelay(2 * DELAY, withTiming(0, { duration: DURATION }))
      titleY.value = withTiming(0, {duration: DURATION});
      setBgColor('red');
    }

    setShown(!isShown);
  };

  const titleStyle = useAnimatedStyle(() =>{
    return {
      opacity: withTiming(isShown ? 0 :1, {duration: DURATION}),
      transform: [{ translateY: titleY.value}]
    };
  });

  const animatedTextStyle = (translateYValue) => useAnimatedStyle(() =>{
    return {
      opacity: withTiming(isShown ? 1 : 0, {duration: DURATION}),
      transform: [{ translateY: translateYValue.value}]
    }
  })

  const containerStyle = {
    ...styles.container,
    backgroundColor: bgColor
  };

  return (
    <Animated.View style={containerStyle}>
      <Animated.View style={[styles.titleContainer, titleStyle]}>
        <Text style={styles.title}>BOCAAAAAAAAA</Text>
      </Animated.View>
      <View style={styles.text}>
        <Animated.Text style={[styles.label, animatedTextStyle(translateY1)]}>
          {text[0]}
        </Animated.Text>
        <Animated.Text style={[styles.label, animatedTextStyle(translateY2)]}>
          {text[1]}
        </Animated.Text>
        <Animated.Text style={[styles.label, animatedTextStyle(translateY3)]}>
          {text[2]}
        </Animated.Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={show}>
        <Text style={styles.buttonText}>{isShown ? 'Cambiar de equipo' : 'Cambiar de equipo'}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'red',
 },
 titleContainer:{
  position: 'absolute',
  top: 50,
 },
 title: {
  fontSize :32,
  color: 'gold',
  fontWeight: 'bold'
 },
 text: {
flexDirection: 'row',
 },
 label: {
color: 'white',
fontSize: 42,
textAlign: 'center',
fontWeight: 'bold',
marginRight: 8,
 },
 button:{
  position: 'absolute',
  bottom: 50,
  backgroundColor: 'gold',
  padding: 15,
  borderRadius: 8,
 }, buttonText: {
  color: 'white',
  fontSize: 18,
  fontWeight: 'bold',
 },
});
