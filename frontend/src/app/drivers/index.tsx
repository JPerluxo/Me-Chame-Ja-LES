import { View, Text, FlatList, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Header } from "~/components/header";

const favoriteDrivers = [
  { id: "1", name: "João Silva", vehicle: "Moto", rating: "4.8 ★" },
  { id: "2", name: "Carlos Mendes", vehicle: "Carro Sedan", rating: "4.6 ★" },
];

const blockedDrivers = [
  { id: "3", name: "Pedro Santos", vehicle: "Van", rating: "3.9 ★" },
  { id: "4", name: "Lucas Oliveira", vehicle: "Utilitário", rating: "4.1 ★" },
];

function DriverItem({ name, vehicle, rating, actionLabel, onAction }: any) {
  return (
    <View className="flex-row justify-between items-center bg-white rounded-lg p-4 mb-3 shadow">
      {/* Dados do motorista */}
      <View>
        <Text className="text-base font-semibold text-gray-800">{name}</Text>
        <Text className="text-sm text-gray-600">{vehicle}</Text>
      </View>

      {/* Direita: classificação + botão */}
      <View className="flex-row items-center space-x-3">
        <Text className="text-sm font-medium text-indigo-600">{rating}</Text>
        <Pressable
          onPress={onAction}
          className="bg-red-500 px-3 py-1 rounded-lg"
        >
          <Text className="text-white text-sm font-medium">{actionLabel}</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function Drivers() {
  return (
    <LinearGradient
      colors={["#4EA8DE", "#5E60CE", "#4EA8DE"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <View className="flex-1">
        {/* Header fixo */}
        <Header />

        {/* Área principal */}
        <View className="flex-1 flex-col xl:flex-row p-4 space-y-6 xl:space-y-0 xl:space-x-6">
          {/* Favoritados */}
          <View className="flex-1">
            <Text className="text-lg font-bold text-white mb-4">
              Motoristas Favoritos
            </Text>
            <FlatList
              data={favoriteDrivers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <DriverItem
                  name={item.name}
                  vehicle={item.vehicle}
                  rating={item.rating}
                  actionLabel="Remover"
                  onAction={() => console.log("Remover:", item.name)}
                />
              )}
            />
          </View>

          {/* Bloqueados */}
          <View className="flex-1">
            <Text className="text-lg font-bold text-white mb-4">
              Motoristas Bloqueados
            </Text>
            <FlatList
              data={blockedDrivers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <DriverItem
                  name={item.name}
                  vehicle={item.vehicle}
                  rating={item.rating}
                  actionLabel="Desbloquear"
                  onAction={() => console.log("Desbloquear:", item.name)}
                />
              )}
            />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}