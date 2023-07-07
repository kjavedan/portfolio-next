import React from "react";
import styles from "./styles.module.scss";
export default function layout({ children }) {
  return <div className={styles.wrapper}>{children}</div>;
}
