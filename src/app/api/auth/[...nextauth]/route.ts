import User from "@/lib/model";
import { connectMongoDB } from "@/lib/mongoose";
import NextAuth from "next-auth/next";
import CredentialsProvider, {
  CredentialsConfig,
} from "next-auth/providers/credentials";
import { SessionStrategy } from "next-auth";

// Define your authOptions
const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials: any) {
        const { email } = credentials;
        try {
          await connectMongoDB();
          const user = await User.findOne({ email });

          if (!user) {
            return null;
          }

          return user;
        } catch (error) {
          console.log("Error: ", error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt" as SessionStrategy, // Ensure the type is SessionStrategy
  },
  secret: process.env.NEXTAUTH_SECRET || undefined,
  pages: {
    signIn: "/login",
  },
};

// Initialize NextAuth with authOptions
const handler = NextAuth(authOptions);

// Export the handler
export { handler as GET, handler as POST };
