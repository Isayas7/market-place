import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center  p-24">
      <h1>Landing page</h1>
      <Link href="/dashboard ">Go Dashboard</Link>
    </main>
  );
}
