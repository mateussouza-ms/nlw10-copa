import { FlatList, useToast } from "native-base";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { EmptyMyPoolList } from "./EmptyMyPoolList";
import { Game, GameProps } from "./Game";
import { Loading } from "./Loading";

interface Props {
  poolId: string;
  poolCode: string;
}

export function Guesses({ poolId, poolCode }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [games, setGames] = useState<GameProps[]>([]);
  const [firstTeamPoints, setFirstTeamPoints] = useState("");
  const [secondTeamPoints, setSecondTeamPoints] = useState("");

  const toast = useToast();

  async function fetchGames() {
    try {
      setIsLoading(true);
      const gamesResponse = await api.get(`/pools/${poolId}/games`);

      setGames(gamesResponse.data.games);
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Não foi possível carregar os jogos.",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleConfirmGuess(gameId: string) {
    if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
      return toast.show({
        title: "Informe o placar do palpite.",
        placement: "top",
        bgColor: "red.500",
      });
    }

    try {
      setIsLoading(true);
      const response = await api.post(
        `/pools/${poolId}/games/${gameId}/guesses`,
        {
          firstTeamPoints: Number(firstTeamPoints),
          secondTeamPoints: Number(secondTeamPoints),
        }
      );

      toast.show({
        title: "Palpite salvo com sucesso!",
        placement: "top",
        bgColor: "green.500",
      });

      fetchGames();
    } catch (error) {
      console.log(error);
      toast.show({
        title: "Não foi possível enviar o palpite.",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    poolId && fetchGames();
  }, [poolId]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <FlatList
      data={games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Game
          data={item}
          setFirstTeamPoints={setFirstTeamPoints}
          setSecondTeamPoints={setSecondTeamPoints}
          onGuessConfirm={() => handleConfirmGuess(item.id)}
        />
      )}
      ListEmptyComponent={<EmptyMyPoolList code={poolCode} />}
    />
  );
}
