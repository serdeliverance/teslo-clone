import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    Credentials({
      name: 'Custom Login',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'email@something.com'},
        password: { label: 'Password', type: 'password', placeholder: 'password'},
      },
      async authorize(credentials) {
        
        return { email: 'pepe@gmail.com', role: 'admin'}
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    })
  ],
  callbacks: {

  }
}
export default NextAuth(authOptions)