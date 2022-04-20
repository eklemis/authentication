import styles from "./profile.module.css";
import WiderScreen from "./wider_screen";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Profile() {
	const { data: session, status } = useSession();
	const name = session?.user?.name;
	const email = session?.user?.email;
	const photo = session.user.image ? session.user.image : "/portrait_black.svg";
	const [user, setUser] = useState({});
	useEffect(() => {
		fetch("/api/user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				setUser(data.user);
			});
	}, [session]);
	return (
		<WiderScreen>
			{session?.user && (
				<ul className={styles.wrapper}>
					<li>
						<div>
							<h2 className={styles.title}>Profile</h2>
							<p className={styles["main-caption"]}>
								Some info may be visible to other people
							</p>
						</div>
						<a href="/edit_profile" className={styles["btn-edit"]}>
							Edit
						</a>
					</li>
					<li>
						<span>Photo</span>
						<div className={styles["photo-holder"]}>
							<img
								src={user.image !== null ? user.image : "/portrait_black.svg"}
								alt=""
							/>
						</div>
					</li>
					<li>
						<span>Name</span>
						<p>{user.name}</p>
					</li>
					<li>
						<span>Bio</span>
						<p>{user.bio}</p>
					</li>
					<li>
						<span>Phone</span>
						<p>{user.phone}</p>
					</li>
					<li>
						<span>Email</span>
						<p>{user.email}</p>
					</li>
					<li>
						<span>Password</span>
						<p>{user.password !== null && "**********"}</p>
					</li>
				</ul>
			)}
		</WiderScreen>
	);
}
