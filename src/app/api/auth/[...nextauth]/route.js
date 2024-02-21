import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connect from "@/utils/db";
import { loginSchema } from "@/schema/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",

      async authorize(credentials) {
        const validationResult = loginSchema.safeParse(credentials);
        if (!validationResult.success) {
          throw new Error("Invalid Credentials!");
        }

        await connect();

        try {
          const user = await User.findOne({
            email: credentials.email,
          });

          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );

            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Wrong Credentials!");
            }
          } else {
            throw new Error("User not found!");
          }
        } catch (err) {
          throw new Error(err);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      return session;
    },
    async signIn({ profile }) {
      try {
        await connect();
        const userExist = await User.findOne({ email: profile.email });
        if (!userExist) {
          const name = profile.name.split(" ");
          const firstName = name[0];
          const middleName = name[1];

          const user = await User.create({
            firstName,
            middleName,
            email: profile.email,
            role: "buyer",
          });
        }

        return true;
      } catch (error) {
        return false;
      }
    },
  },
  pages: { error: "/login" },
});
export { handler as POST, handler as GET };
