import React, { useState, useEffect } from 'react';
import { YStack, Input, Button, Text, XStack } from '@t4/ui/src';
import { usePhoneAuth } from '../hooks/usePhoneAuth';
import { auth } from 'app/firebase/firebaseConfig';

export function PhoneAuthScreen() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmationCode, setConfirmationCode] = useState('');
  const { sendVerificationCode, confirmCode, error } = usePhoneAuth();
  const [step, setStep] = useState('phone');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // @ts-ignore: This is actually supported in React Native
      window.recaptchaVerifier = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
          callback: () => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
        },
        auth
      );
    }
  }, []);

  const handleSendCode = async () => {
    await sendVerificationCode(phoneNumber);
    setStep('code');
  };

  const handleConfirmCode = async () => {
    await confirmCode(confirmationCode);
  };

  return (
    <YStack space="$4" padding="$4" maxWidth={400} margin="auto">
      <Text fontSize="$6" fontWeight="bold" textAlign="center">
        Phone Authentication
      </Text>

      {step === 'phone' ? (
        <>
          <Input
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
          <Button onPress={handleSendCode} theme="active">
            Send Code
          </Button>
        </>
      ) : (
        <>
          <Input
            placeholder="Confirmation Code"
            value={confirmationCode}
            onChangeText={setConfirmationCode}
            keyboardType="number-pad"
          />
          <Button onPress={handleConfirmCode} theme="active">
            Confirm Code
          </Button>
        </>
      )}

      {error && (
        <Text color="$red10" textAlign="center">
          {error}
        </Text>
      )}

      <XStack id="recaptcha-container" />
    </YStack>
  );
}
