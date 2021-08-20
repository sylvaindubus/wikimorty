import { ApolloClient, InMemoryCache, MutationOptions, NormalizedCacheObject, QueryOptions } from '@apollo/client'

let client: ApolloClient<NormalizedCacheObject>

const initClient = () => new ApolloClient({
	uri: 'https://rickandmortyapi.com/graphql',
	cache: new InMemoryCache()
})

export const query = async (options: QueryOptions) => {
	if (!client) {
		client = initClient()
	}

	return await client.query(options)
}

export const mutate = async (options: MutationOptions) => {
	if (!client) {
		client = initClient()
	}

	return await client.mutate(options)
}
