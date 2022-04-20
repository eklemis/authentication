import styles from "./screen.module.css";
export default function Screen(props) {
	return <section className={styles.wrapper}>{props.children}</section>;
}
