import { Dimensions } from "react-native";

export const height = Dimensions.get('screen').height;
export const width = Dimensions.get('screen').width;

export const Colors = {
    orange: "#E7833A",
    white: '#fff',
    black: '#000',
    blue: '#1EA4E6',
    lightBlue: '#D8ECFC',
    modalbg: '#0F4C68',
    textIpBg: '#D9D9D9',
    lightGray: '#383436',
    lightWhite: "#f5f5f5"
};

export const categoryList = [
    { key: '1', label: 'Workout' },
    { key: '2', label: 'Study' },
    { key: '3', label: 'Break' }
];