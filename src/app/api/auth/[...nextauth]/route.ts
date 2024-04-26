import bcrypt from 'bcryptjs';
import User from '@/models/user';
import NextAuth from 'next-auth/next';
import { connect } from '@/db/mongodb';
import { AuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    // SignUp
    CredentialsProvider({
      id: 'signup',
      name: 'credentials',
      credentials: {
        isLogin: { type: 'boolean' },
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { role, email, password }: any = credentials;
        try {
          await connect();
          // check if the user exists
          const user = await User.findOne({ email }).select('+password');
          if (user) {
            throw new Error('User with email already exists!');
          } else {
            // hash password, create user
            const salt = await bcrypt.genSalt(Number(process.env.NEXT_SLAT));
            const hashedPassword = await bcrypt.hash(password, salt);

            const newUser = await User.create({
              role: role,
              email: email,
              password: hashedPassword,
            });
            return newUser;
          }
        } catch (error) {
          console.log('register error', error);
          throw new Error(`${error}`);
        }
      },
    }),
    // SignIn
    CredentialsProvider({
      id: 'signin',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password }: any = credentials;
        try {
          await connect();
          // check if the user exists
          // Find user by email
          const user = await User.findOne({ email: email }).select('+password');
          if (!user) {
            throw new Error('User not found.');
          } else {
            // Check password
            const passwordsMatch = await bcrypt.compare(
              password,
              user.password,
            );
            if (!passwordsMatch) {
              throw new Error('Incorrect credentials provided.');
            } else {
              return user;
            }
          }
        } catch (error) {
          console.log('login error', error);
          throw new Error(`${error}`);
        }
      },
    }),
    // Google auth
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async signIn({ user, account }: any) {
      if (account.provider === 'signin' || account.provider === 'signup') {
        return true;
      }

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
    },
    async jwt({ token, user }: any) {
      if (user?._id) {
        token._id = user._id;
        token.role = user.role;
        token.email = user.email;
        token.phone = user.phone;
        token.status = user.status;
        token.profile_picture = user.profile_picture;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token?._id) {
        session.user._id = token._id;
        session.user.role = token.role;
        session.user.email = token.email;
        session.user.phone = token.phone;
        session.user.status = token.status;
        session.user.profile_picture = token.profile_picture;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
