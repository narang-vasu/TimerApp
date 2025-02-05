import { Alert, Text, View, TextInput, TouchableOpacity, Image, FlatList, Keyboard } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Dropdown } from 'react-native-element-dropdown';
import { HomeStyle } from './HomeStyle';
import { Colors, categoryList } from '../../data';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const [timers, setTimers] = useState([]);
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [category, setCategory] = useState('');
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        loadTimers();
    }, []);

    const loadTimers = async () => {
        const savedTimers = await AsyncStorage.getItem('timers');
        if (savedTimers) {
            setTimers(JSON.parse(savedTimers));
        }
    }

    const saveTimers = async (newTimers) => {
        setTimers(newTimers);
        await AsyncStorage.setItem('timers', JSON.stringify(newTimers));
    }

    const addTimer = () => {
        const nameRegex = /^[A-Za-z]+$/
        if (!name || !duration || !value) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }
        if (!nameRegex.test(name)) {
            Alert.alert('Name should only contain alphabets');
            return;
        }
        const newTimer = { id: Date.now(), name, duration: parseInt(duration), category: category, remaining: parseInt(duration), status: "Paused", halfway: true, halfwayTriggered: false };
        saveTimers([...timers, newTimer]);
        setName('');
        setDuration('');
        setValue(null)
        Keyboard.dismiss();
    }

    const startTimer = (id) => {
        setTimers((prevTimers) =>
            prevTimers.map((timer) =>
            timer.id === id ? { ...timer, status: "Running" } : timer
        ));
    }

    const pauseTimer = (id) => {
        setTimers((prevTimers) =>
            prevTimers.map((timer) =>
            timer.id === id ? { ...timer, status: "Paused" } : timer
        )); 
    }
    
    const resetTimer = (id) => {
        setTimers((prevTimers) =>
            prevTimers.map((timer) =>
            timer.id === id ? { ...timer, remaining: timer.duration, status: "Paused", halfwayTriggered: false } : timer
        ));
    }

    const renderTimers = ({item, index}) => {
        return (
            <View key={item.id} style={HomeStyle.bgList} >
                <Text style={HomeStyle.text3} >Name: {item.name}</Text>
                <Text style={HomeStyle.text3} >Remaining Time: {item.remaining}s</Text>
                <Text style={HomeStyle.text3} >Status: {item.status}</Text>
                <Text style={HomeStyle.text3} >Category: {item.category}</Text>
                <View style={HomeStyle.renderBg} >
                    <TouchableOpacity onPress={() => startTimer(item.id)} style={HomeStyle.btn2} disabled={item.remaining == 0} >
                        <Text style={HomeStyle.text4} >Start Timer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => pauseTimer(item.id)} style={HomeStyle.btn2} >
                        <Text style={HomeStyle.text4} >Pause Timer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => resetTimer(item.id)} style={HomeStyle.btn2} >
                        <Text style={HomeStyle.text4} >Reset Timer</Text>
                    </TouchableOpacity>
                </View>
                <View style={HomeStyle.progressBar}>
                    <View style={{ width: `${(item.remaining / item.duration) * 100}%`, height: "100%", backgroundColor: Colors.blue }} />
                </View>
            </View>
        )
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimers((prevTimers) =>
                prevTimers.map((timer) => {
                    if (timer.status === "Running" && timer.remaining > 0) {
                        // Check halfway alert
                        if (timer.halfway && !timer.halfwayTriggered && timer.remaining === Math.floor(timer.duration / 2)) {
                            Alert.alert(`Half "${timer.name}" timer has been completed!`);
                            return { ...timer, remaining: timer.remaining - 1, halfwayTriggered: true };
                        }
                        return { ...timer, remaining: timer.remaining - 1 };
                        } else if (timer.status === "Running" && timer.remaining === 0) {
                            Alert.alert(
                                'Congratulations',
                                `"${timer.name}" timer has been completed!`
                            );
                            return { ...timer, status: "Completed" };
                        }
                    return timer;
                })
            );
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const onNaviagtionHistory = () => {
        const timer1 = timers.filter(item => item.status == "Completed");
        navigation.navigate("History", { historyList: timer1 })
    }

    return (
        <View style={HomeStyle.container}>
            <View style={HomeStyle.header} >
                <Text style={HomeStyle.text1} >Home</Text>
                <TouchableOpacity onPress={() => onNaviagtionHistory()} >
                    <Image source={require("../../Images/history.png")} style={HomeStyle.img1} />
                </TouchableOpacity>
            </View>

            <View style={HomeStyle.section} >
                <View>
                    <Text style={HomeStyle.text1} >Timer Name</Text>
                    <TextInput style={HomeStyle.input} placeholder="Timer Name" value={name} onChangeText={setName} placeholderTextColor={Colors.lightGray} />
                </View>

                <View style={{marginTop: 10}} >
                    <Text style={HomeStyle.text1} >Duration</Text>
                    <TextInput style={HomeStyle.input} placeholder="Duration (sec)" value={duration} onChangeText={setDuration} placeholderTextColor={Colors.lightGray} keyboardType='number-pad' />
                </View>

                <View style={{marginTop: 10}} >
                    <Text style={HomeStyle.text1} >Category</Text>

                    <Dropdown
                        style={[HomeStyle.dropdown, isFocus && { borderColor: Colors.blue }]}
                        placeholderStyle={HomeStyle.placeholderStyle}
                        selectedTextStyle={HomeStyle.selectedTextStyle}
                        itemContainerStyle={{backgroundColor: "#f5f5f5"}}
                        itemTextStyle={{color: "#000", fontSize: 16, fontWeight: "600"}}
                        activeColor="#1EA4E6"
                        data={categoryList}
                        maxHeight={300}
                        labelField="label"
                        valueField="key"
                        placeholder={'Select Category'}
                        value={value}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setValue(item.key);
                            setCategory(item.label)
                            setIsFocus(false);
                        }}
                    />
                </View>

                <TouchableOpacity style={HomeStyle.btn1} onPress={addTimer} >
                    <Text style={HomeStyle.text2} >Add Timer</Text>
                </TouchableOpacity>

                <Text style={HomeStyle.text1} >Timers List</Text>
            </View>

            <View style={HomeStyle.footer} >
                {
                    timers.length > 0 ?
                    <FlatList
                        data={timers}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderTimers}
                        showsVerticalScrollIndicator={false}
                        style={{marginHorizontal: 15}}
                    />
                    :
                    <Text style={[HomeStyle.text3, { textAlign: 'center' }]} >Add Some Timers</Text>
                }
            </View>
        </View>
    )
}

export default HomeScreen