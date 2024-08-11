import { useState } from 'react';
import { PhoneAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from 'app/firebase/firebaseConfig';

export function usePhoneAuth() {
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const sendVerificationCode = async (phoneNumber: string) => {
    try {
      const provider = new PhoneAuthProvider(auth);
      const verificationId = await provider.verifyPhoneNumber(
        phoneNumber,
        // @ts-ignore: This is actually supported in React Native
        window.recaptchaVerifier
      );
      setVerificationId(verificationId);
      setError(null);
    } catch (err) {
      setError('Failed to send verification code');
      console.error(err);
    }
  };

  const confirmCode = async (code: string) => {
    if (!verificationId) {
      setError('No verification ID');
      return;
    }
    try {
      const credential = PhoneAuthProvider.credential(verificationId, code);
      await signInWithCredential(auth, credential);
      setError(null);
    } catch (err) {
      setError('Invalid code');
      console.error(err);
    }
  };

  return { sendVerificationCode, confirmCode, error };
}
