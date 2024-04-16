import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, Image, PermissionsAndroid } from 'react-native';
import MapView from 'react-native-maps';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Geolocation from '@react-native-community/geolocation'; // Import Geolocation

function HomeScreen() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    // Check and request location permission
    async function requestLocationPermission() {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Get user's current location
          Geolocation.getCurrentPosition(
            position => {
              setUserLocation(position.coords);
            },
            error => {
              console.log(error);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
          );
        } else {
          console.log('Location permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }

    requestLocationPermission();

    // Clean up
    return () => {
      Geolocation.clearWatch();
    };
  }, []);

  const data = [
    { id: '1', text: 'Ride A/C',  imageSrc: require('./Assets/Car_Image.jpg')},
    { id: '2', text: 'Ride',  imageSrc: require('./Assets/Car_Image.jpg') },
    { id: '3', text: 'Autorickshaw',  imageSrc: require('./Assets/Car_Image.jpg') },
    { id: '4', text: 'Moto',  imageSrc: require('./Assets/Car_Image.jpg') },
    { id: '5', text: 'Ride+Toll',  imageSrc: require('./Assets/Car_Image.jpg') },
    { id: '6', text: 'Outstation',  imageSrc: require('./Assets/Car_Image.jpg') },
    { id: '7', text: 'Freight',  imageSrc: require('./Assets/Car_Image.jpg') },
    { id: '8', text: 'Delivery',  imageSrc: require('./Assets/Car_Image.jpg') },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image source={item.imageSrc} style={styles.logoImage} />
      <Text style={styles.itemText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={{color: 'black', flex: 1, textAlign: 'center', justifyContent: 'center'}}> This is an map container</Text>
      {/* <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      /> */}
      <View style={styles.box}>
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          <Text style={styles.locationText}> <Ionicons name="location-sharp" size={24} color="white" /> {userLocation ? `${userLocation.latitude}, ${userLocation.longitude}` : 'Loading...'}</Text>
          <TextInput placeholder='From' style={styles.inputBox} />
          <TextInput placeholder='To' style={styles.inputBox} />
          <TouchableOpacity style={styles.findDriverBtn}>
            <Text style={styles.findDriverText}>Find a Driver</Text>
          </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  box: {
    backgroundColor: '#1C1F25',
    height: '45%',
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20, 
  },
  item: {
    borderRadius: 10,
    padding: 15, 
    marginHorizontal: 5,
    marginVertical: 10, 
    alignItems: 'center',
    justifyContent: 'center', 
  },
  itemText: {
    color: 'white',
  },
  locationText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10, 
  },
  inputBox: {
    backgroundColor: '#303944',
    borderRadius: 10,
    marginTop: 10, 
    paddingHorizontal: 15, 
    height: 40,
  },
  findDriverBtn: {
    backgroundColor: '#69DD00',
    borderRadius: 10,
    marginTop: 10, 
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  findDriverText: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold', 
  },
  logoImage: {
    height: '100%',
    width: 100,
  }
});

export default HomeScreen;
