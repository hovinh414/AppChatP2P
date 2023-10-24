import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from './src/sceens/Home';
import Chat from './src/sceens/Chat';
import NearbyMessages from './src/sceens/NearbyMessages';
// import NearbyChat from './src/screens/NearbyChat';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeScreen() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Chat" component={Chat}/>
    </Stack.Navigator>
  );
}

function WifiP2p() {
  return(
    <Stack.Navigator>
      <Stack.Screen name="Wifi P2P" component={NearbyMessages}/>
      {/* <Stack.Screen name="NearbyChat" component={NearbyChat}/> */}
    </Stack.Navigator>
  )
}

export default function App(){
  return(
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen  name="Home Page" component={HomeScreen}/>
        <Drawer.Screen name="Chat Wifi P2P" component={WifiP2p}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}