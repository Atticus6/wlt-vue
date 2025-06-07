import "./style.css";
import { computed, effect, reactive, ref } from "@wlt/reactivity";

const app = document.getElementById("app")!;

const count = ref(10);
const total = computed(() => {
  return count.value * 2;
});
effect(() => {
  app.innerHTML = `total:${total.value}`;
});

setTimeout(() => {
  count.value = 30;
}, 1000);
