import {  useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, Pressable, Alert, StyleSheet, ScrollView  } from 'react-native';
import { router, useFocusEffect, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { api, formatar, Lembrete } from '../../api';
import { cor } from '../../theme';
import { CATEGORIAS } from '../../components/Formulario';
import Fab from '../../components/Fab';

//  const FILTROS = ['Todos', ...CATEGORIAS];
const FILTROS = ['Todos', 'Hoje', 'Pendentes', ...CATEGORIAS];

const hojeISO = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export default function Listar() {
  const [lista, setLista] = useState<Lembrete[]>([]);
  const [filtro, setFiltro] = useState('Todos');
  const [menu, setMenu] = useState<number | null>(null);
  const { filtro: param } = useLocalSearchParams<{ filtro?: string }>();
useEffect(() => {
  if (param) {
    setFiltro(param);
    router.setParams({ filtro: '' }); // limpa, para poder tocar no mesmo card de novo
  }
}, [param]);

  const carregar = useCallback(() => {
    api.listar().then(setLista).catch(() => Alert.alert('Erro', 'API indisponível'));
  }, []);
  useFocusEffect(carregar);

  const concluir = (l: Lembrete) =>
    api.atualizar(l.id, { concluido: Number(l.concluido) ? 0 : 1 }).then(carregar);

  const editar = (id: number) => {
    setMenu(null);
    router.push({ pathname: '/editar', params: { id } });
  };

  // Exclusão fica aqui na lista (com confirmação)
  const excluir = (l: Lembrete) => {
    setMenu(null);
    Alert.alert('Excluir lembrete?', `Tem certeza que deseja excluir "${l.titulo}"? Esta ação não pode ser desfeita.`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', style: 'destructive', onPress: () => api.excluir(l.id).then(carregar) },
    ]);
  };

const dados = lista.filter(l => {
  if (filtro === 'Todos') return true;
  if (filtro === 'Hoje') return l.data_hora.slice(0, 10) === hojeISO() && Number(l.concluido) === 0;
  if (filtro === 'Pendentes') return Number(l.concluido) === 0;
  return l.categoria === filtro;
});

  return (
    <View style={{ flex: 1, backgroundColor: cor.fundo }}>
      <View style={s.filtros}>
        {FILTROS.map(f => (
          <Pressable key={f} onPress={() => setFiltro(f)} style={[s.chip, filtro === f && s.chipOn]}>
            <Text style={filtro === f && { color: '#fff' }}>{f}</Text>
          </Pressable>
        ))}
      </View>
      <FlatList
        data={dados}
        keyExtractor={l => String(l.id)}
        contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 90 }}
        ListEmptyComponent={<Text style={{ textAlign: 'center' }}>Nenhum lembrete.</Text>}
        renderItem={({ item: l }) => {
          const ok = Number(l.concluido) === 1;
          return (
            <View style={s.card}>
              <View style={s.linha}>
                <Pressable onPress={() => concluir(l)}>
                  <Ionicons name={ok ? 'checkbox' : 'square-outline'} size={24} color={cor.primaria} />
                </Pressable>
                <Text style={[s.titulo, ok && { textDecorationLine: 'line-through' }]}>{l.titulo}</Text>
                <Pressable onPress={() => setMenu(menu === l.id ? null : l.id)}>
                  <Ionicons name="ellipsis-vertical" size={22} color={cor.texto} />
                </Pressable>
              </View>
              {menu === l.id && (
                <View style={s.menu}>
                  <Pressable onPress={() => editar(l.id)}><Text style={s.opcao}>Editar</Text></Pressable>
                  <Pressable onPress={() => excluir(l)}><Text style={[s.opcao, { color: cor.perigo }]}>Excluir</Text></Pressable>
                </View>
              )}
              <View style={s.linha}>
                <Text style={s.tag}>{l.categoria}</Text>
                <Text style={{ color: '#667' }}>{formatar(l.data_hora)}</Text>
              </View>
            </View>
          );
        }}
      />
      <Fab />
    </View>
  );
}

const s = StyleSheet.create({
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 16,
    paddingBottom: 0,
  },

  chip: {
    backgroundColor: cor.cinza,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16
  },

  chipOn: {
    backgroundColor: cor.primaria
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    gap: 8,
    elevation: 2
  },


  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },

  titulo: {
    flex: 1,
    fontWeight: '700',
    fontSize: 16,
    color: cor.texto
  },

  tag: {
    backgroundColor: cor.destaque,
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 10,
    overflow: 'hidden'
  },

  menu: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 4
  },

  opcao: {
    paddingHorizontal: 18,
    paddingVertical: 10
  },
})
