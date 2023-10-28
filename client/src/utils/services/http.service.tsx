import { saveToken } from '@/helpers/token';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import { tokenReceived } from '@/types/types';

const mutex = new Mutex()

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: async (headers) => {
        const token = localStorage.getItem(
            "ACCESS_TOKEN"
        )
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers
    },
})

const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {

    await mutex.waitForUnlock()
    let result = await baseQuery(args, api, extraOptions);
    if (result.error && result.error.status === 401) {
        // try to get a new token
        const refreshToken = localStorage.getItem("REFRESH_TOKEN")
        // const refreshResult = await baseQuery("/auth/refresh",api, extraOptions);
        if (!mutex.isLocked()) {
            const release = await mutex.acquire()
            try {
                const refreshResult = await baseQuery({
                    url: `/auth/refresh`,
                    method: 'POST',
                    body: { token: refreshToken },
                }, api, extraOptions);

                if (refreshResult.data) {
                    const data: { ACCESS_TOKEN: string; expires_in: string; REFRESH_TOKEN: string; } = refreshResult.data as tokenReceived
                    saveToken(data.ACCESS_TOKEN, data.expires_in, data.REFRESH_TOKEN)
                    // retry the initial query
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    // throw new Error()
                }
            }
            finally {
                release()
            }
        }
        else {
            await mutex.waitForUnlock()
            result = await baseQuery(args, api, extraOptions)
        }
    }
    return result;
};

const myApi = createApi({
    reducerPath: "api",
    // baseQuery: baseQuery,
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({}),
});

export default myApi;