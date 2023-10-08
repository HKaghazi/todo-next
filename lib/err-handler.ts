import { toast } from "sonner";
import { ZodError } from "zod";

type SignInErrorTypes =
  | "Signin"
  | "OAuthSignin"
  | "OAuthCallback"
  | "OAuthCreateAccount"
  | "EmailCreateAccount"
  | "Callback"
  | "OAuthAccountNotLinked"
  | "EmailSignin"
  | "CredentialsSignin"
  | "SessionRequired"
  | "default";

const auth_errors: Record<SignInErrorTypes, string> = {
  Signin: "Try signing in with a different account.",
  OAuthSignin: "Try signing in with a different account.",
  OAuthCallback: "Try signing in with a different account.",
  OAuthCreateAccount: "Try signing in with a different account.",
  EmailCreateAccount: "Try signing in with a different account.",
  Callback: "Try signing in with a different account.",
  OAuthAccountNotLinked:
    "To confirm your identity, sign in with the same account you used originally.",
  EmailSignin: "The e-mail could not be sent.",
  CredentialsSignin:
    "Sign in failed. Check the details you provided are correct.",
  SessionRequired: "Please sign in to access this page.",
  default: "Unable to sign in.",
};

function handleError(err: unknown) {
  if (!err) return toast.error("Invalid Error message");

  if (err instanceof Error) {
    return toast.error(err?.message);
  }

  if (err instanceof ZodError) {
    const jointErrors = err.errors.map((err) => err.message).join(", ");
    return toast.error(jointErrors);
  }

  if (typeof err === "string") {
    if (auth_errors[err as SignInErrorTypes]) {
      return toast.error(auth_errors[err as SignInErrorTypes]);
    }
    return toast.error(err);
  }

  console.error("Unhandled error (frontend) ==>", JSON.stringify(err));
}

export { auth_errors, handleError };
