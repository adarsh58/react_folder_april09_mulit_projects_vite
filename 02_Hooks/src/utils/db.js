import { openDB } from 'idb';

const DB_NAME = 'redux_persist_db';
const STORE_NAME = 'redux_state';

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
};

export const saveState = async (state) => {
  const db = await initDB();
  await db.put(STORE_NAME, state, 'current_state');
};

export const loadState = async () => {
  const db = await initDB();
  return await db.get(STORE_NAME, 'current_state');
};
