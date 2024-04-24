import bcrypt from "bcryptjs";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import { connect } from "@/db/mongodb";
import { NextResponse } from "next/server";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      //@ts-ignore
      async authorize(credentials) {
        //@ts-ignore
        const { email, password } = credentials;
        try {
          await connect();
          const user = await User.findOne({ email }).select("+password");
          if (!user) {
            return NextResponse.json(
              { message: "User not found" },
              { status: 404 }
            );
          }
          const passwordsMatch = await bcrypt.compareSync(
            password,
            user.password
          );
          if (!passwordsMatch) {
            return NextResponse.json(
              { message: "Invalid credentials" },
              { status: 402 }
            );
          }

          return NextResponse.json({
            status: 201,
            data: {
              _id: user._id,
              role: user.role,
              email: user.email,
              phone: user.phone,
              status: user.status,
              profile_picture: user.profile_picture,
            },
            message: "User successfully logged in",
          });
        } catch (error) {
          return NextResponse.json(
            {
              message: "An error occurred while the user was login.",
              error: error,
            },
            { status: 500 }
          );
        }
      },
    }),
    // GoogleProvider({
    //   clientId:
    //     "63394263542-bb6ippbgo6jtkd4hnv9g5s14ra65rbu0.apps.googleusercontent.com",
    //   clientSecret: "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",
    // }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  callbacks: {
    //@ts-ignore
    async signIn({ user, account }) {
      if (account.provider === "google") {
        try {
          const { name, email } = user;
          await connect();
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
            console.log(res);
            return user;
          }
        } catch (err) {
          console.log(err);
        }
      }
      return NextResponse.json({
        status: 201,
        data: {
          _id: user._id,
          role: user.role,
          email: user.email,
          phone: user.phone,
          status: user.status,
          profile_picture: user.profile_picture,
        },
        message: "User successfully logged in",
      });
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session.user) {
        session.user.email = token.email;
      }
      console.log(session);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    newUser: null,
  },
};
//@ts-ignore
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
