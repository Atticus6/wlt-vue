import "./style.css";
// import { computed, effect, reactive, ref } from "@wlt/reactivity";
import { ref, createRenderer, h } from "vue";
import { rendererOptions, render } from "@wlt/runtime-dom";
const app = document.getElementById("app")!;

const count = ref(10);

const vNode = h(
  "div",
  {
    class: "a",
    style: {
      color: "red",
    },

    onClick: () => {
      console.log(11111);
    },
  },
  [h("h1", "h1"), h("h2", "h2")]
);

console.log(vNode);

render(vNode, app);
// effect(() => {
//   app.innerHTML = `total:${count.value}`;
// });

// setTimeout(() => {
//   count.value = 30;
// }, 1000);
