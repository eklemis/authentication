import PageHead from "../components/pageHead";
import TopHeader from "../components/header";
import EditProfile from "../components/edit_profile";
import styles from "../styles/Home.module.css";
import { useSession } from "next-auth/react";
import Router from "next/router";
import Link from "next/link";
import Image from "next/image";
export default function EditProfilePage() {
	const sessions = useSession();
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
					<div className={styles.left}>
						<Link href="/" passHref>
							<div className={styles["back-wrapper"]}>
								<Image
									src="/icons/arrow_back.svg"
									width={15}
									height={30}
									alt=""
								></Image>
								<span>Back</span>
							</div>
						</Link>
					</div>
					<EditProfile />
				</main>
			)}
		</div>
	);
}
