import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import NavLinks from "./nav-links";

const SidebarToggle = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent>
        <NavLinks />
      </SheetContent>
    </Sheet>
  );
};

export default SidebarToggle;
