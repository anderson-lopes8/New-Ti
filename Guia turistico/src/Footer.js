import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Text style={styles.textoFooter}>© 2026 SÓ VIAGENS. Todos os direitos reservados Anderson Lopes.</Text>
      <Text style={styles.subTextoFooter}>Explore o mundo com a gente</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#075157',
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoFooter: {
    color: '#edeef0',
    fontSize: 12,
    fontWeight: '600',
  },
  subTextoFooter: {
    color: '#d9dbdf',
    fontSize: 11,
    marginTop: 2,
  },
});
