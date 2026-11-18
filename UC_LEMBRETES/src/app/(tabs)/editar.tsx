import { useCallback, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { api, Lembrete } from '../../api';
import Formulario from '../../components/Formulario';

export default function Editar() {
  const { id } = useLocalSearchParams<{ id?: string }>();
  const [item, setItem] = useState<Lembrete | null>(null);

  useFocusEffect(useCallback(() => {
    setItem(null);
    if (id) api.buscar(Number(id)).then(setItem).catch(() => Alert.alert('Erro', 'API indisponível'));
  }, [id]));

  if (!id || !item) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30 }}>
        <Text style={{ textAlign: 'center' }}>
          {id ? 'Carregando...' : 'Selecione um lembrete na aba Lembretes (⋮ > Editar).'}
        </Text>
      </View>
    );
  }

  return (
    <Formulario key={item.id} inicial={item} botao="Salvar Alterações" onSalvar={async d => {
      await api.atualizar(item.id, d);
      router.setParams({ id: '' });
      router.navigate('/listar');
    }} />
  );
}
