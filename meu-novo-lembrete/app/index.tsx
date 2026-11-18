import { View, Image, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import { Button } from '../components/Button/button';

export default function RootLayout() {

  function navigate () {
    router.replace('/list');  
   
  } 