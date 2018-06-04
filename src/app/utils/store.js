let store = null;

export function setStore(newStore) {
  store = newStore;
}

export function getStore() {
  return store;
}

export function getStoreState() {
  if(getStore()) {
    return getStore().getState();
  }
  return false;
}
