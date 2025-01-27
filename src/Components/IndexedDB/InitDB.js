import { openDB } from 'idb';

const dbName = 'ImageDB';
const STORE_NAME = 'images';
const EXPIRY_TIME = 5 * 60 * 1000; // 5 minutes in milliseconds

export const initDB = async () => {
  return openDB(dbName, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
};

export const addDataToDB = async (data) => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    await tx.store.put({ ...data, timestamp: Date.now() });
    await tx.done;
  };
  
  // Get data from IndexedDB
  export const getDataFromDB = async () => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, "readonly");
    const allData = await tx.store.getAll();
    await tx.done;
    return allData;
  };
  
  // Delete expired data
 export const deleteExpiredData = async () => {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, "readwrite");
    const allData = await tx.store.getAll();
  
    const now = Date.now();
    for (const item of allData) {
      if (now - item.timestamp > EXPIRY_TIME) {
        await tx.store.delete(item.id);
      }
    }
  
    await tx.done;
  };