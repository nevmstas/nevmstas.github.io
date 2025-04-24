import { getSdk } from "./get-sdk";
import { GraphQLClient } from "graphql-request";

const getClient = (url: string, token: string) => {
  const client = new GraphQLClient(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return getSdk(client);
};

export default getClient;
