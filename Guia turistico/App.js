import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Modal,
  Pressable,
  Image,
} from "react-native";

import { DESTINOS } from "./src/dados";
import Header from "./src/Header";
import CardDestino from "./src/CardDestino";
import Footer from "./src/Footer";

export default function App() {
  const [destinoSelecionado, setDestinoSelecionado] = useState(null);

  return (
    <SafeAreaView style={styles.tela}>
      <StatusBar barStyle="light-content" backgroundColor="#0284c7" />

      <Header />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listaContainer}
      >
        {DESTINOS.map((item) => (
          <CardDestino
            key={item.id}
            item={item}
            onAoPressionar={setDestinoSelecionado}
          />
        ))}
      </ScrollView>

      <Footer />

      <Modal
        visible={destinoSelecionado !== null}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setDestinoSelecionado(null)}
      >
        <SafeAreaView style={styles.modalTela}>
          {destinoSelecionado && (
            <View style={styles.modalContainer}>
              <View style={styles.topoModal}>
                <Pressable
                  style={styles.botaoFechar}
                  onPress={() => setDestinoSelecionado(null)}
                >
                  <Text style={styles.fecharTexto}>‹</Text>
                </Pressable>
                <Text style={styles.tituloTopoModal}>
                  {destinoSelecionado.titulo}
                </Text>
              </View>

              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollModal}
              >
                <Image
                  source={destinoSelecionado.imagem}
                  style={styles.imagemModal}
                />
                
                <View style={styles.blocoTexto}>
                  <Text style={styles.tituloBloco}>📖 Sobre o Destino</Text>
                  <Text style={styles.textoLongo}>
                    {destinoSelecionado.textoCompleto}
                  </Text>
                </View>
                <View style={styles.blocoDica}>
                  <Text style={styles.textoDica}>
                    {destinoSelecionado.dicaViagem}
                  </Text>
                </View>
                <Pressable
                  style={styles.botaoVoltarModal}
                  onPress={() => setDestinoSelecionado(null)}
                >
                  <Text style={styles.textoBotaoVoltar}>
                    Voltar para o Início
                  </Text>
                </Pressable>
              </ScrollView>
            </View>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: "#f1f5f9" },
  listaContainer: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 35 },
  modalTela: { flex: 1, backgroundColor: "#ffffff" },
  modalContainer: { flex: 1 },
  topoModal: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0284c7",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  botaoFechar: {
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  fecharTexto: { color: "#ffffff", fontSize: 36, fontWeight: "300" },
  tituloTopoModal: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 12,
  },
  scrollModal: { paddingBottom: 30 },
  imagemModal: { width: "100%", height: 220, resizeMode: "cover" },
  blocoTexto: { padding: 20 },
  tituloBloco: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 10,
  },
  textoLongo: {
    fontSize: 15,
    color: "#334155",
    lineHeight: 24,
    textAlign: "justify",
  },
  blocoDica: {
    backgroundColor: "#f0f9ff",
    marginHorizontal: 20,
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#bae6fd",
  },
  textoDica: { color: "#0369a1", fontSize: 14, fontWeight: "600" },
  botaoVoltarModal: {
    backgroundColor: "#0f172a",
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  textoBotaoVoltar: { color: "#ffffff", fontSize: 16, fontWeight: "bold" },
});
