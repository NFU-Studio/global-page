import {
  ArrowRight,
  ClipboardCheck,
  Compass,
  Dot,
  File,
  Handshake,
} from "lucide-react";
import { motion } from "motion/react";
import React from "react";
import { typographyVariants } from "@/component-variants/typography";
import { Button } from "@/components/ui/button";
import useMediaQuery from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import * as m from "@/paraglide/messages";

const services = [
  {
    id: 1,
    category: m.extra_short_shad_grow(),
    title: m.ok_full_bison_leap(),
    items: [
      m.short_muddy_capybara_aspire(),
      m.caring_aloof_chipmunk_clap(),
      m.weak_plain_slug_jump(),
      m.warm_whole_dove_earn(),
      m.ideal_sea_butterfly_view(),
    ],
    description: m.misty_bold_bullock_spin(),
    icon: File,
    buttonTextTemplate: m.broad_mad_tuna_peek(),
    href: "/oferta/obsluga-ksiegowa/",
  },
  {
    id: 2,
    category: m.polite_nice_bird_assure(),
    title: m.east_warm_ray_forgive(),
    items: [
      m.basic_home_husky_hope(),
      m.vivid_sharp_pig_boost(),
      m.clean_smart_ocelot_fulfill(),
      m.aware_trick_flea_scoop(),
    ],
    description: m.sour_bright_jackdaw_pet(),
    icon: Compass,
    buttonTextTemplate: m.noisy_lost_cat_quiz(),
    href: "/oferta/doradztwo-podatkowe/",
  },
  {
    id: 3,
    category: m.level_glad_polecat_zoom(),
    title: m.east_even_millipede_radiate(),
    items: [
      m.next_sunny_insect_lock(),
      m.low_sunny_shark_skip(),
      m.nimble_these_bee_lift(),
      m.lost_petty_loris_find(),
    ],
    description: m.these_crazy_koala_loop(),
    icon: Handshake,
    buttonTextTemplate: m.wide_shy_slug_reap(),
    href: "/oferta/sprzedaz-gotowych-spolek/",
  },
  {
    id: 4,
    category: m.watery_spicy_shell_emerge(),
    title: m.neat_close_mongoose_pout(),
    items: [
      m.bad_minor_squid_fall(),
      m.fluffy_cozy_jackdaw_endure(),
      m.calm_home_peacock_advise(),
      m.stock_broad_macaw_scold(),
    ],
    description: m.this_giant_ray_hike(),
    icon: ClipboardCheck, // Suggested new icon for registration
    buttonTextTemplate: m.due_weak_pelican_hug(),
    href: "/oferta/rejestracja-firmy/",
  },
];
export const AnimatedAccodrionish = () => {
  const isMobile = useMediaQuery("(width < 1024px)");
  return (
    <motion.ul data-service-list className="p-rws">
      {services.map(
        (
          { category, title, buttonTextTemplate, description, items, href },
          idx,
        ) => (
          <motion.li
            key={`el-list-sr-${category}`}
            whileHover={"hover"}
            className="flex flex-col md:flex-row justify-between p-rws gap-8 lg:gap-16 hover:bg-muted transition-all"
          >
            <p className={cn(typographyVariants({ variant: "small" }))}>
              {(idx + 1).toString().padStart(2, "0")}
            </p>
            <div className="max-w-5xl w-full space-y-5">
              <h3 className="sr-only">{category}</h3>
              <p className={cn(typographyVariants({ variant: "h2l" }))}>
                {title}
              </p>
              <ul className="flex flex-wrap items-center text-accent/60 gap-2">
                {items?.map((l, idx, { length }) => (
                  <React.Fragment key={`${idx + 1}-${l}`}>
                    <li
                      className={cn(typographyVariants({ variant: "small" }))}
                    >
                      {l}
                    </li>
                    {idx < length - 1 && (
                      <li>
                        <Dot />
                      </li>
                    )}
                  </React.Fragment>
                ))}
              </ul>
              <motion.div
                className="overflow-clip space-y-2.5"
                key={`---et-et--${title}`}
                style={!isMobile ? { height: 0 } : {}}
                variants={{
                  hover: {
                    height: "auto",
                  },
                }}
              >
                <p
                  className={cn(typographyVariants({ mw: "h" }))}
                  data-service-list-appear
                >
                  {description}
                </p>
                <Button asChild data-service-list-appear>
                  <a href={href}>
                    {buttonTextTemplate}
                    <ArrowRight />
                  </a>
                </Button>
              </motion.div>
            </div>
          </motion.li>
        ),
      )}
    </motion.ul>
  );
};
