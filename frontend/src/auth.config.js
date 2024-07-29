export const authConfig = {
    trustHost: true,
    trustHostedDomain: true,
    session: {
        strategy: 'jwt',
        maxAge: 3600
    },
    providers: [],
}