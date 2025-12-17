import { ResumeQuery } from "@nevmstas/hygraph-client";
import gqlClient from "@/gql-client";

export async function fetchResume(): Promise<ResumeQuery> {
  return await gqlClient.Resume();
}

