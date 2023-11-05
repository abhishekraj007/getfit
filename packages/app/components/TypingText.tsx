import React, { useEffect, useState } from 'react'
import { SizableText } from 'tamagui'

export default function TypingText({ content = '' }) {
  const [text, setText] = useState('')
  const typingSpeed = 50 // Adjust the speed as needed

  useEffect(() => {
    setText('')
    // const content = content;
    let currentIndex = 0
    // let currentIndex = Platform.OS === "web" ? -1 : 0;

    const typingInterval = setInterval(() => {
      if (currentIndex < content.length) {
        setText((prevText) => prevText + content[currentIndex])
        currentIndex++
      } else {
        clearInterval(typingInterval)
      }
    }, 1000 / typingSpeed)

    return () => {
      clearInterval(typingInterval)
    }
  }, [content])

  return (
    <SizableText textAlign="center" theme="alt2" size="$4" height={'$8'}>
      {text}
    </SizableText>
  )
}
