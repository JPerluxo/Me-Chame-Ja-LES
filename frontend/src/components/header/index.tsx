import {
  View,
  Text,
  Pressable,
  Image,
  Animated,
  Dimensions,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");
const isMobile = width < 768;
const DRAWER_WIDTH = isMobile ? width : width * 0.3;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [user, setUser] = useState<{ name?: string; email?: string } | null>(
    null
  );

  const menuAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
  const notifAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;
  const router = useRouter();

  // Carregar o usuário logado do AsyncStorage
  useEffect(() => {
    const carregarUsuario = async () => {
      try {
        const dados = await AsyncStorage.getItem("usuarioLogado");
        if (dados) setUser(JSON.parse(dados));
      } catch (err) {
        console.error("Erro ao carregar usuário logado:", err);
      }
    };
    carregarUsuario();
  }, []);

  // Logout do usuário
  const handleLogout = async () => {
    await AsyncStorage.removeItem("usuarioLogado");
    setUser(null);
    toggleMenu();
    router.push("/");
  };

  // Animações do menu
  const toggleMenu = () => {
    if (isMenuOpen) {
      Animated.timing(menuAnim, {
        toValue: -DRAWER_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsMenuOpen(false));
    } else {
      setIsMenuOpen(true);
      Animated.timing(menuAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const toggleNotif = () => {
    if (isNotifOpen) {
      Animated.timing(notifAnim, {
        toValue: width,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setIsNotifOpen(false));
    } else {
      setIsNotifOpen(true);
      Animated.timing(notifAnim, {
        toValue: width - DRAWER_WIDTH,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <>
      {/* HEADER */}
      <LinearGradient
        colors={["#4EA8DE", "#5E60CE", "#4EA8DE"]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
      >
        <View className="w-full flex flex-row items-center justify-between p-1 shadow-md">
          {/* Botão de Menu */}
          <Pressable
            onPress={toggleMenu}
            className="p-1.5 mx-2 rounded-full bg-gray-100 active:bg-gray-300 hover:bg-slate-200"
          >
            <Ionicons name="menu" size={24} color="#333" />
          </Pressable>

          {/* Logo */}
          <Pressable
            className="flex items-center m-auto rounded-full p-2 hover:bg-slate-100/20"
            style={({ pressed }) => [
              {
                backgroundColor: pressed
                  ? "rgba(255,255,255,0.2)"
                  : "transparent",
              },
            ]}
            onPress={() => router.push("home")}
          >
            <Image
              source={require("../../../assets/MeChameJa-Logo.png")}
              style={{ width: 38, height: 38 }}
              resizeMode="contain"
            />
          </Pressable>

          {/* Botão de Notificação */}
          <Pressable
            onPress={toggleNotif}
            className="p-1.5 mx-2 rounded-full bg-gray-100 active:bg-gray-300 hover:bg-slate-200"
          >
            <Feather name="bell" size={24} color="#333" />
          </Pressable>
        </View>
      </LinearGradient>

      {/* MENU DRAWER */}
      {isMenuOpen && (
        <Pressable
          onPress={toggleMenu}
          className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"
        >
          <Animated.View
            style={{
              transform: [{ translateX: menuAnim }],
              width: DRAWER_WIDTH,
              backgroundColor: "white",
              flexGrow: 1,
            }}
            className="absolute top-0 left-0 h-full p-5 z-10"
          >
            {/* Botão fechar */}
            <Pressable
              onPress={toggleMenu}
              className="absolute top-3 right-0 p-2 rounded-full hover:bg-slate-200"
            >
              <Feather name="x" size={22} color="#333" />
            </Pressable>

            {/* Foto de perfil / Nome do usuário */}
            <Pressable
              onPress={() => {
                toggleMenu();
                router.push("/profile");
              }}
              className="flex-row items-center mb-6 mt-10 hover:bg-slate-200 rounded-lg p-2"
            >
              <Ionicons name="person-circle-outline" size={40} color="#5E60CE" />
              <Text className="ml-3 text-lg font-semibold text-gray-800">
                {user
                  ? `Olá, ${user.name?.split(" ")[0]}`
                  : "Login / Cadastro"}
              </Text>
            </Pressable>

            {/* Lista de opções */}
            {[
              { label: "Meus Pedidos", route: "/orders" },
              { label: "Minha Carteira", route: "/wallet" },
              { label: "Formulário de Entrega", route: "/form" },
              { label: "Motoristas Favoritos", route: "/drivers" },
              { label: "Centro de Fidelidade", route: "/fidelity" },
              { label: "Suporte e Atendimento", route: "/policies" },
              { label: "Configurações", route: "/config" },
            ].map((item, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  toggleMenu();
                  router.push(item.route);
                }}
                className="py-3 border-b border-gray-200 hover:bg-slate-200 rounded-lg px-2"
              >
                <Text className="text-base text-gray-700">{item.label}</Text>
              </Pressable>
            ))}

            {/* Botão de sair */}
            {user && (
              <View className="flex w-full items-center">
                <Pressable
                  onPress={handleLogout}
                  className="w-fit mt-10 py-3 px-6 bg-[#5E60CE] rounded-lg"
                >
                  <Text className="text-white font-semibold">Sair</Text>
                </Pressable>
              </View>
            )}
          </Animated.View>
        </Pressable>
      )}

      {/* NOTIFICAÇÕES DRAWER */}
      {isNotifOpen && (
        <Pressable
          onPress={toggleNotif}
          className="absolute top-0 left-0 w-full h-full bg-black/40 z-10"
        >
          <Animated.View
            style={{
              transform: [{ translateX: notifAnim }],
              width: DRAWER_WIDTH,
              backgroundColor: "white",
              flexGrow: 1,
            }}
            className="absolute top-0 right-0 h-full bg-white p-5 z-10"
          >
            {/* Botão fechar */}
            <Pressable
              onPress={toggleNotif}
              className="absolute top-3 left-3 p-2 rounded-full hover:bg-slate-200"
            >
              <Feather name="x" size={22} color="#333" />
            </Pressable>

            {/* Conteúdo de notificações */}
            <Text className="mt-12 text-lg font-semibold text-gray-800">
              Notificações
            </Text>
            <View className="mt-4 space-y-3">
              <Text className="text-gray-600 hover:bg-slate-200 p-2 rounded-lg">
                🚚 Seu pedido #1234 está a caminho
              </Text>
              <Text className="text-gray-600 hover:bg-slate-200 p-2 rounded-lg">
                🎉 Promoção: 10% OFF em entregas hoje
              </Text>
            </View>
          </Animated.View>
        </Pressable>
      )}
    </>
  );
}