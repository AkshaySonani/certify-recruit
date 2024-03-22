import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { ConnectMongoDB } from "@/app/lib/mongodb";
import User from "@/app/lib/models/user";
// console.log("process.env.NEXTAUTH_SECRET", process.env.NEXTAUTH_SECRET);
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials) {
                const { email, password } = credentials;
                console.log("email,",email,password);
                try {
                    await ConnectMongoDB();
                    const user = await User.findOne({ email });
                    if (!user) {
                        return null;
                    }
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (!passwordsMatch) {
                        return null;
                    }
                    return user;
                } catch (error) {
                    console.log("Error: ", error);
                }
            },
        }),
        GoogleProvider({
            clientId:"63394263542-bb6ippbgo6jtkd4hnv9g5s14ra65rbu0.apps.googleusercontent.com",
            clientSecret:"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"
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async signIn({ user, account }) {
            if (account.provider === "google") {
                try {
                    const { name, email } = user;
                    await ConnectMongoDB();
                    const ifUserExists = await User.findOne({ email });
                    if (ifUserExists) {
                        return user;
                    }
                    const newUser = new User({
                        name: name,
                        email: email,
                    });
                    const res = await newUser.save();
                    if (res.status === 200 || res.status === 201) {
                        console.log(res)
                        return user;
                    }
                } catch (err) {
                    console.log(err);
                }
            }
            return user;
        },
        async jwt({ token, user }) {
            if (user) {
                token.email = user.email;
                token.name = user.name;
            }
            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.email = token.email;
                session.user.name = token.name;
            }
            console.log(session);
            return session;
        },
    },
    secret: "nDapuAjbv5rDvbR7Grm6v3Dwsu/9MUwlxQRwo41cYTc=",
    pages: {
        signIn: "/login",
        newUser: null
    },
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };