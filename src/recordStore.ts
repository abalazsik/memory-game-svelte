import { writable } from "svelte/store";

const RECORD_KEY = "key";

function createRecordStore() {
    let record : number | undefined = undefined;
    if (localStorage.getItem(RECORD_KEY) !== null) {
        record = Number.parseInt(localStorage.getItem(RECORD_KEY) as string);
    }
    const { subscribe, set, update } = writable(record);
    return {
        subscribe,
        set: (value) => { set(value); localStorage.setItem(RECORD_KEY, value); }
    };
}

export const recordStore = createRecordStore();