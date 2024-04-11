import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connect from "@/utils/db";
import { loginSchema } from "@/schema/user";
import Role from "@/models/Role";

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
            if (isPasswordCorrect && user.isActive) {
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
    async session({ session, token, account }) {
      session.user.id = token.id;
      return session;
    },
    jwt: async ({ token }) => {
      const user = await User.findOne({ email: token?.email });
      token.id = user._id;
      token.name = user.firstName + " " + user.middleName;
      return token;
    },
    async signIn({ account, profile }) {
      if (account.provider === "credentials") {
        return true;
      }
      try {
        await connect();
        const userExist = await User.findOne({ email: profile.email });
        if (!userExist) {
          const name = profile.name.split(" ");
          const firstName = name[0];
          const middleName = name[1];

          const myrole = await Role.find({ name: "Buyer" });

          const user = await User.create({
            firstName,
            middleName,
            email: profile.email,
            role: myrole[0]._id,
          });
        }

        return true;
      } catch (error) {
        console.error("Error during sign-in:", error.message);
        return false;
      }
    },
  },
  pages: { error: "/login" },
  redirects: {
    signIn: "/",
  },
});
export { handler as POST, handler as GET };
