import { Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SplashStyle } from './SplashStyle'
import { useNavigation } from '@react-navigation/native'

const SplashScreen = () => {
    const navigation = useNavigation();

    useEffect(() => {
        navigation.navigate('Home')
    }, [])

    return (
        <View style={SplashStyle.container} >
            <Text style={SplashStyle.text1} >Welcome to Timer App</Text>
        </View>
    )
}

export default SplashScreen