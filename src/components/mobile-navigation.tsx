import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MOBILE_NAV = [
  { label: "Home", href: "#home" },
  { label: "Explore", href: "#explore" },
  { label: "Worlds", href: "#worlds" },
  { label: "About", href: "#about" },
];

export function MobileNavigation() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="premium-interaction size-10 rounded-full md:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="size-4" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="glass-card min-w-44 rounded-2xl p-2"
      >
        {MOBILE_NAV.map((item) => (
          <DropdownMenuItem key={item.label} asChild className="rounded-xl p-0">
            <a href={item.href} className="block min-h-11 px-4 py-3 text-sm">
              {item.label}
            </a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
