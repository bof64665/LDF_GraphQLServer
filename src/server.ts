import "reflect-metadata";
import { ApolloServer, Config, ServerInfo } from "apollo-server";
import { buildSchema } from "type-graphql";
import { AnalysisDataResolver } from "./graphql/analysisData";
import { DataAvailabilityResolver } from "./graphql/dataAvailability";

async function startApolloServer(): Promise<ServerInfo> {
    const schema = await buildSchema({
        resolvers: [ AnalysisDataResolver, DataAvailabilityResolver ],
        emitSchemaFile: true,
        validate: false,
        nullableByDefault: true,
        dateScalarMode: "timestamp"
    });

    const serverConfig: Config = {
        schema,
        playground: {
            settings: {
                'editor.theme': 'dark',
                'editor.cursorShape': 'line',
            },
        },
    };

    return new ApolloServer(serverConfig).listen();
}

startApolloServer()
  .then(({ url }) =>
    console.log(`Server is running on ${url}`)
  );