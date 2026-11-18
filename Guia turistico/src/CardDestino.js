import React from 'react';
import { View, Text, Image, Pressable, StyleSheet } from 'react-native';

export default function CardDestino({ item, onAoPressionar }) {
  return (
    <View style={styles.card}>
      <Image source={ item.imagem } style={styles.imagemCard} />
      
      <View style={styles.conteudoCard}>
        <Text style={styles.tituloCard}>{item.titulo}</Text>
        <Text style={styles.descricaoCard}>{item.descricaoCurta}</Text>

        <Pressable
          style={({ pressed }) => [
            styles.botaoSaibaMais,
            pressed && styles.botaoPressionado
          ]}
          onPress={() => onAoPressionar(item)}
        >
          <Text style={styles.textoBotaoSaibaMais}>Saiba Mais →</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    marginBottom: 24,
    overflow: 'hidden',
    elevation: 3,
  },
  imagemCard: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  conteudoCard: {
    padding: 16,
  },
  tituloCard: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 6,
  },
  descricaoCard: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
    marginBottom: 16,
  },
  botaoSaibaMais: {
    backgroundColor: '#90f089',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoPressionado: {
    opacity: 0.85,
  },
  textoBotaoSaibaMais: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
