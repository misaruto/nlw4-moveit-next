import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    /**
     * @param  {string} url      URL provided as callback URL by the client
     * @param  {string} baseUrl  Default base URL of site (can be used as fallback)
     * @return {string}          URL the client will be redirect to
     */
    async redirect(url, baseUrl) {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
    async signIn(user, account, profile) {
      return true;
    },
    async session(session, user) {
      localStorage.setItem('use', JSON.stringify(user));
      return session;
    },
    async jwt(token, user, account, profile, isNewUser) {
      return token;
    },
  },
});
