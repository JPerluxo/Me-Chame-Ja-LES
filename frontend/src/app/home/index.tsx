import { useEffect, useState } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Header } from "~/components/header";
import { Map } from "~/components/map";
import { SearchBar } from "~/components/searchbar";
import { VehicleList } from "~/components/vehiclelist";
import { CategoryList } from "~/components/categoryList";
import { RouteDetails } from "~/components/routeDetails";
import { TripList } from "~/components/tripList";

export default function Home() {
  const [userType, setUserType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // Estados de rota (usados pelo solicitante)
  const [retirada, setRetirada] = useState<{ lat: number; lon: number } | null>(null);
  const [paradas, setParadas] = useState<{ lat: number; lon: number }[]>([]);
  const [destino, setDestino] = useState<{ lat: number; lon: number } | null>(null);
  const [resumoRota, setResumoRota] = useState<{ distanciaKm: number; duracaoMin: number } | null>(null);

  // 🔹 Carrega o tipo de usuário salvo no cache
  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const dados = await AsyncStorage.getItem("usuarioLogado");
        if (dados) {
          const user = JSON.parse(dados);
          setUserType(user.type);
        }
      } catch (error) {
        console.error("Erro ao carregar usuário logado:", error);
      } finally {
        setLoading(false);
      }
    };
    carregarUsuario();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#5E60CE" />
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#4EA8DE", "#5E60CE", "#4EA8DE"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ flex: 1 }}
    >
      <View className="flex-1">
        <Header />

        <View className="flex-1 flex-col xl:flex-row">
          {/* Mapa */}
          <View className="xl:flex-[2] min-h-48 m-1">
            <Map
              retirada={retirada}
              paradas={paradas}
              destino={destino}
              onResumoRota={setResumoRota}
            />
          </View>

          {/* Conteúdo lateral */}
          <View className="flex-1">
            <ScrollView
              contentContainerClassName="flex flex-col gap-4 m-1"
              showsVerticalScrollIndicator={true}
            >
              {userType === "solicitante" ? (
                <>
                  <SearchBar
                    onSetRetirada={setRetirada}
                    onSetParadas={setParadas}
                    onSetDestino={setDestino}
                  />
                  <VehicleList />
                  <CategoryList />
                </>
              ) : (
                <TripList />
              )}
            </ScrollView>

            {/* Mostra o resumo de rota apenas para o solicitante */}
            {userType === "solicitante" && resumoRota && (
              <RouteDetails
                distanciaKm={resumoRota.distanciaKm}
                duracaoMin={resumoRota.duracaoMin}
                onConfirmar={() => console.log("Confirmar rota")}
              />
            )}
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}