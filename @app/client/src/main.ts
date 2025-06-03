import { initApp } from "./app";

const root = document.getElementById("app") as HTMLElement;

const router = initApp(root);

router.start();