import PageHead from "../components/pageHead";
import TopHeader from "../components/header";
import Profile from "../components/profile";
import styles from "../styles/Home.module.css";
import { useSession, getSession } from "next-auth/react";
import Router from "next/router";
export default function Home() {
	const sessions = useSession();
	const refreshedSession = async () => await getSession();
	console.log("refreshedSession:", refreshedSession());
	console.log("session:", sessions);
	const { session, status } = sessions;
	console.log("Session:", sessions);
	if (status === "unauthenticated") {
		Router.push("/signup");
	}
	return (
		<div className={styles.container}>
			<PageHead />
			<TopHeader />
			{status === "loading" && <p>Loading...</p>}
			{status === "authenticated" && (
				<main className={styles.main}>
					<h1>Personal Info</h1>
					<p className={styles["main-caption"]}>
						Basic info, like your name and photo
					</p>
					<Profile />
				</main>
			)}
		</div>
	);
}
export async function getServerSideProps(context) {
	return {
		props: {},
	};
}
