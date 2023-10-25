import React, {useState, useLayoutEffect} from 'react';
import {
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BLUE = '#007AFF';
const BLACK = '#000000';
const LENGTH = 6;

export default function ViewData() {
  const deleteIcon = '../assets/delete.png';
  const pdf = '../assets/pdf.png';
  const txt = '../assets/txt-file.png';
  const mp3 = '../assets/mp3.png';
  const file = '../assets/mp3.png';
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
      console.log('select image: ', selectedImages);
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
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 24,
            margin: 8,
            fontWeight: 'bold',
          }}>
          VIEW DATA LOCAL
        </Text>

        <FlatList
          data={selectedImages}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <View
              style={{
                marginBottom: 20,
                position: 'relative',
                flexDirection: 'column',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  alignSelf: 'flex-start',
                }}>
                {item.type === 'image/jpeg' || item.type === 'image/png' ? (
                  <Image
                    source={{uri: item.uri}}
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
                ) : item.type === 'text/plain'? (
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
                ) : item.type === 'audio/mpeg'? (
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
                ) : (
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
                  }}>
                  {item.name}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => removeImage(item)}
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
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
            </View>
          )}
        />
        <View style={styles.buttonContainer}>
          <Button color="#007AFF" onPress={pickDocument} title="Get Data" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8FF',
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
    margin: 10,
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
