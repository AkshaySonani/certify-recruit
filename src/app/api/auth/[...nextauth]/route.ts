import bcrypt from "bcryptjs";
import User from "@/models/user";
import NextAuth from "next-auth/next";
import { connect } from "@/db/mongodb";
import { AuthOptions } from "next-auth";
import { NextResponse } from "next/server";
import CredentialsProvider from "next-auth/providers/credentials";
import { use } from "react";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        isLogin: { type: "boolean" },
      },
      //@ts-ignore
      async authorize(credentials) {
        //@ts-ignore
        const { role, email, password, isLogin } = credentials;
        try {
          await connect();

          const res = await User.findOne({ email }).select("+password");
          if (isLogin) {
            let passwordsMatch = false;
            if (res) {
              passwordsMatch = await bcrypt.compareSync(password, res.password);
            }
            return { ...res, passwordsMatch };
          } else {
            if (!res) {
              // Hash the password
              const salt = await bcrypt.genSalt(Number(process.env.NEXT_SLAT));
              const hashedPassword = await bcrypt.hash(password, salt);

              const newUser = await User.create({
                role: role,
                email: email,
                password: hashedPassword,
              });

              return { ...newUser };

              // return NextResponse.json({
              //   status: 201,
              //   data: newUser,
              //   message: "User registered successfully",
              // });
            }
          }
        } catch (error) {
          return error;
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
    async signIn({ user, account }) {
      // if (account.provider === "google") {
      //   try {
      //     const { name, email } = user;
      //     await connect();
      //     const ifUserExists = await User.findOne({ email });
      //     if (ifUserExists) {
      //       return user;
      //     }
      //     const newUser = new User({
      //       name: name,
      //       email: email,
      //     });
      //     const res = await newUser.save();
      //     if (res.status === 200 || res.status === 201) {
      //       console.log(res);
      //       return user;
      //     }
      //   } catch (err) {
      //     console.log(err);
      //   }
      // }

      return user?.passwordsMatch ? user : false;
      // if (user.passwordsMatch) {
      //   return NextResponse.json({
      //     status: 201,
      //     data: {
      //       _id: user._id,
      //       role: user.role,
      //       email: user.email,
      //       phone: user.phone,
      //       status: user.status,
      //       profile_picture: user.profile_picture,
      //     },
      //     message: "User successfully logged in",
      //   });
      // } else {
      //   console.log("error--->");

      //   return NextResponse.json(
      //     { message: "Invalid credentials" },
      //     { status: 402 }
      //   );
      // }
    },
    // async redirect({ url, baseUrl }) {
    //   console.log("url, baseUrl", url, baseUrl);

    //   if (url.startsWith("/")) return `${baseUrl}${url}`;
    //   else if (new URL(url).origin === baseUrl) return url;
    //   return baseUrl;
    // },
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
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    newUser: null,
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
