import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.thedogapi.com/v1/images' }),
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: ({ limit = 10, page = 1,filter} = {}) => ({
        url: `search/?limit=${limit}&page=${page}`,
        params:{size:filter},
        method: 'GET'
      })
    }),
    serializeQueryArgs: ({ endpointName }) => {
      return endpointName;
    },
    // Always merge incoming data to the cache entry
    merge: (currentCache, newItems) => {
      currentCache.results.push(...newItems.results);
    },
    // Refetch when the page arg changes
    forceRefetch({ currentArg, previousArg }) {
      return currentArg !== previousArg;
    }
  }),
});

export const {useGetPokemonByNameQuery,usePrefetch} = pokemonApi;

// https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1
