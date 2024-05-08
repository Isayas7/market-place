import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("../../components/map/map"), {
  ssr: false,
});

export default function Home() {
  return (
    <main>
      <DynamicMap />
    </main>
  );
}
