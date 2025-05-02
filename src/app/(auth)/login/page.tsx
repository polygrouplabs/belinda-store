import Login from "@/components/app/Login/Login";
import { headlessServer } from "@/sdk/headlessServer";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const headlessServerInstance = await headlessServer();
  const isLoggedIn = headlessServerInstance?.auth.loggedIn();

  if (isLoggedIn) {
    redirect("/");
  }

  return <Login />;
}
