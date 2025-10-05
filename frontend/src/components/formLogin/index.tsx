import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "~/context/AuthContext";

type Props = {
  goBack: () => void;
  onLoginSuccess: () => void;
};

export function FormLogin({ goBack, onLoginSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isSenhaValid = senha.length >= 8;

  const handleLogin = async () => {
    if (!isEmailValid || !isSenhaValid) {
      Alert.alert("Erro", "Preencha os campos corretamente.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post("http://localhost:3000/user/login", {
        email,
        password: senha,
      });

      console.log("📥 Resposta do backend (raw):", response.data);

      if (response.data.success && response.data.user) {
        const u = response.data.user;

        // Normaliza os campos vindos do backend
        const user = {
          id: u.id || u.usuario_id || null,
          name: u.name || u.nome || "Usuário",
          email: u.email || "",
          password: u.password || u.senha || "",
          cellphone: u.cellphone || u.telefone || "",
          type: u.type || u.tipo_usuario || "",
          createdAt: u.createdAt || u.criado_em || null,
        };

        // Mostra no console o que vai ser salvo no AsyncStorage
        console.log("💾 Usuário normalizado e salvo no cache:", user);

        // Salva no contexto e localStorage
        login(user);
        await AsyncStorage.setItem("usuarioLogado", JSON.stringify(user));

        Alert.alert("Sucesso", `Bem-vindo, ${user.name.split(" ")[0]}!`);
        onLoginSuccess();
      } else {
        Alert.alert("Erro", response.data.message || "Falha no login.");
      }
    } catch (error: any) {
      console.error("❌ Erro ao logar:", error);
      Alert.alert("Erro", "Não foi possível realizar o login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg">
      <Text className="text-center text-2xl font-bold text-[#5E60CE] mb-6">
        Login
      </Text>

      {/* Email */}
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        className="w-full h-12 px-4 border rounded-lg mb-4"
        style={{
          borderColor: isEmailValid ? "green" : "gray",
          backgroundColor: "#f9f9f9",
        }}
      />

      {/* Senha */}
      <TextInput
        value={senha}
        onChangeText={setSenha}
        placeholder="Senha"
        secureTextEntry
        className="w-full h-12 px-4 border rounded-lg mb-4"
        style={{
          borderColor: isSenhaValid ? "green" : "gray",
          backgroundColor: "#f9f9f9",
        }}
      />

      {/* Botão Entrar */}
      <Pressable
        onPress={handleLogin}
        disabled={loading}
        className="w-full h-12 bg-[#5E60CE] rounded-lg flex items-center justify-center mt-2"
      >
        <Text className="text-white font-semibold text-lg">
          {loading ? "Entrando..." : "Entrar"}
        </Text>
      </Pressable>

      {/* Voltar */}
      <Pressable
        onPress={goBack}
        className="mt-6 w-full h-12 border border-gray-300 rounded-lg flex items-center justify-center"
      >
        <Text className="text-gray-600 font-medium">Voltar</Text>
      </Pressable>
    </View>
  );
}