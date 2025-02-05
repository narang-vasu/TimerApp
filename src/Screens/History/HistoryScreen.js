import { Text, View, TouchableOpacity, Image, FlatList, Alert } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { HistoryStyle } from './HistoryStyle';
import RNFS from 'react-native-fs';
import Share from "react-native-share";

const HistoryScreen = ({route}) => {
    const historyList = route.params.historyList;
    const navigation = useNavigation();

    const exportHistory = async () => {
        if (historyList.length === 0) {
            Alert.alert("No history to export!");
            return;
        }

        const jsonString = JSON.stringify(historyList, null, 2);
        const path = `${RNFS.DownloadDirectoryPath}/timers.json`;

        try {
            await RNFS.writeFile(path, jsonString, 'utf8');

            await Share.open({
                url: `file://${path}`,
                type: 'application/json'
            });
        } catch (error) {
            console.error('Error sharing JSON:', error);
        }
    };

    const renderHistory = ({item, index}) => {
        return (
            <View key={item.id} style={HistoryStyle.bgList}  >
                <Text style={HistoryStyle.text3}>Name: {item.name}</Text>
                <Text style={HistoryStyle.text3}>Status: {item.status}</Text>
                <Text style={HistoryStyle.text3} >Category: {item.category}</Text>
            </View>
        )
    }

    return (
        <View style={HistoryStyle.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={HistoryStyle.header}  >
                <Image source={require("../../Images/leftArrow.png")} style={HistoryStyle.img1} />
                <Text style={HistoryStyle.text1} >History</Text>
            </TouchableOpacity>

            <View style={HistoryStyle.section} >
                <Text style={HistoryStyle.text2}>Completed Timers</Text>
            </View>

            <View style={HistoryStyle.footer} >
                {
                    historyList.length > 0 ?
                    <FlatList
                        data={historyList}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderHistory}
                        showsVerticalScrollIndicator={false}
                        style={{marginHorizontal: 15}}
                    />
                    :
                    <Text style={[HistoryStyle.text3, { textAlign: 'center' }]} >No History Found</Text>
                }
            </View>

            <TouchableOpacity style={HistoryStyle.btn1} onPress={exportHistory} >
                <Text style={HistoryStyle.text4} >Export Timer</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HistoryScreen