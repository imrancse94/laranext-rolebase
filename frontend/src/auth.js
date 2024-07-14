import NextAuth, {CredentialsSignin, CallbackRouteError} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials"

import Api from "./app/actions";
import {authConfig} from "./auth.config";
import api from "./app/actions";

const refreshAccessToken = async (token) => {

    //console.log('rfs',token);
    try {
        const refreshedTokens = await api.post('refresh-token', {
            refresh_token: token.refresh_token
        })

        if (refreshedTokens.status_code !== 100) {
            throw new Error('RefreshAccessTokenError')
        }

        console.count('Refreshed token')
        console.log('Refreshed token', refreshedTokens)
        console.log('ffff', refreshedTokens?.data?.expire_in * 1000)

        return {
            ...token,
            access_token: refreshedTokens?.data?.access_token,
            accessTokenExpires: (Date.now() + (parseInt(refreshedTokens?.data?.expire_in) * 1000) - 2000),
            refresh_token: refreshedTokens?.data?.refresh_token,
        }
    } catch (error) {
        console.log('refresh token error', error)
        return {
            error: "RefreshAccessTokenError"
        }
    }
}

export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {

                if (credentials == null) return null;

                try {

                    const response = await api.post('login', {
                        email: credentials.email,
                        password: credentials.password
                    })

                    if (response.status_code != 100) {
                        throw new Error(response.message);
                    }
                    console.log("In authorize")
                    return response;
                } catch (error) {
                    throw new Error(error.message);
                }

            },
        })
    ],
    callbacks: {

        async jwt({token, user, account}) {

            // console.log(`JWT token:`,token);
            // console.log(`JWT Account:`,account);
            console.log('jwt callback');

            if (user) {
                // return {
                //     ...user?.data,
                //     accessTokenExpires: Date.now() + user?.data?.expire_in * 1000,
                //     user:user?.data?.user
                // };
                token.user = user?.data?.user;
                token.access_token = user?.data?.access_token;
                token.refresh_token = user?.data?.refresh_token;
                token.accessTokenExpires = (Date.now() + (parseInt(user?.data?.expire_in) * 1000) - 2000)
            }

            //console.log(`Now ${new Date(Date.now())} and Token Will Expire at ${new Date(token.accessTokenExpires)}`);

            if (Date.now() < token?.accessTokenExpires) {
                console.log(`At ${new Date(Date.now())}, Using old access token`);
                return Promise.resolve(token);
            }


            //console.log(`Token Expired at ${new Date(Date.now())}`)
            const newToken = await refreshAccessToken(token);
            return Promise.resolve(newToken);

        },
        async session({session, token}) {
            console.log('session callback', token)
            if (token?.error === 'RefreshAccessTokenError') {
                session = null;
                return null;
            }

            session.user = token?.user;
            session.access_token = token?.access_token;
            session.refresh_token = token?.refresh_token;
            session.accessTokenExpires = token?.accessTokenExpires;
            session.error = token?.error

            return Promise.resolve(session);
        },

    }
})


