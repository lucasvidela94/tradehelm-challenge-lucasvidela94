import React from "react";

import styles from "./Form.module.scss";

interface Props {
  onClose: VoidFunction;
}

const Form: React.FC<Props> = ({children, onClose}) => {
  return (
    <section className={styles.container}>
      <b onClick={onClose} />
      <article>{children}</article>
    </section>
  );
};

export default Form;
