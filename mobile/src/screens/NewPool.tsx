import { Heading, Text, useToast, VStack } from "native-base";

import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { Input } from "../components/Input";

import { useState } from "react";
import Logo from "../assets/logo.svg";
import { api } from "../services/api";

export function NewPool() {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toast = useToast();

  async function handlePoolCreate() {
    if (!title.trim()) {
      return toast.show({
        title: "Informe um nome para o bolão!",
        placement: "top",
        bgColor: "red.500",
      });
    }

    try {
      setIsSubmitting(true);
      await api.post("/pools", { title });

      toast.show({
        title: "Bolão criado com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });
      setTitle("");
    } catch (error) {
      toast.show({
        title: "Não foi possível criar o bolão!",
        placement: "top",
        bgColor: "red.500",
      });

      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <VStack flex={1} bg="gray.900">
      <Header title="Criar novo bolão" />

      <VStack mt={8} mx={5} alignItems="center">
        <Logo />

        <Heading
          fontFamily="heading"
          color="white"
          fontSize="xl"
          my={8}
          textAlign="center"
        >
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </Heading>

        <Input
          mb={2}
          placeholder="Qual nome do seu bolão?"
          value={title}
          onChangeText={setTitle}
        />

        <Button
          title="Criar meu bolão"
          onPress={handlePoolCreate}
          isLoading={isSubmitting}
        />

        <Text color="gray.200" fontSize="sm" textAlign="center" px={10} mt={4}>
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas.
        </Text>
      </VStack>
    </VStack>
  );
}
