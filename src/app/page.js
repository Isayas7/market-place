"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <h1>Landing page</h1>
      <Button onClick={() => router.push("/dashboard")}>Go Dashboard</Button>
    </main>
  );
}
