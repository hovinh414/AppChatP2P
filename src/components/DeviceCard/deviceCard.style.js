import { StyleSheet } from 'react-native'

export default styles = StyleSheet.create({
    deviceCard: {
        flexDirection: 'row',
        marginBottom: 20,
        borderColor: '#ddd',
        borderRadius: 10,
        borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 10,
        gap: 15,
        alignItems: 'center',
        backgroundColor: '#fff',
        elevation: 2

    },

    phoneIcon: {
        width: 50,
        height: 50
    },

    deviceName: {
        fontWeight: '500',
        color: '#000'
    }
})