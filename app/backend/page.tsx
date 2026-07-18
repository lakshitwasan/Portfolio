import type { Metadata } from "next";
import Providers from "@/components/Providers";
import Site from "@/components/Site";
import { profile } from "@/lib/content";

export const metadata: Metadata = {
  title: `${profile.name} — Backend & Distributed Systems Engineer`,
  description: "Backend engineer: scalable microservices, distributed APIs and cloud-native systems on AWS.",
  alternates: { canonical: "/backend" },
};

export default function BackendPage() {
  return (
    <Providers initialLens="backend">
      <Site />
    </Providers>
  );
}
