import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import GitHubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../db";
import { emailValid, passwordValid } from "../../../lib/validators";

export default NextAuth({
	session: {
		//strategy: "database",
		strategy: "jwt",
		// Seconds - How long until an idle session expires and is no longer valid.
		maxAge: 14 * 24 * 60 * 60, // 14 days

		// Seconds - Throttle how frequently to write to database to extend a session.
		// Use it to limit write operations. Set to 0 to always update the database.
		// Note: This option is ignored if using JSON Web Tokens
		updateAge: 24 * 60 * 60, // 24 hours
	},
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: "Credentials",
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: {
					label: "Email",
					type: "email",
					placeholder: "jsmith@test.com",
				},
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials, req) {
				if (!emailValid(credentials.email))
					throw new Error("Email format not correct!");
				if (!passwordValid(credentials.password))
					throw new Error("Password format incorect!");
				const checkedUser = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});
				if (
					checkedUser !== null &&
					checkedUser.password === credentials.password
				)
					return checkedUser;
				else throw new Error("Credential not valid!");
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
		FacebookProvider({
			clientId: process.env.FACEBOOK_CLIENT_ID,
			clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		}),
		GitHubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		TwitterProvider({
			clientId: process.env.TWITTER_CLIENT_ID,
			clientSecret: process.env.TWITTER_CLIENT_SECRET,
		}),
	],
	pages: {
		signIn: "/signin",
		//signOut: "/auth/signout",
		error: "/auth/error", // Error code passed in query string as ?error=
		verifyRequest: "/auth/verify-request", // (used for check email message)
		newUser: "/auth/new-user", // New users will be directed here on first sign in (leave the property out if not of interest)
	},
	callbacks: {
		async session({ session, token, user }) {
			const checkedUser = await prisma.user.findUnique({
				where: {
					email: token.email,
				},
			});
			//console.log("token checked user:", checkedUser);
			session.user.id = token.sub;
			session.user.image = checkedUser.image;
			session.user.name = checkedUser.name;
			return session;
		},
		async jwt({ token, user, account, profile, isNewUser }) {
			return token;
		},
	},
});
