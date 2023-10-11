import { Logo } from "@cmp/shared/logo";
import { ProfileDropDown } from "@cmp/shared/profile-dropdown";
import { APP_NAME } from "@lib/constants";
import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-2 sticky top-0">
      <Link href={"/"} className="inline-flex gap-2 items-end">
        <Logo size="sm"/>
        <span className="font-bold text-xl uppercase">{APP_NAME}</span>
      </Link>
      
      <ProfileDropDown />
    </div>
  );
};
