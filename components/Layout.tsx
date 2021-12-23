import styles from "./layout.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const DARK_CLASS = "dark";

export default function Layout({ children }: any) {
  const systemPrefersDark = useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined,
    (prefersDark) => {
      setIsDark(prefersDark);
    }
  );

  const [isDark, setIsDark] = useState(systemPrefersDark);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add(DARK_CLASS);
    } else {
      document.documentElement.classList.remove(DARK_CLASS);
    }
  }, [isDark]);

  const handleToggle = (e: any) => {
    setIsDark(e.target.checked);
  };

  return (
    <>
      <div className={styles.titleContainer}>
        <Link href="/">
          <a className={styles.title}>
            <h1>Where in the world?</h1>
          </a>
        </Link>
        <div className={styles.switchContainer}>
          <label className={styles.switch}>
            <input
              className={styles.checkbox}
              type="checkbox"
              checked={isDark}
              onChange={handleToggle}
            />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
        </div>
      </div>
      <main>{children}</main>
    </>
  );
}
