import {StyleSheet, Text, View, SafeAreaView, FlatList} from 'react-native';
import React from 'react';
import ChatCard from '../../common/ChatCard';
import {images} from '../../../constants';
import styles from './chat.style';

const Chat = () => {
  const list = [
    {img: images.doc, name: 'Hieu'},
    {img: images.file, name: 'Vinh'},
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Chats</Text>
      </View>
      <View>
        <FlatList
          style
          data={list}
          renderItem={item => ChatCard(item)}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};

export default Chat;
