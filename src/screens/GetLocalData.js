import React, { useState, useLayoutEffect } from 'react';
import {
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/getLocalData.style';

const BLUE = '#007AFF';
const BLACK = '#000000';
const LENGTH = 6;

export default function GetLocalData() {
  const deleteIcon = '../../assets/images/delete.png';
  const pdf = '../../assets/images/pdf.png';
  const txt = '../../assets/images/txt-file.png';
  const mp3 = '../../assets/images/mp3.png';
  const file = '../../assets/images/mp3.png';
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);

  async function pickDocument() {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        allowMultiSelection: true,
        quality: 1,
      });
      //   setSelectedImage(result);

      if (!selectedImages) {
        setSelectedImages(result);
      } else {
        setSelectedImages([...selectedImages, ...result]);
      }
      // console.log('select image: ', selectedImages);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // Người dùng đã hủy việc chọn tệp
      } else {
        throw err;
      }
    }
  }
  function removeImage(item) {
    const newList = selectedImages.filter(listItem => listItem !== item);
    setSelectedImages(newList);
  }

  const navigation = useNavigation();

  const handleNavigate = item => {
    // console.log(item)
    navigation.navigate('ViewLocalData', item);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.buttonContainer}>
          <Button color="#007AFF" onPress={pickDocument} title="Get Data" />
        </View>

        <FlatList
          data={selectedImages}
          scrollEnabled={true}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.itemContainer}
              key={index}
              onPress={() => handleNavigate(item)}>
              <View
                style={styles.itemType}>
                {item.type === 'image/jpeg' || item.type === 'image/png' ? (
                  <Image
                    source={{ uri: item.uri }}
                    style={styles.itemImg}
                  />
                ) : item.type === 'application/pdf' ? (
                  <Image
                    source={require(pdf)}
                    style={styles.itemImg}
                  />
                ) : item.type === 'text/plain' ? (
                  <Image
                    source={require(txt)}
                    style={styles.itemImg}
                  />
                ) : item.type === 'audio/mpeg' ? (
                  <Image
                    source={require(mp3)}
                    style={styles.itemImg}
                  />
                ) : (
                  <Image
                    source={require(file)}
                    style={styles.itemImg}
                  />
                )}

                <Text
                  style={styles.itemName}>
                  {item.name}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => removeImage(item)}
                style={styles.btnDel}>
                <Image
                  source={require(deleteIcon)}
                  style={styles.iconImg}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
