import { Logo } from "@cmp/shared/logo";
import { ProfileDropDown } from "@cmp/shared/profile-dropdown";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-2 sticky top-0">
      <Link href={"/"}>
        <Logo size="sm"/>
      </Link>
      
      <ProfileDropDown />
    </div>
  );
};
