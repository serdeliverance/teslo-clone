import GithubProvider from 'next-auth/providers/github'
import Credentials from 'next-auth/providers/credentials'
import NextAuth from 'next-auth/next'
import { dbUsers } from '../../../database'

export const authOptions = {
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'email@something.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'password',
        },
      },
      async authorize(credentials) {
        return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password)
      },
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account.type) {
        token.accessToken = account.access_token

        switch (account.type) {
          case 'oauth':
            // TODO create user and verify if it exists on db
            break

          case 'credentials':
            token.user = user
            break
        }
      }

      return token
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      session.user = token.user as any

      return session
    },
  },
}

export default NextAuth(authOptions)
