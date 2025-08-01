import styles from "./page.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MoList from "./components/MoList";
import { Suspense } from "react"

export default function Home() {
  return (
    <div className={styles.page}>
    <Header />
      <main className={styles.main}>
        <Suspense>
          <MoList />
        </Suspense>
      </main>
    <Footer />
    </div>
  );
}
