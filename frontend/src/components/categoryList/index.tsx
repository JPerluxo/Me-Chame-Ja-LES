import { View, Text, Image, FlatList, Dimensions, Pressable, TextInput } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Feather } from "@expo/vector-icons";

const categories = [
  {
    id: "1",
    name: "Documentos",
    description: "Papéis, contratos, envelopes",
    image: require("../../../assets/MeChameJa-CategoriaDocumentos.png"),
  },
  {
    id: "2",
    name: "Comida",
    description: "Marmitas, lanches, bebidas",
    image: require("../../../assets/MeChameJa-CategoriaComida.png"),
  },
  {
    id: "3",
    name: "Produtos Pequenos",
    description: "Caixas pequenas, eletrônicos",
    image: require("../../../assets/MeChameJa-CategoriaProdutosPequenos.png"),
  },
  {
    id: "4",
    name: "Mudanças",
    description: "Móveis, eletrodomésticos",
    image: require("../../../assets/MeChameJa-CategoriaMudancas.png"),
  },
  {
    id: "5",
    name: "Materiais de Construção",
    description: "Cimento, madeira, ferramentas",
    image: require("../../../assets/MeChameJa-CategoriaMateriaisDeConstrucao.png"),
  },
  {
    id: "6",
    name: "Outros",
    description: "Informe manualmente",
    image: require("../../../assets/MeChameJa-CategoriaOutros.png"),
  },
];

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 8 - 12;

type Props = {
  onSelectCategory: (categoryName: string) => void;
};

export function CategoryList({ onSelectCategory }: Props) {
  const listRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [customCategory, setCustomCategory] = useState("");

  const handleNext = () => {
    if (currentIndex < categories.length - 1) {
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

  useEffect(() => {
    if (selectedId === "6" && customCategory) {
      onSelectCategory(customCategory);
    }
  }, [customCategory]);

  return (
    <View className="w-full mt-4 relative z-[-1]">
      {/* Header */}
      <View className="flex-row items-center justify-between px-2 mb-3 bg-white rounded-xl shadow p-2">
        <Text className="text-base font-semibold text-[#5E60CE] m-auto">
          Categoria do Produto
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
          data={categories}
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
                  onSelectCategory(item.name);
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
                    style={{ width: 48, height: 48 }}
                    className="mb-2"
                    resizeMode="contain"
                  />
                  <Text className="text-xs font-semibold text-gray-800 text-center">
                    {item.name}
                  </Text>
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

      {/* Campo "Outros" fora do card */}
      {selectedId === "6" && (
        <TextInput
          placeholder="Digite a categoria"
          value={customCategory}
          onChangeText={setCustomCategory}
          className="mt-3 p-3 border border-gray-300 rounded-lg bg-white text-sm w-full"
        />
      )}
    </View>
  );
}