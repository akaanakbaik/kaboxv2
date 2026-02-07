import { redirect } from "next/navigation";

export default function RootPage() {
  // Redirect default ke ID jika root diakses
  redirect("/id/~");
}
