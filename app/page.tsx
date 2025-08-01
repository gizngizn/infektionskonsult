import styles from "./page.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MoList from "./components/MoList";

export default function Home() {
  return (
    <div className={styles.page}>
    <Header />
      <main className={styles.main}>
        <MoList />
      </main>
    <Footer />
    </div>
  );
}
