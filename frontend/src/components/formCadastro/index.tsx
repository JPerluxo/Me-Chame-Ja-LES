import { useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { userApi } from "~/apis/userApi";
import { FeedbackModal } from "~/components/feedbackModal";

type Props = {
  tipoUsuario: "cliente" | "motorista";
  goBack: () => void;
};

export function FormCadastro({ tipoUsuario, goBack }: Props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");

  // Modal de feedback
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalSuccess, setModalSuccess] = useState(true);

  // Validações de campos
  const isNomeValid = nome.length > 0 && nome.length <= 20;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isSenhaValid = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(senha);
  const isTelefoneValid = /^\(\d{2}\)\s\d{5}-\d{4}$/.test(telefone);

  // Máscara visual de telefone
  const formatTelefone = (value: string) => {
    let digits = value.replace(/\D/g, "");
    if (digits.length > 11) digits = digits.slice(0, 11);
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  // Remove máscara para enviar ao backend (Banco de dados guarda sem máscara)
  const cleanTelefone = (value: string) => value.replace(/\D/g, "");

  // Submit
  const handleSubmit = async () => {
    if (!isNomeValid || !isEmailValid || !isSenhaValid || !isTelefoneValid) {
      setModalMessage("Preencha todos os campos corretamente!");
      setModalSuccess(false);
      setModalVisible(true);
      return;
    }

    try {
      const payload = {
        name: nome,
        email: email,
        password: senha,
        cellphone: cleanTelefone(telefone),
        type: tipoUsuario === "cliente" ? "solicitante" : "motorista",
      };

      const response = await userApi.saveUser(payload);

      // se o backend não deu erro (200/201)
      if (response.message?.toLowerCase().includes("sucesso")) {
        setModalMessage("Usuário cadastrado com sucesso!");
        setModalSuccess(true);

        // limpa os campos
        setNome("");
        setEmail("");
        setSenha("");
        setTelefone("");
      } else {
        setModalMessage(response.message || "Erro ao cadastrar usuário.");
        setModalSuccess(false);
      }

      setModalVisible(true);
    } catch (error: any) {
      console.error(error);

      // trata especificamente o caso de usuário já existente
      if (
        error.response?.data?.message?.includes(
          "Já existe um usuário com os critérios especificados"
        )
      ) {
        setModalMessage("Esse usuário já existe!");
        setModalSuccess(false);
      } else {
        setModalMessage("Ocorreu um problema ao cadastrar.");
        setModalSuccess(false);
      }

      setModalVisible(true);
    }
  };


  return (
    <View className="w-full max-w-md bg-white rounded-2xl p-8 shadow-lg">
      <Text className="text-center text-2xl font-bold text-[#5E60CE] mb-6">
        Cadastro - {tipoUsuario === "cliente" ? "Solicitante" : "Motorista"}
      </Text>

      {/* Nome */}
      <TextInput
        value={nome}
        onChangeText={setNome}
        placeholder="Nome e Sobrenome"
        maxLength={20}
        className="w-full h-12 px-4 border rounded-lg mb-4"
        style={{
          borderColor: isNomeValid ? "green" : "gray",
          backgroundColor: "#f9f9f9",
        }}
      />

      {/* Email */}
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="email@email.com"
        keyboardType="email-address"
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
        className="w-full h-12 px-4 border rounded-lg mb-1"
        style={{
          borderColor: isSenhaValid ? "green" : "gray",
          backgroundColor: "#f9f9f9",
        }}
      />
      <View className="h-2 w-full bg-gray-200 rounded mb-4">
        <View
          style={{
            height: "100%",
            width: `${Math.min(senha.length * 10, 100)}%`,
            backgroundColor: isSenhaValid ? "green" : "orange",
          }}
        />
      </View>

      {/* Telefone */}
      <TextInput
        value={telefone}
        onChangeText={(text) => setTelefone(formatTelefone(text))}
        placeholder="(11) 91234-1234"
        keyboardType="phone-pad"
        className="w-full h-12 px-4 border rounded-lg mb-4"
        style={{
          borderColor: isTelefoneValid ? "green" : "gray",
          backgroundColor: "#f9f9f9",
        }}
      />

      {/* Tipo usuário fixo */}
      <View className="w-full h-12 px-4 border rounded-lg mb-4 bg-gray-100 flex justify-center">
        <Text className="text-gray-700">
          Tipo: {tipoUsuario === "cliente" ? "Solicitante" : "Motorista"}
        </Text>
      </View>

      {/* Botão cadastrar */}
      <Pressable
        onPress={handleSubmit}
        className="w-full h-12 bg-[#5E60CE] rounded-lg flex items-center justify-center mt-2"
      >
        <Text className="text-white font-semibold text-lg">Cadastrar</Text>
      </Pressable>

      {/* Voltar */}
      <Pressable
        onPress={goBack}
        className="mt-6 w-full h-12 border border-gray-300 rounded-lg flex items-center justify-center"
      >
        <Text className="text-gray-600 font-medium">Voltar</Text>
      </Pressable>

      {/* Modal de feedback */}
      <FeedbackModal
        visible={modalVisible}
        message={modalMessage}
        success={modalSuccess}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}