"use client";

//hooks
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

//components
import { subtitle } from "../primitives";
import { Button, Card, CardFooter, CardHeader, Image } from "@heroui/react";

const PokemonGrid: React.FunctionComponent = () => {
  const router = useRouter();

  //States: (Loading, Urls and Pokemons)
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [currentPageUrl, setCurrentPageUrl] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState<string>(
    "https://pokeapi.co/api/v2/pokemon?offset=20&limit=20"
  );
  const [pokemons, setPokemons] = useState<{ name: string; url: string }[]>([]);

  //Fetch Pokemons function
  const fetchPokemons = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(currentPageUrl);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching pokemons:", error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextClick = () => {
    setCurrentPageUrl(nextPageUrl);
  };

  useEffect(() => {
    const loadPokemons = async () => {
      const data = await fetchPokemons();
      setNextPageUrl(data.next);
      setPokemons([...pokemons, ...data.results]);
    };
    loadPokemons();
  }, [currentPageUrl]);

  return (
    <div className="mt-6 w-full">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {pokemons.map((pokemon, i) => (
          <Card
            onPress={() => {
              router.push(`/pokemon/${i + 1}`);
            }}
            isPressable
            isFooterBlurred
            isHoverable
            key={i}
            className="h-[300px] relative flex flex-col justify-center items-center"
          >
            <CardHeader className="items-center justify-center h-[200px] w-full">
              <Image
                alt={pokemon.name}
                className="object-fill"
                width={"100%"}
                height={"200px"}
                loading="lazy"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`}
              />
            </CardHeader>
            <CardFooter className="justify-center before:bg-white/10 overflow-hidden py-2 absolute bottom-0 shadow-small ml-1 z-10">
              <p className={`${subtitle()}`}>
                {pokemon.name[0].toUpperCase() + pokemon.name.slice(1)}
              </p>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="flex flex-row gap-2 w-full justify-center mt-4">
        <Button
          size="md"
          variant="flat"
          color="secondary"
          onPress={handleNextClick}
          isLoading={isLoading}
        >
          Load more
        </Button>
      </div>
    </div>
  );
};

export default PokemonGrid;
