import { useCallback, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { api, formatar, Lembrete } from '../../api';
import { cor } from '../../theme';
import Fab from '../../components/Fab';

const DIAS = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];

export default function Inicio() {
  const router = useRouter();
  const [lista, setLista] = useState<Lembrete[]>([]);

  useFocusEffect(
    useCallback(() => {
      api.listar().then(setLista).catch(() => {});
    }, [])
  );

  const d = new Date();
  const hojeStr = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const dataExtenso = `${DIAS[d.getDay()]}, ${String(d.getDate()).padStart(2, '0')} de ${MESES[d.getMonth()]} de ${d.getFullYear()}`;

  const pendentes = lista.filter(l => Number(l.concluido) === 0);
  const hoje = pendentes.filter(l => l.data_hora.slice(0, 10) === hojeStr).length;

  return (
    <View style={{ flex: 1, backgroundColor: cor.fundo }}>
      <ScrollView>
        <View style={s.topo}>
          <Text style={s.ola}>Olá!</Text>
          <Text style={{ color: '#fff' }}>Bem-vindo ao Lembrete_UC</Text>
          <Text style={{ color: '#fff', marginTop: 10 }}>{dataExtenso}</Text>

          <View style={s.linha}>
            <Pressable
              style={s.card}
              onPress={() => router.navigate({ pathname: '/listar', params: { filtro: 'Hoje' } })}
            >
              <Text>Hoje</Text>
              <Text style={s.num}>{hoje}</Text>
            </Pressable>

            <Pressable
              style={s.card}
              onPress={() => router.navigate({ pathname: '/listar', params: { filtro: 'Pendentes' } })}
            >
              <Text>Pendentes</Text>
              <Text style={s.num}>{pendentes.length}</Text>
            </Pressable>
          </View>
        </View>

        <Text style={s.titulo}>Lembretes Próximos</Text>
        {pendentes.slice(0, 3).map(l => (
          <View key={l.id} style={s.item}>
            <Text style={{ fontWeight: '600' }}>{l.titulo}</Text>
            <Text style={{ color: '#667' }}>{formatar(l.data_hora)}</Text>
          </View>
        ))}
      </ScrollView>

      <Fab />
    </View>
  );
}

const s = StyleSheet.create({
  topo: {
    backgroundColor: cor.primaria,
    padding: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24
  },

  ola: {
    color: '#fff',
    fontSize: 26,
    fontWeight: '700'
  },

  linha: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16
  },

  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    alignItems: 'center'
  },

  num: {
    fontSize: 32,
    fontWeight: '700',
    color: cor.primaria
  },

  titulo: {
    fontSize: 18,
    fontWeight: '700',
    margin: 16,
    color: cor.texto
  },

  item: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 10,
    padding: 14,
    borderRadius: 12
  },
});
