import Item from "./types";

const MOCK: Item[] = [
  {
    id: 1,
    text: "Sanguchito de miga",
  },
  {
    id: 2,
    text: "Pizza de guanaco",
  },
  {
    id: 3,
    text: "Helado sabor cucaramonga",
  },
];

export default {
  list: (): Promise<Item[]> => Promise.resolve(MOCK),
  create: (text: Item["text"]): Promise<Item> => Promise.resolve({id: +new Date(), text}),
  remove: (id: Item["id"]): Promise<Item["id"]> => Promise.resolve(id),
};
