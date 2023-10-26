import React, { useState, useLayoutEffect } from 'react';
import {
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';


const BLUE = '#007AFF';
const BLACK = '#000000';
const LENGTH = 6;

export default function GetLocalData() {
  const deleteIcon = '../assets/delete.png';
  const pdf = '../assets/pdf.png';
  const doc = '../assets/doc.png';
  const ppt = '../assets/ppt.png';
  const txt = '../assets/txt-file.png';
  const mp3 = '../assets/mp3.png';
  const file = '../assets/file.png';
  const video = '../assets/video.png';
  const xls = '../assets/xls-file.png';
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
  
  const navigation = useNavigation()

  const handleNavigate = (item) => {
    // console.log(item)
    navigation.navigate('ViewLocalData', item)
  } 

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
              style={{
                marginBottom: 20,
                position: 'relative',
                flexDirection: 'column',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: '#ddd',
                borderWidth: 1,
                paddingVertical: 5,
                borderRadius: 8
              }}
              key={index}
              onPress={() => handleNavigate(item)}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  alignSelf: 'flex-start',
                }}>
                {item.type === 'image/jpeg' || item.type === 'image/png' ? (
                  <Image
                    source={{ uri: item.uri }}
                    style={{
                      paddingVertical: 4,
                      marginLeft: 12,
                      width: 80,
                      height: 80,
                      borderRadius: 12,
                    }}
                  />
                ) : item.type === 'application/pdf' ? (
                  <Image
                    source={require(pdf)}
                    style={{
                      paddingVertical: 4,
                      marginLeft: 12,
                      width: 80,
                      height: 80,
                      borderRadius: 12,
                    }}
                  />
                ) : item.type === 'text/plain' ? (
                  <Image
                    source={require(txt)}
                    style={{
                      paddingVertical: 4,
                      marginLeft: 12,
                      width: 80,
                      height: 80,
                      borderRadius: 12,
                    }}
                  />
                ) : (item.type === 'audio/mpeg' || item.type === 'audio/flac' || item.type === 'audio/amr') ? (
                  <Image
                    source={require(mp3)}
                    style={{
                      paddingVertical: 4,
                      marginLeft: 12,
                      width: 80,
                      height: 80,
                      borderRadius: 12,
                    }}
                  />
                ) : item.type === 'video/mp4' ? (
                  <Image
                    source={require(video)}
                    style={{
                      paddingVertical: 4,
                      marginLeft: 12,
                      width: 80,
                      height: 80,
                      borderRadius: 12,
                    }}
                  />
                ) : item.type === 'application/vnd.ms-excel' ? (
                  <Image
                    source={require(xls)}
                    style={{
                      paddingVertical: 4,
                      marginLeft: 12,
                      width: 80,
                      height: 80,
                      borderRadius: 12,
                    }}
                  />
                ): item.type === 'application/msword' ? (
                  <Image
                    source={require(doc)}
                    style={{
                      paddingVertical: 4,
                      marginLeft: 12,
                      width: 80,
                      height: 80,
                      borderRadius: 12,
                    }}
                  />
                ): item.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation' ? (
                  <Image
                    source={require(ppt)}
                    style={{
                      paddingVertical: 4,
                      marginLeft: 12,
                      width: 80,
                      height: 80,
                      borderRadius: 12,
                    }}
                  />
                ): (
                  <Image
                    source={require(file)}
                    style={{
                      paddingVertical: 4,
                      marginLeft: 12,
                      width: 80,
                      height: 80,
                      borderRadius: 12,
                    }}
                  />
                )}

                <Text
                  style={{
                    top: 30,
                    color: '#000',
                    marginLeft: 10,
                    fontSize: 16,
                    fontWeight: 500
                  }}>
                  {item.name}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => removeImage(item)}
                style={{
                  position: 'absolute',
                  top: 5,
                  right: 5,
                  backgroundColor: '#C5C7C7',
                  borderRadius: 12,
                  padding: 5,
                }}>
                <Image
                  source={require(deleteIcon)}
                  style={{
                    paddingVertical: 4,
                    width: 20,
                    height: 20,
                    borderRadius: 12,
                  }}
                />
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF',
    paddingBottom: 50
  },
  textInput: {
    height: 55,
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 18,
    backgroundColor: '#fff',
    borderWidth: 0.5,
  },
  inputContainer: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonContainer: {
    padding: 15,
  },
  textStyle: {
    alignSelf: 'center',
    color: '#D3D3D3',
    marginTop: 5,
  },
  errorStyle: {
    alignSelf: 'center',
    color: '#ff0000',
    marginBottom: 5,
    fontSize: 12,
  },
});
