export type Lembrete = {
  id: number;
   titulo: string;
    descricao: string;
     data_hora: string;
      categoria: string;
        prioridade: string;
          notificar: number;
           concluido: number;
};

// Emulador Android: 10.0.2.2 
const BASE = 'http://10.59.47.26/lembrete_uc_api/lembretes.php';

// async function req(query = '', method = 'GET', body?: object) {
//   const r = await fetch(BASE + query, {
//     method,
//     headers: { 'Content-Type': 'application/json' },
//     body: body ? JSON.stringify(body) : undefined,
//   });
//   if (!r.ok) throw new Error('Erro na API');
//   return r.json();
// }

async function req(query = '', method = 'GET', body?: object) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 5000);
  try {
    const r = await fetch(BASE + query, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: body ? JSON.stringify(body) : undefined,
      signal: ctrl.signal,
    });
    if (!r.ok) throw new Error('Erro na API (' + r.status + ')');
    return await r.json();
  } finally {
    clearTimeout(timer);
  }
}

export const api = {
  listar: (): Promise<Lembrete[]> => req(),
  buscar: (id: number): Promise<Lembrete> => req('?id=' + id),
  criar: (d: object) => req('', 'POST', d),
  atualizar: (id: number, d: object) => req('?id=' + id, 'PUT', d),
  excluir: (id: number) => req('?id=' + id, 'DELETE'),
};

export const formatar = (s: string) =>
  `${s.slice(8, 10)}/${s.slice(5, 7)}/${s.slice(0, 4)} ${s.slice(11, 16)}`;
