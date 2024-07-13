
import NextAuth, {CredentialsSignin,CallbackRouteError} from "next-auth";
import Credentials from "next-auth/providers/credentials"
import Api from "./app/actions";
import { authConfig } from "./auth.config";
import api from "./app/actions";

export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name:"credentials",
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

                    if(response.status_code != 100){
                        throw new Error(response.message);
                    }

                    return response;
                } catch (error) {
                    throw new Error(error.message);
                }

            },
        })
    ],
    callbacks:{

        async jwt({ token, user, account }) {

            console.log(`JWT token:`,token);
            console.log(`JWT Account:`,account);

            if (account && user) {
                return {
                    ...user?.data,
                    accessTokenExpires: Date.now() + user?.data?.expire_in * 1000,
                    user:user?.data?.user
                };
            }

            console.log(`Now ${new Date(Date.now())} and Token Will Expire at ${new Date(token.accessTokenExpires)})`);

            if (Date.now() < token?.accessTokenExpires) {
                console.log(`At ${new Date(Date.now())}, Using old access token`);
                return token;
            }

            console.log(`Token Expired at ${new Date(Date.now())}`)
            return refreshAccessToken(token);
        },
        async session({ session, token }) {

            if(token?.error == 'RefreshAccessTokenError')
            {
                session = null;
                return session;
            }

            session.user = token?.user;
            session.accessToken = token?.access_token;
            session.refreshToken = token?.refresh_token;
            // session.expires = token?.expires_in;
            session.error = token?.error
  
            
            return session;
        }
    }
})


async function refreshAccessToken(token) {
    console.log('token.refresh_token',token.refresh_token)
    try {
            const refreshedTokens = await api.post('refresh-token',{
                refresh_token:token.refresh_token
            })

            console.log('Refreshed token', refreshedTokens)
            return {
              ...token,
              accessToken: refreshedTokens?.data?.access_token,
              accessTokenExpires: Date.now() + refreshedTokens?.data?.expire_in * 1,
              refreshToken: refreshedTokens?.data?.refresh_token,
            }
    } catch (error) {
        console.log(error);

        return {
          ...token,
          error: "RefreshAccessTokenError"
        }
    }
}
