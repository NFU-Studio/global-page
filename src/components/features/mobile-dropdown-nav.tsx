import { Menu, X } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navData } from "@/data/nav";
import { localizeHref } from "@/paraglide/runtime";

export const MobileDropdownNav = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <DropdownMenu onOpenChange={setOpen} open={open}>
      <DropdownMenuTrigger asChild className="translate-x-0 translate-y-0">
        <Button size="icon-lg" variant={open ? "default" : "ghost"}>
          {open ? <X /> : <Menu />}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        suppressHydrationWarning
        className="w-[90vw] h-[50vh]"
        side="bottom"
        align="end"
      >
        <DropdownMenuGroup>
          {navData.map(
            ({ unlocalizedHref, title }) =>
              unlocalizedHref && (
                <DropdownMenuItem
                  key={`mob-nav-${title().toString().toLowerCase()}`}
                >
                  <a href={localizeHref(unlocalizedHref)}>{title()}</a>
                </DropdownMenuItem>
              ),
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
