import { useState } from "react";
import { View, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Header } from "~/components/header";
import { SearchBar } from "~/components/searchbar";
import { Map } from "~/components/map";
import { VehicleList } from "~/components/vehiclelist";
import { CategoryList } from "~/components/categoryList";
import { RouteDetails } from "~/components/routeDetails";

export default function Home() {
  const [retirada, setRetirada] = useState<{ lat: number; lon: number } | null>(
    null
  );
  const [paradas, setParadas] = useState<{ lat: number; lon: number }[]>([]);
  const [destino, setDestino] = useState<{ lat: number; lon: number } | null>(
    null
  );

  const [resumoRota, setResumoRota] = useState<{
    distanciaKm: number;
    duracaoMin: number;
  } | null>(null);

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
              <SearchBar
                onSetRetirada={setRetirada}
                onSetParadas={setParadas}
                onSetDestino={setDestino}
              />
              <VehicleList />
              <CategoryList />
            </ScrollView>
            {/* Detalhes da rota fixo no bottom */}
            {resumoRota && (
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