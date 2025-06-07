import "./style.css";
import { effect, reactive } from "@wlt/reactivity";

const app = document.getElementById("app")!;

const v = {
  name: "wlt",
  age: 18,
  add: {
    city: "leping",
  },
};

const user = reactive(v);

effect(() => {
  app.innerHTML = `name:${user.name}`;
  console.log("用户执行函数", user.name, user.age);
});

setTimeout(() => {
  user.name = "atticus";
}, 1000);
