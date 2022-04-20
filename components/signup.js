import styles from "./signup.module.css";
import Screen from "./screen";
import Image from "next/image";
import {
	getCsrfToken,
	getProviders,
	signIn,
	getSession,
} from "next-auth/react";
import { useState } from "react";
import Router from "next/router";
import Link from "next/link";

export default function Signup({ csrfToken, providers }) {
	//console.log(providers);
	const icons = {
		facebook: "/icons/Facebook Icon.svg",
		github: "/icons/GitHub Icon.svg",
		google: "/icons/icon-google.svg",
		twitter: "/icons/Twitter Icon.svg",
	};
	const providersButtons = Object.values(providers).map(
		(provider, idx) =>
			idx > 0 && (
				<button key={provider.name} onClick={() => signIn(provider.id)}>
					<Image width={18} height={18} src={icons[provider.id]} alt="" />
				</button>
			)
	);
	const [credentials, setCredential] = useState({
		csrfToken: csrfToken,
		email: "",
		password: "",
	});
	const [message, setMessage] = useState(null);
	function emailChange(ev) {
		setCredential({ ...credentials, email: ev.target.value });
	}
	function passwordChange(ev) {
		setCredential({ ...credentials, password: ev.target.value });
	}
	async function registerHandler(ev) {
		ev.preventDefault();
		const postData = {
			email: credentials.email,
			password: credentials.password,
		};
		const newPost = await fetch("/api/register_user", {
			method: "POST",
			body: JSON.stringify({ ...postData }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const serverData = await newPost.json();
		console.log("received from server:", serverData);
		setMessage(null);
		if (serverData?.error) {
			setMessage(serverData.error);
		} else {
			setMessage("Successfully registered! Please, sign in!");
		}
	}
	return (
		<Screen>
			<div className={styles["wrapper__hor"]}>
				<div className={styles["icon-wrapper"]}>
					<Image
						src="/devchallenges.png"
						layout="fill"
						objectFit="cover"
						alt=""
					/>
				</div>
				<span className={styles["icon-text"]}>devchallenges</span>
			</div>
			<h1 className={styles.title}>
				Join thousands of learners from around the world{" "}
			</h1>
			<p className={styles.text}>
				Master web development by making real-life projects. There are multiple
				paths for you to choose
			</p>
			<p className={styles.error}>{message}</p>
			<form className={styles.form} action="" method="POST">
				<input name="csrfToken" type="hidden" defaultValue={csrfToken} />
				<input
					type="email"
					name="email"
					id="email"
					placeholder="Email"
					onChange={emailChange}
					value={credentials.email}
				/>
				<input
					type="password"
					placeholder="Password"
					onChange={passwordChange}
					value={credentials.password}
				/>
				<input
					type="submit"
					value="Start coding now "
					onClick={registerHandler}
				/>
			</form>
			<div className={styles["wrapper__center"]}>
				<p className={styles["social-text"]}>
					or continue with these social profile
				</p>
				<div className={styles["button-wrapper"]}>{providersButtons}</div>
				<p className={styles.direction}>
					Adready a member?{" "}
					<Link href="/signin">
						<a>Login</a>
					</Link>
				</p>
			</div>
		</Screen>
	);
}
