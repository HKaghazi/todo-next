import { LANDING_URL } from "@org/utils";
import { LoginForm } from "@components/auth/form";
import { Logo } from "components/logo";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <div className="relative z-10 max-w-md overflow-hidden border border-gray-100 sm:rounded-2xl sm:shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <a href={LANDING_URL}>
            <Logo className="h-10 w-10" />
          </a>
          <h3 className="text-xl font-semibold">ورود | ثبت نام</h3>
          <p className="text-sm text-gray-500">به سامانه وین‌باکس خوش آمدید</p>
        </div>

        <LoginForm />
      </div>
      <p className="text-xs text-gray-500 mt-4 cursor-default">
        ورود شما به سامانه به منزله پذیرش تمام{" "}
        <Link href={`/terms`} className="text-blue-500 cursor-pointer">
          قوانین
        </Link>{" "}
        سامانه میباشد
      </p>
    </>
  );
}
