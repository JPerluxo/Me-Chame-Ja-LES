import { View, Text, Image, FlatList, Dimensions, Pressable } from "react-native";
import { useRef, useState } from "react";
import { Feather } from "@expo/vector-icons";

const vehicles = [
  {
    id: "1",
    name: "Moto",
    size: "0.4 x 0.4 x 0.3 m",
    weight: "20 kg",
    description: "Ideal para documentos, pacotes pequenos e delivery de comida",
    image: require("../../../assets/MeChameJa-VeiculoMoto.png"),
  },
  {
    id: "2",
    name: "Hatch",
    size: "1 x 0.7 x 0.6 m",
    weight: "200 kg",
    description: "Perfeito para compras de mercado e pacotes médios",
    image: require("../../../assets/MeChameJa-VeiculoCarroHatch.png"),
  },
  {
    id: "3",
    name: "Carro",
    size: "1.2 x 0.8 x 0.6 m",
    weight: "300 kg",
    description: "Espaço adicional em relação à categoria Carro Hatch",
    image: require("../../../assets/MeChameJa-VeiculoCarroSedan.png"),
  },
  {
    id: "4",
    name: "Utilitario",
    size: "1.8 x 1.3 x 1.1 m",
    weight: "500 kg",
    description: "Para eletrodomésticos e pacotes maiores",
    image: require("../../../assets/MeChameJa-VeiculoCarroPickUp.png"),
  },
  {
    id: "5",
    name: "Van",
    size: "2.7 x 1.8 x 1.6 m",
    weight: "1000 kg",
    description: "Ideal para transportar móveis médios, como geladeira e mesa",
    image: require("../../../assets/MeChameJa-VeiculoVan.png"),
  },
  {
    id: "6",
    name: "Caminhão",
    size: "4 x 2.2 x 2.2 m",
    weight: "2500 kg",
    description: "Mudanças, móveis grandes e materiais pesados",
    image: require("../../../assets/MeChameJa-VeiculoCaminhao.png"),
  },
];

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 8 - 12;

type Props = {
  onSelectVehicle: (vehicleName: string) => void;
};

export function VehicleList({ onSelectVehicle }: Props) {
  const listRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleNext = () => {
    if (currentIndex < vehicles.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      listRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      listRef.current?.scrollToIndex({ index: prevIndex, animated: true });
    }
  };

  return (
    <View className="w-full mt-4 relative z-[-1]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-2 mb-3 bg-white rounded-xl shadow p-2">
        <Text className="text-base font-semibold text-[#5E60CE] m-auto">
          Tipo de Veículo
        </Text>
      </View>

      {/* Slider com botões */}
      <View className="flex-row items-center">
        {/* Botão anterior */}
        <Pressable
          onPress={handlePrev}
          className="p-2 rounded-full bg-white shadow mx-1 active:bg-gray-200 absolute left-0 z-10"
        >
          <Feather name="chevron-left" size={20} color="#5E60CE" />
        </Pressable>

        <FlatList
          ref={listRef}
          data={vehicles}
          horizontal
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          snapToInterval={CARD_WIDTH + 12}
          decelerationRate="fast"
          contentContainerStyle={{ padding: 2 }}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(
              event.nativeEvent.contentOffset.x / (CARD_WIDTH + 12)
            );
            setCurrentIndex(index);
          }}
          renderItem={({ item }) => {
            const isSelected = selectedId === item.id;

            return (
              <Pressable
                onPress={() => {
                  setSelectedId(item.id);
                  onSelectVehicle(item.name);
                }}
                style={{ width: CARD_WIDTH }}
                className={`relative min-w-40 mr-3 rounded-xl shadow p-3 cursor-pointer ${
                  isSelected
                    ? "border border-[#5E60CE] bg-violet-50"
                    : "bg-white hover:bg-slate-200"
                }`}
              >
                <View className="items-center">
                  <Image
                    source={
                      typeof item.image === "string"
                        ? { uri: item.image }
                        : item.image
                    }
                    style={{ width: 100, height: 100 }}
                    className="mb-2"
                    resizeMode="contain"
                  />
                  <Text className="text-xs font-semibold text-gray-800 text-center">
                    {item.name}
                  </Text>
                  <Text className="text-[10px] text-gray-500">{item.size}</Text>
                  <Text className="text-[10px] text-gray-500">{item.weight}</Text>
                  <Text className="text-[10px] text-gray-600 mt-1 text-center">
                    {item.description}
                  </Text>
                </View>

                {/* Balãozinho de check */}
                {isSelected && (
                  <View className="absolute bottom-1 right-1 bg-[#5E60CE] rounded-full p-1">
                    <Feather name="check" size={12} color="white" />
                  </View>
                )}
              </Pressable>
            );
          }}
        />

        {/* Botão próximo */}
        <Pressable
          onPress={handleNext}
          className="p-2 rounded-full bg-white shadow mx-1 active:bg-gray-200 absolute right-0 z-10"
        >
          <Feather name="chevron-right" size={20} color="#5E60CE" />
        </Pressable>
      </View>
    </View>
  );
}