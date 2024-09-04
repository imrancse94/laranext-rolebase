import NextAuth, {CredentialsSignin, CallbackRouteError} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import CredentialsProvider from "next-auth/providers/credentials"

import Api from "./app/actions";
import {authConfig} from "./auth.config";
import api from "./app/actions";


const refreshAccessToken = async (token) => {

    try {
        const refreshedTokens = await api.post('refresh-token', {
            refresh_token: token.refresh_token
        })

        if (refreshedTokens.status_code !== 100) {
            throw new Error('RefreshAccessTokenError')
        }

        return {
            ...token,
            access_token: refreshedTokens?.data?.access_token,
            accessTokenExpires: (Date.now() + (parseInt(refreshedTokens?.data?.expire_in) * 1000) - 2000),
            refresh_token: refreshedTokens?.data?.refresh_token,
        }
    } catch (error) {

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
    update
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

                if(credentials?.type === 'permission'){
                    return credentials;
                }

                try {

                    const response = await api.post('login', {
                        email: credentials.email,
                        password: credentials.password
                    })

                    if (response.status_code !== 100) {
                        throw new Error(response.message);
                    }

                    return response;
                } catch (error) {
                    throw new Error(error.message);
                }

            },
        }
    ),

    ],
    callbacks: {
        async jwt({token, user, account, trigger, session}) {

            if (user && account) {

                token.permission = user?.data?.permission;
                token.permission_version = user?.data?.user?.permission_version;
                token.user = user?.data?.user;
                token.access_token = user?.data?.access_token;
                token.refresh_token = user?.data?.refresh_token;
                token.accessTokenExpires = (Date.now() + (parseInt(user?.data?.expire_in) * 1000) - 2000)
            }

            if (Date.now() < token?.accessTokenExpires) {
                return token;
            }

            if (trigger === "update" && session) {
                token = {...token, ...session}
                return token;
            }

            return await refreshAccessToken(token)

        },
        async session({session, token}) {

            if (token?.error === 'RefreshAccessTokenError') {
                session = null;
                return null;
            }

            session.permission = token?.permission;
            session.user = token?.user;
            session.permission_version = token?.user?.permission_version;
            session.access_token = token?.access_token;
            session.refresh_token = token?.refresh_token;
            session.accessTokenExpires = token?.accessTokenExpires;
            session.error = token?.error

            return session;
        },

    }
})


