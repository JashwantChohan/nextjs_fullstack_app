import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials"
import User from "@/models/User"
import bcrypt from "bcryptjs"
import connect from "@/utils/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
        CredentialsProvider({
            id: "credentials",
            name: "credentials",
            async authorize(credentials) {

                await connect()

                try {
                    const user = await User.findOne({ email: credentials.email })

                    if (user) {
                        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)

                        if (isPasswordCorrect) {
                            return user
                        } else {
                            throw new Error("wrong credentials")
                        }
                    } else {
                        throw new Error("user not found")
                    }
                } catch (err) {
                    throw new Error(err.message)
                }
            }
        })
    ],
    pages: {
        error: "/dashboard/login"
    },
})

export const { GET, POST } = handlers
