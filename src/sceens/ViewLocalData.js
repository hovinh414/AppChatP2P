import React, {useState, useEffect} from 'react'
import { View, Text, Image } from 'react-native'
import RNFS from 'react-native-fs'

const ViewLocalData = ({ route }) => {
    const content = route.params
    // console.log(content)
    const [fileData, setFileData] = useState()

    const readFile = async () => {
        const response = await RNFS.readFile(content.uri)

        setFileData(response)
    }

    useEffect(() => {
        if (content.type.includes("text")) {
            readFile()
        }
    })
    

    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 10,}}>

            {content.type.includes("text") ? <Text>{fileData}</Text> : <Image source={{ uri: content.uri }}  style={{width: '100%', height: '100%', resizeMode:'contain'}}/>}
        </View>
    )
}

export default ViewLocalData
