import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { cor } from '../../theme';

const icone = (nome: any) => ({ color, size }: any) => <Ionicons name={nome} color={color} size={size} />;

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerStyle: { backgroundColor: cor.primaria }, 
      headerTintColor: '#fff',
      tabBarActiveTintColor: cor.primaria,
    }}>
      {/* Altere o 'title' abaixo para o texto que desejar (ex: 'Lembrei para você' ou 'Home') */}
      <Tabs.Screen name="index" options={{ title: 'Lembrei para você', tabBarIcon: icone('home') }} />
      <Tabs.Screen name="listar" options={{ title: 'Meus Lembretes', tabBarLabel: 'Lembretes', tabBarIcon: icone('checkbox-outline') }} />
      <Tabs.Screen name="novo" options={{ title: 'Novo Lembrete', tabBarLabel: 'Add Lembrete', tabBarIcon: icone('add-circle') }} />
      <Tabs.Screen name="editar" options={{ title: 'Editar Lembrete', tabBarLabel: 'Editar', tabBarIcon: icone('create') }} />
    </Tabs>
  );
}