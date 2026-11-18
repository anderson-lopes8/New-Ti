import { useState } from 'react';
import { router } from 'expo-router';
import { api } from '../../api';
import Formulario from '../../components/Formulario';

export default function Novo() {
  const [k, setK] = useState(0); // troca a key para limpar o formulário
  return (
    <Formulario key={k} botao="Salvar Lembrete" onSalvar={async d => {
      await api.criar(d);
      setK(k + 1);
      router.navigate('/listar');
    }} />
  );
}
