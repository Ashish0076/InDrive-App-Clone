import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import HomeScreen from './src/HomeScreen';
import LoginScreen from './src/LoginScreen';
import {SafeAreaView, Text, StyleSheet, ImageBackground} from 'react-native';

const Stack = createNativeStackNavigator();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthenticationStatus = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for 2 seconds
      const user = auth().currentUser;
      setIsLoggedIn(!!user);
      setIsLoading(false);
    };

    checkAuthenticationStatus();
  }, []);

  return (
    <NavigationContainer>
      {isLoading ? (
        <ImageBackground
          source={require('../InDriveApp/src/Assets/Loading.jpg')}
          style={styles.imageBackground} />
      ) : (
        <Stack.Navigator>
          {isLoggedIn ? (
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
          ) : (
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}
            />
          )}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  imageBackground: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});

export default App;
