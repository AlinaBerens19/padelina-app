// index.ts

// 1) Сначала shim — подменяем устаревший AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ReactNative from 'react-native';
// @ts-ignore: подмешиваем AsyncStorage в React Native core
;(ReactNative as any).AsyncStorage = AsyncStorage;

// 2) Затем стандартный старт Expo
import { registerRootComponent } from 'expo';
import App from './App';

// Регистрируем корневой компонент (AppRegistry инициализируется внутри)
registerRootComponent(App);

