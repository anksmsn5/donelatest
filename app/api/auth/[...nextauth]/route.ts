import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { db } from '../../../../lib/db';
import { users, coaches } from '../../../../lib/schema';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '@/lib/constants';

// Define NextAuth configuration
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
        const { email, password, loginAs } = credentials;
        
        if (loginAs === 'coach') {
          const coach = await db.select().from(coaches).where(eq(coaches.email, email)).execute();
          if (coach.length === 0 || !(await bcrypt.compare(password, coach[0].password))) {
            return null; // Invalid credentials
          } else {
            // Successful authentication for coach
            return {
              id: coach[0].id.toString(), // Convert number to string
              name: coach[0].firstName,
              email: coach[0].email,
              type: 'coach',
              image: coach[0].image
            };
          }
        } else if (loginAs === 'player') {
          const user = await db.select().from(users).where(eq(users.email, email)).execute();
          if (user.length === 0 || !(await bcrypt.compare(password, user[0].password))) {
            return null; // Invalid credentials
          } else {
            // Successful authentication for player
            return {
              id: user[0].id.toString(), // Convert number to string
              name: user[0].first_name,
              email: user[0].email,
              type: 'player',
              image: user[0].image
            };
          }
        }
        return null; // If neither player nor coach found
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: SECRET_KEY, // Use your SECRET_KEY for JWT signing
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.type = user.type; // Add user type (coach or player) to the token
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.type = token.type;
      session.user.image = token.image;
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin', // Redirect to custom sign-in page
  },
});

export { handler as GET, handler as POST };
