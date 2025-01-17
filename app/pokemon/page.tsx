import PokemonGrid from "@/components/blocks/pokemon-grid";
import { title } from "@/components/primitives";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";

export default function PokemonsPage() {
  return (
    <div className="w-full">
      <h1 className={title()}>Pokémons</h1>
      <div className="flex flex-row gap-1 mt-6">
        <Input
          variant="bordered"
          placeholder="Search a Pokémon"
          fullWidth
          isClearable
        />
        <Button variant="flat" color="secondary">
          Search
        </Button>
      </div>
      <PokemonGrid />
    </div>
  );
}
