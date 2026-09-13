import styles from "../styles/PostCard.module.css";

export function PostCard({ title, content }: { title:string; content:string }) {
    return <article className={styles.card}>
        <h3>{title}</h3>
        <p>{content}</p>
    </article>
}