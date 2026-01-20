import { ChevronDown } from "lucide-react";
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

export const DropdownNav = () => {
  // biome-ignore lint/style/noNonNullAssertion: We're pretty sure this will be present
  const { title, children } = navData.find(
    (f) => typeof f.children !== "undefined",
  )!;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"link"} className="text-inherit!">
          {title()} <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {children?.map(
            (el) =>
              el.unlocalizedHref &&
              !el?.children && (
                <DropdownMenuItem key={`dm-${el.title}`}>
                  <a href={localizeHref(el.unlocalizedHref)}>{el.title()}</a>
                </DropdownMenuItem>
              ),
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
