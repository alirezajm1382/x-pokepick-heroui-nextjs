import { Link } from "@heroui/link";
import { button as buttonStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10 h-full">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Pick your&nbsp;</span>
        <span className={title({ color: "pink" })}>Pokémon&nbsp;</span>
        <br />
        <span className={title()}>among all there is!</span>
        <div className={subtitle({ class: "mt-4" })}>
          Everything you need to know, here, all together for you to decide!
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            className: "bg-pink-700 text-white",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          View on GitHub
        </Link>
        <Link
          className={buttonStyles({
            color: "default",
            radius: "full",
            variant: "ghost",
          })}
          href={'/pokemon'}
        >
          Pokémons
        </Link>
      </div>

    </section>
  );
}
