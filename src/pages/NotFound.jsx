import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.description}>Página no encontrada</p>
        <a href="/" className={styles.link}>
          Volver al inicio
        </a>
      </div>
    </div>
  );
};

export default NotFound;