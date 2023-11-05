import { Pressable, Animated, GestureResponderEvent, StyleSheet } from 'react-native'
import React, { useState } from 'react'

export default function AnimatedButton({
  children,
  onClick,
  isCircle,
}: {
  children: React.ReactNode
  onClick?: (event: GestureResponderEvent) => void
  isCircle?: boolean
}) {
  const [scaleValue] = useState(new Animated.Value(1)) // Initialize the animated value

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95, // Scale down to 95% on press
      useNativeDriver: true,
    }).start()
  }

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1, // Restore to the original scale
      useNativeDriver: true,
    }).start()
  }

  const buttonStyle = isCircle ? styles.button : styles.none

  return (
    <Pressable onPress={onClick} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      <Animated.View style={[buttonStyle, { transform: [{ scale: scaleValue }] }]}>
        {children}
      </Animated.View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 140,
    height: 140,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'pink',
    color: 'pink',
    borderWidth: 2,
  },
  none: {},
})
