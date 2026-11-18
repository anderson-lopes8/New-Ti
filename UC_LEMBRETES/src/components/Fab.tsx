import { Pressable } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { cor } from '../theme';

export default function Fab() {
  return (
    <Pressable
      onPress={() => router.push('/novo')}
      style={{
        position: 'absolute', right: 20, bottom: 20, width: 56, height: 56, borderRadius: 28,
        backgroundColor: cor.primaria, alignItems: 'center', justifyContent: 'center', elevation: 6
      }}>
      <Ionicons name="add" size={30} color="#fff" />
    </Pressable>
  );
}
