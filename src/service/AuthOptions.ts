import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '@/models/user';
import { USER_ROLE } from './Helper';
import { connect } from '@/db/mongodb';
import Company from '@/models/company';
import { AuthOptions } from 'next-auth';
import Individual from '@/models/individual';
import { transporter } from '@/config/nodemailer';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

var currentUser: any;
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
        const { role, email, password, name, phone }: any = credentials;

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

            // Create JWT
            const verifyToken = jwt.sign(
              { userId: newUser._id, isVerified: true },
              process.env.JWT_SECRET!,
            );

            const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}dashboard?token=${verifyToken}`;
            // const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}api/verify-user?token=${verifyToken}`;

            const mailOptions = {
              from: process.env.NEXT_PUBLIC_EMAIL,
              to: email,
              subject: 'Verification mail',
              text: `Please click the following link to verify your account: ${verifyUrl}`,
              html: `<p>You requested a password reset. Please click the following link to verify your account:</p><a href="${verifyUrl}">${verifyUrl}</a>`,
            };

            await transporter.sendMail(mailOptions);

            // create
            if (role === 'employee' && newUser) {
              await Company.create({
                user_ref_id: newUser?._id,
                phone: phone,
                user_name: name,
                company_name: name,
              });
            } else {
              await Individual.create({
                user_ref_id: newUser?._id,
                phone: phone,
                user_name: name,
              });
            }

            return newUser;
          }
        } catch (error) {
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

      if (account.provider === 'google') {
        try {
          const { name, email } = user;
          await connect();
          const existingUser = await User.findOne({ email: user.email });

          if (existingUser) {
            currentUser = existingUser;
            return true;
          }
          const newUser = await User.create({
            email: email,
            password: null,
            isVerified: true,
            role: USER_ROLE?.INDIVIDUAL,
          });

          await Individual.create({
            user_ref_id: newUser?._id,
          });
          currentUser = newUser;
          const res = await newUser.save();
          if (res.status === 200 || res.status === 201) {
            return newUser;
          }
        } catch (err) {
          throw new Error(`Error: ${err}`);
        }
        return true;
      }
    },
    // token, trigger, session
    async jwt({ token, user, trigger, session }: any) {
      if (trigger === 'update') {
        token.isVerified = session.isVerified;
      }
      if (user?._id) {
        token._id = user._id;
        token.role = user.role;
        token.email = user.email;
        token.profile_count = user?.profile_count ? user.profile_count : 0;
        token.phone = user.phone;
        token.status = user.status;
        token.isVerified = user.isVerified;
        token.profile_picture = user.profile_picture;
      } else if (!token.role && !token._id) {
        token.profile_count = user?.profile_count ? user.profile_count : 0;
        token._id = currentUser?._id;
        token.role = USER_ROLE?.INDIVIDUAL; // Default role if not set
        token.isVerified = currentUser.isVerified;
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
        session.user.isVerified = token.isVerified;
        session.user.profile_count = token.profile_count;
        session.user.profile_picture = token.profile_picture;
      } else if (!session.user.role && !session.user._id) {
        session.user._id = currentUser?._id;
        session.user.role = USER_ROLE?.INDIVIDUAL; // Default role if not set
        session.user.isVerified = currentUser.isVerified;
        session.user.profile_count = token.profile_count;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
};
