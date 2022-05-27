import React from "react";

import styles from "./FormFooter.module.scss";

const FormFooter: React.FC = ({children}) => {
  return <nav className={styles.container}>{children}</nav>;
};

export default FormFooter;
