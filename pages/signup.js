import PageHead from "../components/pageHead";
import styles from "../styles/Home.module.css";
import {
	getProviders,
	signIn,
	signOut,
	getSession,
	getCsrfToken,
	useSession,
} from "next-auth/react";
import Signup from "../components/signup";
import Router from "next/router";

export default function SignUp({ providers, csrfToken }) {
	const { session, status } = useSession();
	if (status === "authenticated") Router.push("/");
	return (
		<div className={styles.container}>
			<PageHead />
			<Signup providers={providers} csrfToken={csrfToken} />
		</div>
	);
}

// This is the recommended way for Next.js 9.3 or newer
export async function getServerSideProps(context) {
	const { req, res } = context;
	const session = await getSession({ req });
	const providers = await getProviders();
	const csrfToken = await getCsrfToken(req);
	return {
		props: { providers, csrfToken },
	};
}

/*
// If older than Next.js 9.3
SignIn.getInitialProps = async () => {
  return {
    providers: await getProviders()
  }
}
*/
