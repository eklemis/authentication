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

export default function Signin({ csrfToken, providers }) {
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
		let options = {
			redirect: false,
			email: credentials.email,
			password: credentials.password,
			name: "Sample Credential",
		};
		//console.log(credentials);
		const res = await signIn("credentials", options);
		setMessage(null);
		if (res?.error) {
			setMessage(res.error);
		} else {
			console.log("Res: ", res);
			Router.push("/");
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
			<h1 className={styles.title}>Login </h1>
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
				<input type="submit" value="Login" onClick={registerHandler} />
			</form>
			<div className={styles["wrapper__center"]}>
				<p className={styles["social-text"]}>
					or continue with these social profile
				</p>
				<div className={styles["button-wrapper"]}>{providersButtons}</div>
				<p className={styles.direction}>
					Don’t have an account yet?{" "}
					<Link href="/signup">
						<a>Register</a>
					</Link>
				</p>
			</div>
		</Screen>
	);
}
