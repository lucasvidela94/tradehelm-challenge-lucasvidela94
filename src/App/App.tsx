import * as React from "react";

import api from "../Item/api";
import Item from "../Item/types";

import styles from "./App.module.scss";

enum Status {
  Initial = "Initial",
  Complete = "Complete",
}

const App: React.FC = () => {
  const [items, setItems] = React.useState<Item[]>([]);
  const [status, setStatus] = React.useState<Status>(Status.Initial);

  React.useEffect(() => {
    api.list().then((items) => {
      setItems(items);
      setStatus(Status.Complete);
    });
  }, []);

  if (status === Status.Initial) {
    return <span>Cargando....</span>;
  }

  return (
    <main className={styles.container}>
      <header className={styles.header}>
        <h1>Lista del super mercado</h1>
        <h3>{items.length} items(s)</h3>
      </header>
    </main>
  );
};

export default App;
