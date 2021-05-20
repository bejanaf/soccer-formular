export function saveToLocal(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function loadFromLocal(key) {
  try {
    const localData = localStorage.getItem(key);
    return JSON.parse(localData);
  } catch (error) {
    console.error(error);
  }
}

// speichert wo etwas (, key und property) generische Fkt.
// JSON.stringify, weil localStorage immer in strings arbeitet
// Ziel ist player in unsere localStorage zu speichern
// addPlayer(), saveToLocalStorage
// imprt  {saveToLocal} from 'lib/localStorageX' /Seiteneffekt
// useEffect callback und leeres Array []
// X
// const localData = localStorage.getItem(key);
// return JSON.parse(localData); Daten zurückwandeln
// loadfromLocal einen Key übergeben
// try and Catch, um Fehler abzufangen
// App.js ?? nullish... 0, oder undefiend, dann leeres Array []

//inspect, storage, localStorage um die Daten zu sehen
// um seine Daten zu persistieren
