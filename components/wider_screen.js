import styles from "./wider_screen.module.css";

export default function WiderScreen({ children }) {
	return <section className={styles.wrapper}>{children}</section>;
}
