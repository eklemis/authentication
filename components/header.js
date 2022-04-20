import Image from "next/image";
import styles from "./header.module.css";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
export default function TopHeader() {
	const { data: session, status } = useSession();
	const name = session?.user?.name;
	const photo = session?.user?.image
		? session?.user?.image
		: "/portrait_black.svg";
	const [dropDownShow, setDropDownShow] = useState(false);
	const [menuStyle, setMenuStyle] = useState(
		styles["toggle-menu"] + " " + styles["down"]
	);

	function toggleMenuHandler() {
		if (dropDownShow) {
			setMenuStyle(styles["toggle-menu"] + " " + styles["down"]);
		} else {
			setMenuStyle(styles["toggle-menu"] + " " + styles["up"]);
		}
		setDropDownShow(!dropDownShow);
	}
	if (status === "authenticated")
		return (
			<header className={styles.header}>
				<Link href="/" passHref alt="">
					<a>
						<div className={styles["account-wrapper"]}>
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
					</a>
				</Link>
				<div className={styles["account-wrapper"]}>
					<div className={styles["image-holder"]}>
						<Image
							src={photo}
							layout="fill"
							objectFit="cover"
							alt="profile photo"
						/>
					</div>
					<p className={styles["themed-text"]}>{name}</p>
					<button className={menuStyle} onClick={toggleMenuHandler}></button>
				</div>
				{dropDownShow && (
					<ul className={styles.menu}>
						<li className={styles.profile}>
							<Link href="/">
								<div className={styles["menu-item"]}>
									<span>My Profile</span>
								</div>
							</Link>
						</li>
						<li className={styles.group}>
							<Link href="#">
								<div className={styles["menu-item"]}>
									<span>Group Chat</span>
								</div>
							</Link>
						</li>
						<li className={styles["hor-line"]}></li>
						<li>
							<button className={styles.logout} onClick={() => signOut()}>
								Logout
							</button>
						</li>
					</ul>
				)}
			</header>
		);
	if (status === "loading") return <p>Loading...</p>;
}
