export type User = {
  uid: string;
  email: string | null;
};

export function getAuth() {
  return { currentUser: null };
}

export function onAuthStateChanged(
  _auth: unknown,
  cb: (u: null) => void,
): () => void {
  cb(null);
  return () => undefined;
}

export async function signInWithEmailAndPassword() {
  return {};
}

export async function createUserWithEmailAndPassword() {
  return {};
}

export async function signOut() {
  return undefined;
}

export async function getIdToken() {
  return 'mock-id-token';
}
