import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.tituloHeader}>SÓ VIAGENS</Text>
      <Text style={styles.subtituloHeader}>O seu próximo destino está aqui</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#3fdd34',
    paddingVertical: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    elevation: 4,
    paddingTop: 45,
  },
  tituloHeader: {
    fontSize: 26,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 2,
  },
  subtituloHeader: {
    fontSize: 12,
    color: '#e0f2fe',
    marginTop: 2,
    fontWeight: '500',
  },
});
