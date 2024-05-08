import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connect from "@/utils/db";
import { loginSchema } from "@/validationschema/user";
import Role from "@/models/Role";
import admin, { roleData, statusData } from "@/utils/permission";

const Login = async (credentials) => {
  const validationResult = loginSchema.safeParse(credentials);
  if (!validationResult.success) {
    throw new Error("Invalid Credentials!");
  }

  if (
    credentials.email === admin.email &&
    credentials.password === admin.password
  ) {
    const user = admin;
    return user;
  }

  await connect();

  try {
    const user = await User.findOne({
      email: credentials.email,
    });
    if (!user) {
      throw new Error("user not found!");
    }
    if (user.status === statusData.Banned) {
      throw new Error("your account is deactivated!");
    }

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) {
      throw new Error("Wrong Credentials!");
    }

    return user;
  } catch (err) {
    return null;
  }
};

export const options = {
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
        try {
          const user = await Login(credentials);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
        session.user.image = token.image;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        const userExist = await User.findOne({ email: user?.email });
        if (userExist) {
          token.id = userExist._id;
          token.image = userExist.profileImage;
          token.role = userExist.role;
          token.name = userExist.firstName + " " + userExist.middleName;
        }
      } else if (token?.email === admin.email) {
        token.id = admin._id;
        token.role = admin.role;
        token.name = admin.firstName + " " + admin.middleName;
      }
      return token;
    },

    async redirect({ url, baseUrl }) {
      return url;
    },
    async signIn({ account, profile }) {
      if (account.provider === "credentials") {
        return true;
      }

      try {
        await connect();
        const userExist = await User.findOne({ email: profile?.email });

        if (!userExist) {
          const name = profile?.name.split(" ");
          const firstName = name[0];
          const middleName = name[1];

          const myrole = await Role.findOne({ role: roleData.Buyer });

          if (!!myrole === true) {
            const user = await User.create({
              firstName,
              middleName,
              profileImage: profile.picture,
              email: profile.email,
              role: myrole._id,
            });
            if (user) return true;
          } else return flase;
        }

        if (userExist.status === statusData.Banned) {
          return false;
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
};
