"use client";

import dynamic from "next/dynamic";
import gqlClient from "@/gql-client";
import GenerateCVButton from "./generate-cv-button";

const ResumeButtonLoader = dynamic(
  async () => {
    const Component = (await import("./resume-button")).default;
    const props = await gqlClient.Resume();

    const Wrapped = () => <Component {...props} />;
    Wrapped.displayName = "ResumeButton";
    return Wrapped;
  },
  {
    loading: () => <GenerateCVButton disabled />,
    ssr: false,
  }
);

export default ResumeButtonLoader;