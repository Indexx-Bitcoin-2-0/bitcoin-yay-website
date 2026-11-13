import { redirect } from "next/navigation";

// The Black Friday Airdrop lives at /airdrop; keep old /black-friday links working.
export default function BlackFridayRedirect() {
  redirect("/airdrop");
}
