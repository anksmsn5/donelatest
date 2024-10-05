// app/api/auth/[...nextauth]/route.ts

import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { db } from '@/lib/db'; // Adjust path based on your directory
import { users, coaches } from '@/lib/schema';
import { eq } from 'drizzle-orm';
 

// Define the extended user type
interface ExtendedUser {
  id: string | null;
  type: string | null;
  name: string | null;
  email: string | null;
  image: string | null;
}
  
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'email@example.com' },
        password: { label: 'Password', type: 'password' },
        loginAs: { label: 'Login As', type: 'text' }, // Either 'player' or 'coach'
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }

        const { email, password, loginAs } = credentials;
        
        if (loginAs === 'coach') {
          const coach = await db.select().from(coaches).where(eq(coaches.email, email)).execute();
          if (coach.length === 0 || !(await bcrypt.compare(password, coach[0].password))) {
            return null; // Invalid credentials
          } else {
            return {
              id: coach[0].id.toString(),
              name: coach[0].firstName,
              email: coach[0].email,
              type: 'coach', // Custom field indicating coach or player
              image: coach[0].image,
            };
          }
        } else if (loginAs === 'player') {
          const user = await db.select().from(users).where(eq(users.email, email)).execute();
          if (user.length === 0 || !(await bcrypt.compare(password, user[0].password))) {
            return null; // Invalid credentials
          } else {
            return {
              id: user[0].id.toString(),
              name: user[0].first_name,
              email: user[0].email,
              type: 'player', // Custom field indicating player
              image: user[0].image,
            };
          }
        }
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, 
  },
  callbacks: {
    async jwt({ token, user }) {
      // Check if the user exists and is of the correct type
      if (user) {
        const extendedUser = user as ExtendedUser; // Cast the user to the extended type
        token.id = extendedUser.id;
        token.type = extendedUser.type; // Add user type (coach or player) to the token
        token.image = extendedUser.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.type = token.type as string; // Add the type to the session
        session.user.image = token.image as string | null;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',    
  },
});

// You need to export handler as GET and POST since this is now a Route Handler in the app directory
export { handler as GET, handler as POST };
