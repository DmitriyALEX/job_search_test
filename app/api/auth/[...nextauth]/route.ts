import bcrypt from 'bcrypt'
import NextAuth, { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

import prisma from '../../../helpers/prismadb'

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'email' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('check credentials')
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                })

                if (!user || !user?.hashedPassword) {
                    throw new Error('check credentials')
                }

                const isCorrectPassword = await bcrypt.compare(credentials.password, user.hashedPassword)

                if (!isCorrectPassword) {
                    throw new Error('check credentials')
                }
                return user
            },
        }),
    ],

    pages: {
        signIn: '/auth',
    },

    session: { strategy: 'jwt' },
    jwt: {
        secret: process.env.NEXT_AUTH_JWT_SECRET,
    },
    secret: process.env.NEXT_AUTH_SECRET,
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
