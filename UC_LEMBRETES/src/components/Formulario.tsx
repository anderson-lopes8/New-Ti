import { useState } from 'react';
import { Text, TextInput, Pressable, Switch, ScrollView, View, StyleSheet, Alert } from 'react-native';
import { cor } from '../theme';

export const CATEGORIAS = ['Trabalho', 'Estudo', 'Saúde', 'Pessoal'];
const vazio = { titulo: '', descricao: '', categoria: 'Trabalho', prioridade: 'Normal', notificar: 1 };

const dataValida = (n: string) => {
  const d = n.slice(0, 2), m = n.slice(2, 4), a = n.slice(4, 8);
  if (d.length === 1 && d > '3') return false;
  if (d.length === 2 && (+d < 1 || +d > 31)) return false;
  if (m.length === 1 && m > '1') return false;
  if (m.length === 2 && (+m < 1 || +m > 12)) return false;

  // Validação estrita para o intervalo de anos de 2026 a 2050 durante a digitação
  if (a.length === 1 && a !== '2') return false;
  if (a.length === 2 && a !== '20') return false;
  if (a.length === 3) {
    const anoParcial = +a;
    // Garante que comece com 202 ou 203 ou 204 ou 2050
    if (anoParcial < 202 || anoParcial > 205) return false;
  }
  if (a.length === 4) {
    const ano = +a;
    if (ano < 2026 || ano > 2050) return false;
  }

  return true;
};

const horaValida = (n: string) => {
  const h = n.slice(0, 2), m = n.slice(2, 4);
  if (h.length === 1 && h > '2') return false;
  if (h.length === 2 && +h > 23) return false;
  if (m.length === 1 && m > '5') return false;
  return true;
};

const filtrar = (texto: string, max: number, ok: (n: string) => boolean) => {
  let n = '';
  for (const c of texto.replace(/\D/g, '').slice(0, max)) if (ok(n + c)) n += c;
  return n;
};

const mascaraData = (t: string) => {
  const n = filtrar(t, 8, dataValida);
  return [n.slice(0, 2), n.slice(2, 4), n.slice(4)].filter(Boolean).join('/');
};

const mascaraHora = (t: string) => {
  const n = filtrar(t, 4, horaValida);
  return n.length > 2 ? n.slice(0, 2) + ':' + n.slice(2) : n;
};

type Props = { inicial?: any; botao: string; onSalvar: (d: any) => Promise<void> };

// Formulário usado nas tabs "Novo" e "Editar"
export default function Formulario({ inicial, botao, onSalvar }: Props) {
  const [f, setF] = useState<any>({ ...vazio, ...inicial, notificar: Number(inicial?.notificar ?? 1) });
  const set = (k: string, v: any) => setF({ ...f, [k]: v });

  const dh: string = inicial?.data_hora ?? '';
  const [data, setData] = useState(dh ? `${dh.slice(8, 10)}/${dh.slice(5, 7)}/${dh.slice(0, 4)}` : '');
  const [hora, setHora] = useState(dh.slice(11, 16));

  const salvar = () => {
    const [d, m, a] = data.split('/').map(Number);

    // Validação do ano entre 2026 e 2050
    const dataOk = (() => {
      if (!Number.isFinite(d) || !Number.isFinite(m) || !Number.isFinite(a)) return false;
      if (data.length !== 10 || a < 2026 || a > 2050) return false;

      const dt = new Date(a, m - 1, d);
      return dt.getFullYear() === a && dt.getMonth() === m - 1 && dt.getDate() === d;
    })();

    if (!f.titulo.trim()) return Alert.alert('Atenção', 'Informe o título.');
    if (!dataOk) return Alert.alert('Atenção', 'Informe uma data válida (DD/MM/AAAA) com ano entre 2026 e 2050.');
    if (hora.length !== 5) return Alert.alert('Atenção', 'Informe a hora (HH:MM).');

    const data_hora = `${data.slice(6)}-${data.slice(3, 5)}-${data.slice(0, 2)} ${hora}`;

    // Bloqueia data e hora no passado (na edição, só se a data ou a hora foram alteradas)
    const [hh, mm] = hora.split(':').map(Number);
    const mudou = !inicial || data_hora !== inicial.data_hora.slice(0, 16);
    if (mudou && new Date(a, m - 1, d, hh, mm) < new Date())
      return Alert.alert('Atenção', 'A data e a hora não podem estar no passado.');

    onSalvar({ ...f, data_hora }).catch(() => Alert.alert('Erro', 'Não foi possível salvar. Verifique a API.'));
  };
  return (
    <ScrollView contentContainerStyle={s.box}>
      <Text style={s.rotulo}>Título</Text>
      <TextInput style={s.input} value={f.titulo} onChangeText={t => set('titulo', t)} placeholder="Título" />
      <Text style={s.rotulo}>Descrição (opcional)</Text>
      <TextInput style={[s.input, { height: 90 }]} multiline value={f.descricao} onChangeText={t => set('descricao', t)} />
      <Text style={s.rotulo}>Data</Text>
      <TextInput style={s.input} value={data} onChangeText={t => setData(mascaraData(t))}
        placeholder="DD/MM/AAAA" keyboardType="numeric" maxLength={10} />
      <Text style={s.rotulo}>Hora</Text>
      <TextInput style={s.input} value={hora} onChangeText={t => setHora(mascaraHora(t))}
        placeholder="HH:MM" keyboardType="numeric" maxLength={5} />
      <Text style={s.rotulo}>Categoria</Text>
      <View style={s.linha}>
        {CATEGORIAS.map(c => (
          <Pressable key={c} onPress={() => set('categoria', c)} style={[s.chip, f.categoria === c && s.chipOn]}>
            <Text style={f.categoria === c && { color: '#fff' }}>{c}</Text>
          </Pressable>
        ))}
      </View>
      <Text style={s.rotulo}>Prioridade</Text>
      <View style={s.linha}>
        {['Normal', 'Alta'].map(p => (
          <Pressable key={p} onPress={() => set('prioridade', p)}>
            <Text style={{ color: cor.primaria, marginRight: 16 }}>{f.prioridade === p ? '◉' : '○'} {p}</Text>
          </Pressable>
        ))}
      </View>
      <View style={[s.linha, { justifyContent: 'space-between' }]}>
        <Text style={s.rotulo}>Notificar</Text>
        <Switch value={!!f.notificar} onValueChange={v => set('notificar', v ? 1 : 0)}
          trackColor={{ true: cor.destaque }} thumbColor="#fff" />
      </View>
      <Pressable style={s.btn} onPress={salvar}>
        <Text style={{ color: '#fff', fontWeight: '700' }}>{botao}</Text>
      </Pressable>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  box: {
    padding: 20
  },

  rotulo: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 6,
    marginTop: 12
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#1E293B'
  },

  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8
  },

  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 8,
    backgroundColor: '#fff'
  },

  chipOn: {
    backgroundColor: cor.primaria || '#2563EB',
    borderColor: cor.primaria || '#2563EB'
  },

  btn: {
    backgroundColor: cor.primaria || '#2563EB',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24
  }
});
