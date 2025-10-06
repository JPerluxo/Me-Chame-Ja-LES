import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  Switch,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export function FormVehicle({ goBack }: { goBack: () => void }) {
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [placa, setPlaca] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [ano, setAno] = useState("");
  const [tipo, setTipo] = useState("carro");
  const [capacidadeKg, setCapacidadeKg] = useState("");
  const [transporteAnimais, setTransporteAnimais] = useState(false);
  const [transporteMaterialConstrucao, setTransporteMaterialConstrucao] = useState(false);
  const [loading, setLoading] = useState(false);

  // Carrega ID do usuário logado
  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const dados = await AsyncStorage.getItem("usuarioLogado");
        if (dados) {
          const user = JSON.parse(dados);
          setUsuarioId(user.id);
        }
      } catch (error) {
        console.error("Erro ao carregar usuário logado:", error);
      }
    };
    carregarUsuario();
  }, []);

  // Enviar dados pro backend
  const handleSubmit = async () => {
    if (!placa || !marca || !modelo || !ano || !tipo || !capacidadeKg) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }

    if (!usuarioId) {
      Alert.alert("Erro", "Usuário não identificado.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/vehicle/save", {
        userId: usuarioId,
        licensePlate: placa,
        manufacturer: marca,
        model: modelo,
        year: parseInt(ano),
        type: tipo,
        capacity: parseInt(capacidadeKg),
        transportsAnimals: transporteAnimais,
        transportsMaterials: transporteMaterialConstrucao,
      });

      if (response.status === 200) {
        Alert.alert("Sucesso", "Veículo cadastrado com sucesso!");
        goBack();
      } else {
        Alert.alert("Erro", "Não foi possível cadastrar o veículo.");
      }
    } catch (error) {
      console.error("Erro ao salvar veículo:", error);
      Alert.alert("Erro", "Falha ao enviar os dados. Verifique o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white p-6 rounded-2xl shadow-lg">
      <Text className="text-2xl font-bold text-[#5E60CE] text-center mb-4">
        Cadastro de Veículo
      </Text>

      {/* Placa */}
      <Text className="text-sm text-gray-700 mb-1">Placa *</Text>
      <TextInput
        value={placa}
        onChangeText={setPlaca}
        placeholder="Ex: ABC1234"
        className="border border-gray-300 rounded-lg p-3 mb-4"
      />

      {/* Marca */}
      <Text className="text-sm text-gray-700 mb-1">Marca *</Text>
      <TextInput
        value={marca}
        onChangeText={setMarca}
        placeholder="Ex: Volvo, Honda..."
        className="border border-gray-300 rounded-lg p-3 mb-4"
      />

      {/* Modelo */}
      <Text className="text-sm text-gray-700 mb-1">Modelo *</Text>
      <TextInput
        value={modelo}
        onChangeText={setModelo}
        placeholder="Ex: FH, CG 160..."
        className="border border-gray-300 rounded-lg p-3 mb-4"
      />

      {/* Ano */}
      <Text className="text-sm text-gray-700 mb-1">Ano *</Text>
      <TextInput
        value={ano}
        onChangeText={setAno}
        keyboardType="numeric"
        placeholder="Ex: 2020"
        className="border border-gray-300 rounded-lg p-3 mb-4"
      />

      {/* Tipo */}
      <Text className="text-sm text-gray-700 mb-1">Tipo *</Text>
      <View className="border border-gray-300 rounded-lg p-3 mb-4 bg-gray-50">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {["carro", "moto", "van", "caminhao", "outro"].map((item) => (
            <Pressable
              key={item}
              onPress={() => setTipo(item)}
              className={`px-4 py-2 mr-2 rounded-lg ${
                tipo === item ? "bg-[#5E60CE]" : "bg-gray-200"
              }`}
            >
              <Text
                className={`text-sm ${
                  tipo === item ? "text-white" : "text-gray-700"
                }`}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Capacidade */}
      <Text className="text-sm text-gray-700 mb-1">Capacidade (kg) *</Text>
      <TextInput
        value={capacidadeKg}
        onChangeText={setCapacidadeKg}
        keyboardType="numeric"
        placeholder="Ex: 500"
        className="border border-gray-300 rounded-lg p-3 mb-4"
      />

      {/* Switches */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-sm text-gray-700">Transporte de Animais</Text>
        <Switch
          value={transporteAnimais}
          onValueChange={setTransporteAnimais}
          thumbColor={transporteAnimais ? "#5E60CE" : "#ccc"}
        />
      </View>

      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-sm text-gray-700">
          Transporte de Material de Construção
        </Text>
        <Switch
          value={transporteMaterialConstrucao}
          onValueChange={setTransporteMaterialConstrucao}
          thumbColor={transporteMaterialConstrucao ? "#5E60CE" : "#ccc"}
        />
      </View>

      {/* Botões */}
      <Pressable
        onPress={handleSubmit}
        disabled={loading}
        className="bg-[#5E60CE] rounded-lg p-4 mb-3"
      >
        <Text className="text-white font-semibold text-center text-lg">
          {loading ? "Salvando..." : "Salvar Veículo"}
        </Text>
      </Pressable>

      <Pressable
        onPress={goBack}
        className="border border-gray-300 rounded-lg p-4"
      >
        <Text className="text-gray-600 font-medium text-center">Voltar</Text>
      </Pressable>
    </ScrollView>
  );
}