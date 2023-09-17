import Dashboard from "@/components/Dashboard/Dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "CBRE analytics",
  description: "description",
  // other metadata
};

export default function Home() {
  return (
    <>
      <Dashboard />
    </>
  );
}
