import * as m from "@/paraglide/messages";

type NavEntry = {
  title: () => string;
  unlocalizedHref?: string;
  children?: NavEntry[];
  isHome?: true;
};

export const navData: NavEntry[] = [
  { title: m.simple_born_termite_feel, unlocalizedHref: "/", isHome: true },
  {
    title: m.equal_elegant_oryx_race,
    children: [
      {
        title: m.quick_giant_fly_laugh,
        unlocalizedHref: "/oferta/obsluga-ksiegowa/",
      },
      {
        title: m.true_grand_snake_dream,
        unlocalizedHref: "/oferta/doradztwo-podatkowe/",
      },
      {
        title: m.each_tiny_angelfish_shine,
        unlocalizedHref: "/oferta/sprzedaz-gotowych-spolek/",
      },
      {
        title: m.noisy_careful_tuna_scoop,
        unlocalizedHref: "/oferta/rejestracja-firmy/",
      },
    ],
  },
  { title: m.bland_suave_florian_lock, unlocalizedHref: "/cennik/" },
  { title: m.weak_weak_alpaca_list, unlocalizedHref: "/o-nas/" },
  { title: m.low_acidic_rooster_sing, unlocalizedHref: "/kontakt/" },
];
