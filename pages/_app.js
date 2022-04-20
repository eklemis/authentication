import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
	return (
		<SessionProvider
			session={pageProps.session}
			options={{
				clientMaxAge: 60, // Re-fetch session if cache is older than 60 seconds
			}}
		>
			<Component {...pageProps} />
		</SessionProvider>
	);
}

export default MyApp;
