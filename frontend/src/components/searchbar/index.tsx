import { useState, useRef } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Keyboard,
} from "react-native";
import {
  Entypo,
  Fontisto,
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { GOOGLE_MAPS_API_KEY } from "@env";

type Coords = { lat: number; lon: number };

// 'retirada' | 'destino' | número da parada extra | null
type OpenKey = "retirada" | "destino" | number | null;

type Props = {
  onSetRetirada: (coords: Coords | null) => void;
  onSetParadas: (coords: Coords[]) => void;
  onSetDestino: (coords: Coords | null) => void;
};

const INPUT_ROW_HEIGHT = 48;
const SUGGESTION_LIMIT = 5;

type Suggestion = { label: string; lat: number; lon: number };

// ---- Função de busca via REST ----
async function buscarSugestoes(query: string): Promise<Suggestion[]> {
  if (!query.trim()) return [];

  try {
    // 1. Autocomplete
    const resp = await fetch(
      `https://places.googleapis.com/v1/places:autocomplete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
          "X-Goog-FieldMask":
            "suggestions.placePrediction.placeId,suggestions.placePrediction.text",
        },
        body: JSON.stringify({
          input: query,
          languageCode: "pt-BR",
          regionCode: "BR",
        }),
      }
    );

    const data = await resp.json();
    if (!data.suggestions) return [];

    const results: Suggestion[] = [];

    // 2. Buscar detalhes de cada placeId
    for (const sug of data.suggestions.slice(0, SUGGESTION_LIMIT)) {
      const placeId = sug.placePrediction?.placeId;
      if (!placeId) continue;

      try {
        const detailResp = await fetch(
          `https://places.googleapis.com/v1/places/${placeId}?languageCode=pt-BR&regionCode=BR`,
          {
            headers: {
              "X-Goog-Api-Key": GOOGLE_MAPS_API_KEY,
              "X-Goog-FieldMask": "id,formattedAddress,location",
            },
          }
        );

        const detail = await detailResp.json();
        if (detail?.location) {
          results.push({
            label:
              sug.placePrediction?.text?.text ||
              detail.formattedAddress ||
              "Endereço encontrado",
            lat: detail.location.latitude,
            lon: detail.location.longitude,
          });
        }
      } catch (err) {
        console.error("Erro ao buscar detalhes do placeId:", err);
      }
    }

    return results;
  } catch (err) {
    console.error("Erro no autocomplete REST:", err);
    return [];
  }
}

// ---- componente principal ----
export function SearchBar({ onSetRetirada, onSetParadas, onSetDestino }: Props) {
  const [retirada, setRetirada] = useState("");
  const [destino, setDestino] = useState("");
  const [extraDestinos, setExtraDestinos] = useState<string[]>([]);
  const [paradasCoords, setParadasCoords] = useState<(Coords | null)[]>([]);

  const [sugestoesRetirada, setSugestoesRetirada] = useState<Suggestion[]>([]);
  const [sugestoesDestino, setSugestoesDestino] = useState<Suggestion[]>([]);
  const [sugestoesExtras, setSugestoesExtras] = useState<Record<number, Suggestion[]>>({});

  const [openDropdown, setOpenDropdown] = useState<OpenKey>(null);

  const debounceRetiradaRef = useRef<NodeJS.Timeout | null>(null);
  const debounceDestinoRef = useRef<NodeJS.Timeout | null>(null);
  const debounceExtrasRef = useRef<Record<number, NodeJS.Timeout | null>>({});

  function atualizarParadasNoPai(novas: (Coords | null)[]) {
    onSetParadas((novas.filter(Boolean) as Coords[]));
  }

  function closeAllDropdowns() {
    setOpenDropdown(null);
    setSugestoesRetirada([]);
    setSugestoesDestino([]);
    setSugestoesExtras({});
  }

  // ---- retirada ----
  function handleChangeRetirada(texto: string) {
    setRetirada(texto);
    if (debounceRetiradaRef.current) clearTimeout(debounceRetiradaRef.current);
    if (texto.length <= 3) {
      setSugestoesRetirada([]);
      onSetRetirada(null);
      if (openDropdown === "retirada") setOpenDropdown(null);
      return;
    }
    setOpenDropdown("retirada");
    debounceRetiradaRef.current = setTimeout(async () => {
      const lista = await buscarSugestoes(texto);
      setSugestoesRetirada(lista);
      if (lista.length === 0 && openDropdown === "retirada") setOpenDropdown(null);
    }, 600);
  }

  function handleSelectRetirada(item: Suggestion) {
    setRetirada(item.label);
    setSugestoesRetirada([]);
    setOpenDropdown(null);
    onSetRetirada({ lat: item.lat, lon: item.lon });
    Keyboard.dismiss();
  }

  // ---- destino ----
  function handleChangeDestino(texto: string) {
    setDestino(texto);
    if (debounceDestinoRef.current) clearTimeout(debounceDestinoRef.current);
    if (texto.length <= 3) {
      setSugestoesDestino([]);
      onSetDestino(null);
      if (openDropdown === "destino") setOpenDropdown(null);
      return;
    }
    setOpenDropdown("destino");
    debounceDestinoRef.current = setTimeout(async () => {
      const lista = await buscarSugestoes(texto);
      setSugestoesDestino(lista);
      if (lista.length === 0 && openDropdown === "destino") setOpenDropdown(null);
    }, 600);
  }

  function handleSelectDestino(item: Suggestion) {
    setDestino(item.label);
    setSugestoesDestino([]);
    setOpenDropdown(null);
    onSetDestino({ lat: item.lat, lon: item.lon });
    Keyboard.dismiss();
  }

  // ---- paradas extras ----
  function handleChangeExtra(texto: string, index: number) {
    const novos = [...extraDestinos];
    novos[index] = texto;
    setExtraDestinos(novos);

    if (debounceExtrasRef.current[index]) {
      clearTimeout(debounceExtrasRef.current[index] as NodeJS.Timeout);
    }

    if (texto.length <= 3) {
      setSugestoesExtras((prev) => ({ ...prev, [index]: [] }));
      const novasCoords = [...paradasCoords];
      novasCoords[index] = null;
      setParadasCoords(novasCoords);
      atualizarParadasNoPai(novasCoords);
      if (openDropdown === index) setOpenDropdown(null);
      return;
    }

    setOpenDropdown(index);
    debounceExtrasRef.current[index] = setTimeout(async () => {
      const lista = await buscarSugestoes(texto);
      setSugestoesExtras((prev) => ({ ...prev, [index]: lista }));
      if (lista.length === 0 && openDropdown === index) setOpenDropdown(null);
    }, 600);
  }

  function handleSelectExtra(item: Suggestion, index: number) {
    const novosTxt = [...extraDestinos];
    novosTxt[index] = item.label;
    setExtraDestinos(novosTxt);

    setSugestoesExtras((prev) => ({ ...prev, [index]: [] }));
    setOpenDropdown(null);

    const novasCoords = [...paradasCoords];
    while (novasCoords.length < novosTxt.length) novasCoords.push(null);
    novasCoords[index] = { lat: item.lat, lon: item.lon };
    setParadasCoords(novasCoords);
    atualizarParadasNoPai(novasCoords);
    Keyboard.dismiss();
  }

  function handleAddDestino() {
    setExtraDestinos((prev) => [...prev, ""]);
    setParadasCoords((prev) => [...prev, null]);
  }

  function handleRemoveDestino(index: number) {
    const novosTxt = extraDestinos.filter((_, i) => i !== index);
    setExtraDestinos(novosTxt);

    const novasCoords = paradasCoords.filter((_, i) => i !== index);
    setParadasCoords(novasCoords);
    atualizarParadasNoPai(novasCoords);

    setSugestoesExtras((prev) => {
      const clone = { ...prev };
      delete clone[index];
      return clone;
    });

    if (debounceExtrasRef.current[index]) {
      clearTimeout(debounceExtrasRef.current[index] as NodeJS.Timeout);
      delete debounceExtrasRef.current[index];
    }

    if (openDropdown === index) setOpenDropdown(null);
  }

  const dropdownStyle = {
    position: "absolute" as const,
    top: INPUT_ROW_HEIGHT,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 20,
    zIndex: 999,
    overflow: "hidden" as const,
  };

  return (
    <View className="w-full mt-4">
      {/* Header */}
      <View className="flex-row items-center justify-between bg-white px-2 mb-3 rounded-xl shadow p-2">
        <Text className="text-base font-semibold text-[#5E60CE] text-center m-auto">
          Rota
        </Text>
      </View>

      {/* Card */}
      <View
        className="w-full min-w-fit bg-white rounded-xl shadow-md p-2 mb-4 z-10"
        style={{ overflow: "visible" }}
      >
        {/* RETIRADA */}
        <View
          style={{
            position: "relative",
            zIndex: openDropdown === "retirada" ? 30 : 1,
            marginBottom: 8,
          }}
        >
          <View
            className="flex flex-row items-center border-b border-slate-400 bg-white rounded-t-md"
            style={{ height: INPUT_ROW_HEIGHT }}
          >
            <View className="w-5">
              <Entypo name="circle" size={20} color="#5390D9" />
            </View>
            <TextInput
              placeholder="Retirada (Rua e número)"
              value={retirada}
              onChangeText={handleChangeRetirada}
              className="flex-1 text-sm text-gray-700 p-2"
              placeholderTextColor="#999"
            />
            <Picker selectedValue="Agora" onValueChange={() => {}}>
              <Picker.Item label="Agora" value="Agora" />
              <Picker.Item label="Agendar" value="Agendar" />
            </Picker>
          </View>

          {openDropdown === "retirada" && sugestoesRetirada.length > 0 && (
            <View style={dropdownStyle} className="z-20">
              <ScrollView keyboardShouldPersistTaps="handled">
                {sugestoesRetirada.map((item, idx) => (
                  <TouchableOpacity
                    key={`retirada-${idx}`}
                    onPress={() => handleSelectRetirada(item)}
                    style={{
                      justifyContent: "center",
                      borderBottomWidth: 1,
                      borderBottomColor: "#eee",
                    }}
                    className="px-2 py-3 hover:bg-slate-200"
                  >
                    <Text style={{ fontSize: 14, color: "#333" }}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* PARADAS */}
        {extraDestinos.map((valor, index) => (
          <View
            key={index}
            style={{
              position: "relative",
              zIndex: openDropdown === index ? 30 : 1,
              marginBottom: 8,
            }}
          >
            <View
              className="flex flex-row items-center border-b border-slate-400 bg-white"
              style={{ height: INPUT_ROW_HEIGHT }}
            >
              <View className="w-5">
                <MaterialCommunityIcons name="dots-vertical" size={20} color="#64DFDF" />
              </View>
              <TextInput
                placeholder={`Parada ${index + 1}`}
                value={valor}
                onChangeText={(t) => handleChangeExtra(t, index)}
                className="flex-1 text-sm text-gray-700 p-2"
                placeholderTextColor="#999"
              />
              <Pressable onPress={() => handleRemoveDestino(index)} className="px-2 py-1">
                <Ionicons name="close-outline" size={22} color="#E63946" />
              </Pressable>
            </View>

            {openDropdown === index && (sugestoesExtras[index]?.length ?? 0) > 0 && (
              <View style={dropdownStyle} className="z-20">
                <ScrollView keyboardShouldPersistTaps="handled">
                  {sugestoesExtras[index]!.map((item, idx2) => (
                    <TouchableOpacity
                      key={`extra-${index}-${idx2}`}
                      onPress={() => handleSelectExtra(item, index)}
                      style={{
                        justifyContent: "center",
                        borderBottomWidth: 1,
                        borderBottomColor: "#eee",
                      }}
                      className="px-2 py-3 hover:bg-slate-200"
                    >
                      <Text style={{ fontSize: 14, color: "#333" }}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        ))}

        {/* DESTINO */}
        <View
          style={{
            position: "relative",
            zIndex: openDropdown === "destino" ? 30 : 1,
            marginBottom: 8,
          }}
        >
          <View
            className="flex flex-row items-center border-b border-slate-400 bg-white"
            style={{ height: INPUT_ROW_HEIGHT }}
          >
            <View className="w-5">
              <Fontisto name="map-marker-alt" size={20} color="#5390D9" />
            </View>
            <TextInput
              placeholder="Destino (Rua e número)"
              value={destino}
              onChangeText={handleChangeDestino}
              className="flex-1 text-sm text-gray-700 p-2"
              placeholderTextColor="#999"
            />
          </View>

          {openDropdown === "destino" && sugestoesDestino.length > 0 && (
            <View style={dropdownStyle} className="z-20">
              <ScrollView keyboardShouldPersistTaps="handled">
                {sugestoesDestino.map((item, idx) => (
                  <TouchableOpacity
                    key={`destino-${idx}`}
                    onPress={() => handleSelectDestino(item)}
                    style={{
                      justifyContent: "center",
                      borderBottomWidth: 1,
                      borderBottomColor: "#eee",
                    }}
                    className="px-2 py-3 hover:bg-slate-200"
                  >
                    <Text style={{ fontSize: 14, color: "#333" }}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        {/* Adicionar parada */}
        <Pressable
          onPress={handleAddDestino}
          className="flex flex-row items-center justify-center py-2 rounded-b-md"
        >
          <FontAwesome name="plus" size={16} color="#5E60CE" />
          <Text className="ml-2 text-base font-medium text-[#5E60CE]">
            Adicionar ponto de entrega
          </Text>
        </Pressable>
      </View>

      {openDropdown !== null && (
        <Pressable
          onPress={closeAllDropdowns}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      )}
    </View>
  );
}