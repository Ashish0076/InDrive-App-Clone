import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';




function logInWithPhone() {
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => subscriber(); // Unsubscribe on unmount
  }, []);

  const onAuthStateChanged = (user) => {
    if (user) {
      setIsLoggedIn(true);
      // Handle successful login
    }
  };

  const signInWithPhoneNumber = async (phoneNumber) => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      console.error('Error sending SMS:', error);
      // Handle error
    }
  };

  const confirmCode = async () => {
    try {
      await confirm.confirm(verificationCode);
      // Code verification successful, handle login or other actions here
      console.log("soja bhai")
    } catch (error) {
      console.error('Invalid code:', error);
      // Handle error
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoggedIn ? (
        <Text>Logged In</Text>
      ) : (
        <>
          <Text style={styles.title}>Join us via phone number</Text>
          <Text style={styles.subtitle}>
            We'll text a code to verify your phone
          </Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.countryCodeInput]}
              value={countryCode}
              onChangeText={setCountryCode}
              keyboardType="number-pad"
            />
            <TextInput
              style={styles.input}
              placeholder="Phone number"
              keyboardType="number-pad"
              onChangeText={setPhoneNumber}
            />
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => signInWithPhoneNumber(`${countryCode} ${phoneNumber}`)} 
          >
            <Text style={styles.buttonText}>Send Code</Text>
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Enter verification code"
            keyboardType="number-pad"
            onChangeText={setVerificationCode}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={confirmCode}
          >
            <Text style={styles.buttonText}>Verify Code</Text>
          </TouchableOpacity>
          <Text style={styles.orText}>Or login with</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Continue with Google</Text>
          </TouchableOpacity>
          <Text style={styles.link}>
            Joining our app means you agree with our Terms of Use and Privacy
            Policy
          </Text>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  countryCodeInput: {
    marginRight: 10,
    maxWidth: 70,
  },
  button: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#007bff',
    borderRadius: 5,
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  orText: {
    marginVertical: 10,
  },
  link: {
    color: '#007bff',
  },
};

export default logInWithPhone;

