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
        session.user.myrole = token.myrole;
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        const userExist = await User.findOne({ email: user?.email });
        const rolePromise = await Role.find({ _id: { $in: userExist.role } });

        const rolesAndPermissions = rolePromise.map((role) => {
          return { role: role.role, permission: role.permission };
        });

        if (userExist) {
          token.id = userExist._id;
          token.image = userExist.profileImage;
          token.role = userExist.role;
          token.myrole = rolesAndPermissions;
          token.name = userExist.firstName + " " + userExist.middleName;
        }
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
          const firstName = name[0] ? name[0] : "";
          const middleName = name[1] ? name[1] : "";

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
  pages: {
    signIn: "/login",
    error: "/login",
  },
  redirects: {
    signIn: "/",
  },
};
