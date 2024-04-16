import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Alert} from 'react-native';

function logInWithPhone() {
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [confirm, setConfirm] = useState(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return () => subscriber(); // Unsubscribe on unmount
  // }, []);

  // const onAuthStateChanged = user => {
  //   if (user) {
  //     setIsLoggedIn(true);
  //     // Handle successful login
  //   }
  // };

  const signInWithPhoneNumber = async phoneNumber => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
      console.log(confirm)
      setIsCodeSent(true);
    } catch (error) {
      console.error('Error sending SMS:', error);
      Alert.alert("Unable to send the code");
    }
  };

  const confirmCode = async () => {
    try {
      await confirm.confirm(verificationCode);
      // Code verification successful, navigate to the homepage
      navigation.navigate('Home'); // Assuming 'navigation' is passed as a prop or obtained through useNavigation hook
    } catch (error) {
      console.error('Invalid code:', error);
      // Handle error by displaying an alert
      Alert.alert('Error', 'Invalid code');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isCodeSent ? (
        <View style={styles.centerContent}>
          <TextInput
            style={styles.input}
            placeholder="Enter verification code"
            keyboardType="number-pad"
            onChangeText={setVerificationCode}
          />
          <TouchableOpacity style={styles.button} onPress={confirmCode}>
            <Text style={styles.buttonText}>Verify Code</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.centerContent}>
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
            onPress={() =>
              phoneNumber.length === 10
                ? signInWithPhoneNumber(`${countryCode} ${phoneNumber}`)
                : Alert.alert('Enter valid Phone Number')
            }>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>Or login with</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Continue with Google</Text>
          </TouchableOpacity>
          <Text style={styles.link}>
            Joining our app means you agree with our Terms of Use and Privacy
            Policy.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#1C1F25',
  },
  centerContent: {
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 20,
    color: '#a2a2a3',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: '#303944',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#303944',
  },
  countryCodeInput: {
    marginRight: 10,
    maxWidth: 70,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#69DD00',
    borderRadius: 10,
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  orText: {
    marginVertical: 10,
    color: '#a2a2a3',
  },
  link: {
    color: '#a2a2a3',
  },
});

export default logInWithPhone;
