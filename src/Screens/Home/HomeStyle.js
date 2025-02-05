import { StyleSheet } from "react-native";
import { Colors, width } from '../../data';

export const HomeStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightWhite
    },
    text1: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.black
    },
    img1: {
        width: 25,
        height: 25
    },
    header: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.lightBlue,
        alignItems: 'center'
    },
    section: {
        marginHorizontal: 15,
        marginVertical: 10
    },
    input: { 
        borderWidth: 1,
        padding: 10,
        marginVertical: 5,
        fontSize: 16,
        borderRadius: 10,
        backgroundColor: Colors.white,
        color: 'gray',
        fontWeight: '500'
    },
    dropdown: {
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginVertical: 5
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'gray',
        fontWeight: "500"
    },
    selectedTextStyle: {
        fontSize: 16,
        color: Colors.black,
        fontWeight: "500"
    },
    text2: {
        fontSize: 15,
        fontWeight: '500',
        color: Colors.white,
        textAlign: 'center'
    },
    btn1: {
        padding: 10,
        backgroundColor: Colors.orange,
        marginVertical: 10,
        justifyContent: 'center',
        borderRadius: 10
    },
    text3: {
        fontSize: 17,
        fontWeight: '600',
        color: Colors.black
    },
    text4: {
        fontSize: 15,
        fontWeight: '500',
        color: Colors.white,
        textAlign: 'center'
    },
    btn2: {
        padding: 10,
        backgroundColor: Colors.orange,
        marginVertical: 10,
        justifyContent: 'center',
        borderRadius: 10,
        width: width * 0.28,
    },
    bgList: {
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        backgroundColor: Colors.white,
        padding: 10,
        marginVertical: 5
    },
    renderBg: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    progressBar: {
        height: 5,
        backgroundColor: "#ccc",
        marginTop: 5,
    },
    footer: {
        flex: 1,
        justifyContent: "center"
    }
})