import Providers from "@/components/Providers";
import Site from "@/components/Site";

export default function HomePage() {
  return (
    <Providers initialLens="ai">
      <Site />
    </Providers>
  );
}
