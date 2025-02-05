import { StyleSheet } from "react-native";
import { Colors } from '../../data';

export const HistoryStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightWhite
    },
    text1: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.black,
        marginLeft: 5
    },
    img1: {
        width: 20,
        height: 20
    },
    header: {
        padding: 15,
        flexDirection: 'row',
        backgroundColor: Colors.lightBlue,
        alignItems: 'center'
    },
    section: {
        marginHorizontal: 15,
        marginVertical: 10
    },
    text3: {
        fontSize: 17,
        fontWeight: '600',
        color: Colors.black
    },
    text2: {
        fontSize: 18,
        fontWeight: '600',
        color: Colors.black
    },
    text4: {
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
        borderRadius: 10,
        marginHorizontal: 15
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
    footer: {
        flex: 1,
        justifyContent: "center"
    }
})