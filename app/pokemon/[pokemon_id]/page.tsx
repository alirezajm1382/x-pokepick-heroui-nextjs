"use client";

//hooks
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";

//components
import { title } from "@/components/primitives";
import { Button, Card, Image, Skeleton } from "@heroui/react";

import { Howl } from "howler";

import "@/styles/pages/single-pokemon.css";

export default function SinglePokemonPage() {
  const pokemonId = useParams().pokemon_id;

  //States: (Loading, Pokemon)
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [pokemon, setPokemon] = useState<any>({});

  //Ref: (Sound and cries of the pokemon)
  const legacyCryRef = useRef<any>(null);
  const latestCryRef = useRef<any>(null);

  //Fetch Pokemon function
  const fetchPokemonData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonId}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching pokemon info:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const playCry = (type: "latest" | "legacy") => {
    if (type === "latest") {
      latestCryRef.current?.play();
    } else {
      legacyCryRef.current?.play();
    }
  };

  useEffect(() => {
    const loadPokemonData = async () => {
      const data = await fetchPokemonData();
      setPokemon(data);
      latestCryRef.current = new Howl({
        src: [data.cries.latest],
        autoplay: false,
        format: ["ogg"],
      });
      legacyCryRef.current = new Howl({
        src: [data.cries.legacy],
        autoplay: false,
        format: ["ogg"],
      });
    };
    loadPokemonData();
    return unLoadCries();
  }, []);

  const unLoadCries = () => {
    legacyCryRef.current?.unload();
    latestCryRef.current?.unload();
  };

  return (
    <div className="w-full">
      {!isLoading && pokemon.name !== undefined ? (
        <h1 className={title()}>
          {(pokemon.name as string)[0].toUpperCase() + pokemon.name.slice(1)}
        </h1>
      ) : (
        <div className="flex flex-row justify-center ">
          <Skeleton className="rounded-md w-1/2 md:w-1/3 h-10" />
        </div>
      )}
      <div className="pokemon-header-grid">
        {!isLoading && pokemon?.species && (
          <Card className="pokemon-stats-left">
            <div className="pokemon-stat">
              <h2>Height</h2>
              <div className="pokemon-stat-value">
                <p>{pokemon.height}</p>
              </div>
            </div>
            <div className="pokemon-stat">
              <h2>Weight</h2>
              <div className="pokemon-stat-value">
                <p>{pokemon.weight}</p>
              </div>
            </div>
            <div className="pokemon-stat">
              <h2>Base Experience</h2>
              <div className="pokemon-stat-value">
                <p>{pokemon.base_experience}</p>
              </div>
            </div>
            <div className="pokemon-stat">
              <h2>Species</h2>
              <div className="pokemon-stat-value">
                <p>
                  {pokemon.species?.name[0].toUpperCase() +
                    pokemon.species.name.slice(1)}
                </p>
              </div>
            </div>
          </Card>
        )}
        <div className="pokemon-sprite">
          {!isLoading ? (
            <Image
              alt={pokemon.name}
              className="object-contain m-auto"
              width={"100%"}
              src={pokemon.sprites?.other["official-artwork"].front_default}
            />
          ) : (
            <Skeleton className="w-full h-full" />
          )}
        </div>
        {!isLoading && pokemon?.types && (
          <Card className="pokemon-stats-right">
            <div className="pokemon-stat">
              <h2>Type</h2>
              <div className="pokemon-stat-value">
                {pokemon.types[0].type.name[0].toUpperCase() +
                  pokemon.types[0].type.name.slice(1)}
              </div>
            </div>
            <div className="pokemon-stat flex flex-col gap-2">
              <Button
                className="cry-button"
                variant="shadow"
                color="primary"
                onPress={() => playCry("latest")}
              >
                Play Latest Cry
              </Button>
              <Button
                className="cry-button"
                variant="shadow"
                color="default"
                onPress={() => playCry("legacy")}
              >
                Play Legacy Cry
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
