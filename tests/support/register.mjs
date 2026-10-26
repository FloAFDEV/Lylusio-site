// Permet à `node --test` d'importer les modules TypeScript du dépôt
// (imports relatifs sans extension), sans dépendance supplémentaire.
import { register } from "node:module";

register("./ts-resolve-hooks.mjs", import.meta.url);
