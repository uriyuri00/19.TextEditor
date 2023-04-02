import { openDB } from 'idb';

const initdb = async () =>
// creating a new database named 'jate' which will be using version 1 of the database.
  openDB('jate', 1, {
    // Add our database schema if it has not already been initialized
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // create a new object store for the data and give it an ke
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) =>{
  console.log('PUT to the database');
  try{
  const jateDb = await openDB('jate',1);

  const tx = jateDb.transaction('jate', "readwrite");

  const store = tx.objectStore('jate');

  const request = store.put({id: id, content: content});

  const result = await request;

  console.log('data saved to the database', result);

} catch {

  console.error('putDb not implemented');
  
}
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('Get from the database');
  try {
    const jateDb = await openDB('jate', 1);

    const tx = jateDb.transaction('jate', 'readonly');

    const store = tx.objectStore('jate');
    
    const result = await request;
    
    console.log('result.value', result);

    return result

  } catch {

  console.error('getDb not implemented');

  }}

initdb();
