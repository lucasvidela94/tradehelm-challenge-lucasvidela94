import * as React from "react";

import api from "../Item/api";
import Item from "../Item/types";
import Button from "../Interface/Manageble/Buttons/Buttons";
import Form, {FormFooter} from "../Interface/Manageble/Form";
import TextField from "../Interface/Input/TextField/TextField";

import styles from "./App.module.scss";

interface Form extends HTMLFormElement {
  text: HTMLInputElement;
}

enum Status {
  Initial = "Initial",
  Complete = "Complete",
}

const App: React.FC = () => {
  const [items, setItems] = React.useState<Item[]>([]);
  const [status, setStatus] = React.useState<Status>(Status.Initial);
  const [isFormVisible, toggleForm] = React.useState<boolean>(false);

  function remove(id: Item["id"]) {
    api.remove(id).then(() => setItems((items) => items.filter((item) => item.id !== id)));
  }

  function add(event: React.FormEvent<Form>) {
    event.preventDefault();

    const text = event.currentTarget.text.value.trim();

    if (!text) return;
    api.create(text).then((item) => setItems((items) => items.concat(item)));
    toggleForm(false);
  }

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
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => remove(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Button colorScheme="primary" onClick={() => toggleForm(true)}>
        Añadir item
      </Button>
      {isFormVisible && (
        <Form onClose={() => toggleForm(false)}>
          <form onSubmit={add}>
            <h2>Añadir item</h2>
            <TextField name="text" />
            <FormFooter>
              <Button type="button">Cancel</Button>
              <Button colorScheme="primary" type="submit">
                Añadir
              </Button>
            </FormFooter>
          </form>
        </Form>
      )}
    </main>
  );
};

export default App;
