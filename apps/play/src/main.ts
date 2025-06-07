import "./style.css";
import { effect, reactive, ref } from "@wlt/reactivity";

const app = document.getElementById("app")!;

const name = ref("wlt");

effect(() => {
  app.innerHTML = `name:${name.value}`;
});

setTimeout(() => {
  name.value = "atticus";
}, 1000);
