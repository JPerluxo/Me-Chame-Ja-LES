import { View, Text, TextInput, ScrollView, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Header } from "~/components/header";
import { Ionicons } from "@expo/vector-icons";

export default function Orders() {
  const pedidos = [
    { id: "1", origem: "Av. Paulista, 1000", destino: "Rua das Flores, 50", status: "Concluído" },
    { id: "2", origem: "Rua da Praia, 200", destino: "Av. Brasil, 400", status: "Em andamento" },
    { id: "3", origem: "Rua X, 10", destino: "Rua Y, 90", status: "Pendente" },
  ];

  return (
    <LinearGradient
      colors={["#4EA8DE", "#5E60CE", "#4EA8DE"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <View className="flex-1">
        {/* Header fixo no topo */}
        <Header />

        {/* Conteúdo */}
        <View className="flex-1 p-4 space-y-4">
          {/* Título */}
          <Text className="text-xl font-bold text-white">Meus Pedidos</Text>

          {/* Barra de pesquisa */}
          <View className="flex-row items-center bg-white rounded-xl px-3 py-2">
            <Ionicons name="search" size={20} color="#666" />
            <TextInput
              placeholder="Pesquisar pedidos..."
              placeholderTextColor="#888"
              className="flex-1 ml-2 text-base text-gray-700"
            />
          </View>

          {/* Lista de pedidos */}
          <ScrollView className="flex-1 space-y-3">
            {pedidos.map((pedido) => (
              <View
                key={pedido.id}
                className="bg-white rounded-xl p-4 my-4 shadow-md"
              >
                <Text className="text-sm text-gray-500">#{pedido.id}</Text>
                <Text className="font-semibold text-gray-800 mt-1">
                  Origem: {pedido.origem}
                </Text>
                <Text className="text-gray-700">Destino: {pedido.destino}</Text>
                <Text
                  className={`mt-2 font-semibold ${
                    pedido.status === "Concluído"
                      ? "text-green-600"
                      : pedido.status === "Em andamento"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {pedido.status}
                </Text>
                <Pressable className="mt-2 self-end bg-blue-500 px-3 py-1 rounded-lg">
                  <Text className="text-white text-sm">Ver detalhes</Text>
                </Pressable>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </LinearGradient>
  );
}