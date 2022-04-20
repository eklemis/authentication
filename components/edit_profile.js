import styles from "./edit_profile.module.css";
import WiderScreen from "./wider_screen";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Router from "next/router";

export default function EditProfile() {
	const { data: session, status } = useSession();
	const [user, setUser] = useState({});
	const [uploadingStyle, setUploadingStyle] = useState(styles.hide);

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
			.then((res_data) => {
				setUser(res_data.user);
				setUserPhoto(res_data.user.image);
			});
	}, []);
	const [uploadedImg, setUploadedImg] = useState("");
	const [userPhoto, setUserPhoto] = useState();

	function nameChangeHandler(ev) {
		//setFormData({ ...formData, name: ev.target.value });
		setUser({ ...user, name: ev.target.value });
	}
	function emailChangeHandler(ev) {
		//setFormData({ ...formData, email: ev.target.value });
		setUser({ ...user, email: ev.target.value });
	}
	function passwordChangeHandler(ev) {
		//setFormData({ ...formData, password: ev.target.value });
		setUser({ ...user, password: ev.target.value });
	}
	function bioChangeHandler(ev) {
		//setFormData({ ...formData, bio: ev.target.value });
		setUser({ ...user, bio: ev.target.value });
	}
	function phoneChangeHandler(ev) {
		//setFormData({ ...formData, phone: ev.target.value });
		setUser({ ...user, phone: ev.target.value });
	}
	async function submitFormHandler(ev) {
		ev.preventDefault();
		console.log("send to server:", user);

		const resp = await fetch("/api/update_user", {
			method: "POST",
			body: JSON.stringify({ ...user }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		const serverData = await resp.json();
		console.log("received from server:", serverData);
		Router.push("/");
	}
	useEffect(() => {
		setUser({ ...user, image: uploadedImg });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [uploadedImg]);
	useEffect(() => {
		if (uploadedImg.trim() !== "") setUserPhoto(uploadedImg);
		else setUserPhoto(session?.user.image);
	}, [session.user.image, uploadedImg]);
	const uploadToClient = async (event) => {
		setUploadingStyle(styles.uploading);
		if (event.target.files && event.target.files[0]) {
			const i = event.target.files[0];
			const result = await uploadToServer(i);
			setUploadedImg(result.apiResp.display_url);
		}
		setUploadingStyle(styles.hide);
	};

	const uploadToServer = async (imageFile) => {
		const body = new FormData();
		body.append("file", imageFile);
		const response = await fetch("/api/upload", {
			method: "POST",
			body,
		});
		return response.json();
	};
	if (status === "loading") return <p>Loading</p>;
	return (
		<WiderScreen>
			{user.name && (
				<form>
					<ul className={styles.wrapper}>
						<li>
							<h1 className={styles["page-title"]}>Change Info</h1>
							<p className={styles["main-caption"]}>
								Changes will be reflected to every services
							</p>
						</li>
						<li>
							<div className={styles["image-holder"]}>
								<Image
									src={userPhoto !== null ? userPhoto : "/portrait_black.svg"}
									layout="fill"
									alt=""
									blurDataURL="/blured.jpg"
									placeholder="blur"
								/>
								<div className={uploadingStyle}></div>
							</div>
							<input
								id="imageFile"
								type="file"
								accept="image/*"
								className={styles["btn__upload"]}
								onChange={uploadToClient}
							/>
							<label htmlFor="imageFile">CHANGE PHOTO</label>
						</li>
						<li>
							<label htmlFor="name">Name</label>
							<input
								type="text"
								id="name"
								value={user.name}
								onChange={nameChangeHandler}
							/>
						</li>
						<li>
							<label htmlFor="bio">Bio</label>
							<textarea
								rows="3"
								cols="50"
								id="bio"
								onChange={bioChangeHandler}
								value={user.bio == null ? "" : user.bio}
							/>
						</li>
						<li>
							<label htmlFor="phone">Phone</label>
							<input
								type="text"
								id="phone"
								value={user.phone === null ? "" : user.phone}
								onChange={phoneChangeHandler}
							/>
						</li>
						<li>
							<label htmlFor="email">Email</label>
							<input
								type="email"
								id="email"
								value={user.email}
								onChange={emailChangeHandler}
							/>
						</li>
						<li>
							<label htmlFor="password">Password</label>
							<input
								type="text"
								id="password"
								value={user.password === null ? "" : user.password}
								onChange={passwordChangeHandler}
							/>
						</li>
						<li>
							<input type="submit" value="Save" onClick={submitFormHandler} />
						</li>
					</ul>
				</form>
			)}
		</WiderScreen>
	);
}
