import React from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import phone from '../../../assets/images/phone.png'
import styles from './deviceCard.style'

const DeviceCard = ({device}) => {
  return (
    <TouchableOpacity style={styles.deviceCard}>
      <Image source={phone} style={styles.phoneIcon}/>

      <Text style={styles.deviceName}>{device.deviceName}</Text>
    </TouchableOpacity>
  )
}

export default DeviceCard
