import Button from "@cmp/shared/button";
import { Logo } from "@cmp/shared/logo";
import { APP_NAME, APP_URL } from "@lib/constants";
import { Suspense } from "react";
import LoginForm from "./form";

export default function LoginPage() {
  return (
    <div className="relative z-10 mt-[calc(30vh)] h-fit w-full max-w-md overflow-hidden border border-gray-100 sm:rounded-2xl sm:shadow-xl mx-auto">
      {/* <a
        href={`${HOME_DOMAIN}/blog/rebrand`}
        target="_blank"
        className="absolute right-3 top-3 rounded-full border border-gray-300 px-4 py-1 text-xs font-medium shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.1)] backdrop-blur transition-all hover:border-gray-500 hover:bg-white/50"
      >
        We've rebranded!
      </a> */}
      <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
        <a href={APP_URL}>
          <Logo className="h-10 w-10" />
        </a>
        <h3 className="text-xl font-semibold">Sign in to {APP_NAME}</h3>
        <p className="text-sm text-gray-500">
          Start managing your tasks easily.
        </p>
      </div>
      <div className="flex flex-col space-y-3 bg-gray-50 px-4 py-8 sm:px-16">
        <Suspense
          fallback={
            <>
              <Button disabled={true} text="" variant="secondary" />
              <Button disabled={true} text="" variant="secondary" />
              <Button disabled={true} text="" variant="secondary" />
              <div className="mx-auto h-5 w-3/4 rounded-lg bg-gray-100" />
            </>
          }
        >
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
