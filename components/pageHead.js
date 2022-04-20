import Head from "next/head";
export default function PageHead() {
	return (
		<Head>
			<title>Authentication</title>
			<meta
				name="description"
				content="An authentication providing easy login via google, facebook, github, or twitter login screen"
			/>
			<link rel="icon" href="/auth-64.ico" />
		</Head>
	);
}
