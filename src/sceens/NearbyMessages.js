import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  StyleSheet,
  Button,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {
  initialize,
  startDiscoveringPeers,
  stopDiscoveringPeers,
  unsubscribeFromPeersUpdates,
  unsubscribeFromThisDeviceChanged,
  unsubscribeFromConnectionInfoUpdates,
  subscribeOnConnectionInfoUpdates,
  subscribeOnThisDeviceChanged,
  subscribeOnPeersUpdates,
  cancelConnect,
  createGroup,
  removeGroup,
  getAvailablePeers,
  getConnectionInfo,
  getGroupInfo,
} from 'react-native-wifi-p2p';
import { PermissionsAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';


export default function NearbyMessages() {

  const [devices, setDevices] = useState([]);
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#fff',
        height: 75,
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerTitleAlign: 'center', 
    })
  })

  useEffect(() => {
    const initWifiP2P = async () => {
      try {
        await initialize();
  
        const permissions = [
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
          PermissionsAndroid.PERMISSIONS.NEARBY_WIFI_DEVICES,
        ];
  
        const granted = await PermissionsAndroid.requestMultiple(permissions, {
          title: 'Access to wi-fi P2P mode',
          message: 'Access to Wi-Fi P2P mode requires these permissions',
        });
  
        if (
          granted[PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          granted[PermissionsAndroid.PERMISSIONS.NEARBY_WIFI_DEVICES] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('You can use the p2p mode');
        } else {
          console.log('Permission denied: p2p mode will not work');
        }
  
        subscribeOnPeersUpdates(handleNewPeers);
        subscribeOnConnectionInfoUpdates(handleNewInfo);
        subscribeOnThisDeviceChanged(handleThisDeviceChanged);
  
        try {
          await startDiscoveringPeers();
          console.log('Starting of discovering was successful');
        } catch (err) {
          console.log(err, 'at startDiscovering');
        }
      } catch (e) {
        console.error(e);
      }
    };
  
    initWifiP2P();
  
    return () => {
      unsubscribeFromConnectionInfoUpdates(handleNewInfo);
      unsubscribeFromPeersUpdates(handleNewPeers);
      unsubscribeFromThisDeviceChanged(handleThisDeviceChanged);
    };
  }, []);
  

  const handleNewInfo = (info) => {
    // console.log('OnConnectionInfoUpdated', info);
  };

  const handleNewPeers = ({ devices }) => {
    // console.log('OnPeersUpdated', devices);
    setDevices(devices);
  };

  const handleThisDeviceChanged = (groupInfo) => {
    // console.log('THIS_DEVICE_CHANGED_ACTION', groupInfo);
  };

  const connectToDevice = (device) => {
    console.log('Connect to: ', device.deviceAddress);
    navigation.navigate('NearbyChat', { isOwner: false, deviceAddress: device.deviceAddress })
  };

  const onCancelConnect = () => {
    cancelConnect()
      .then(() => console.log('cancelConnect', 'Connection successfully canceled'))
      .catch(err => console.error('cancelConnect', 'Something gone wrong. Details: ', err));
  };

  const onCreateGroup = () => {
    createGroup()
      .then(() => console.log('Group created successfully!'))
      .catch(err => console.error('Something gone wrong. Details: ', err));
  };

  const onRemoveGroup = () => {
    removeGroup()
      .then(() => console.log('Currently you don\'t belong to group!'))
      .catch(err => console.error('Something gone wrong. Details: ', err));
  };

  const onStopInvestigation = () => {
    stopDiscoveringPeers()
      .then(() => console.log('Stopping of discovering was successful'))
      .catch(err => console.error(`Something is gone wrong. Maybe your WiFi is disabled? Error details`, err));
  };

  const onStartInvestigate = () => {
    startDiscoveringPeers()
      .then(status => console.log('startDiscoveringPeers', `Status of discovering peers: ${status}`))
      .catch(err => console.error(`Something is gone wrong. Maybe your WiFi is disabled? Error details: ${err}`));
  };

  const onGetAvailableDevices = () => {
    onStartInvestigate();
    getAvailablePeers()
      .then(peers => {
        console.log(peers)
        // setDevices(peers)
      });
  };

  const onGetConnectionInfo = () => {
    getConnectionInfo()
      .then(info => console.log('getConnectionInfo', info));
  };

  const onGetGroupInfo = () => {
    getGroupInfo()
      .then(info => console.log('getGroupInfo', info));
  };

  return (
    <ScrollView>
      <View style={{margin: 10}}>
      <Button
        color='#007AFF'
        onPress={onGetAvailableDevices}
        title="Search Peers"
      />
      </View>
      <Text style={{alignSelf: 'center', fontSize: 17, margin: 15, fontWeight: 'bold'}}>SEARCHING NEARBY PEERS...</Text>
      {devices !== undefined && devices.map(d => {
        return (
          <View style={{marginLeft: 15, marginRight: 15, marginBottom: 10}} key={Math.random(1000).toString()}>
             <Button  color='red' title={d.deviceName} onPress={() => connectToDevice(d)} />
          </View>
        );
      })}
      <View style={{margin: 10, marginTop: 30}}>
      <Button color='#007AFF' title='Create Group' onPress={() => { navigation.navigate('NearbyChat', { isOwner: true, deviceAddress: "" }) }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});