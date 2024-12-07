/* eslint-disable no-console */
import { Editor } from "../module";
import "./global.css";

const root = document.querySelector<HTMLElement>("#root");

if (!root) throw new Error("Hasn't root");

const editor = new Editor({
  root,
  initialText: `> Dorothy followed her through many of the beautiful rooms in her castle.
>
>    > The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.
>    > test
> Test > The Witch bade her clean the pots and kettles and sweep the floor and keep the fire fed with wood.

test    `,
  // onChange: (view) => {
  //   console.log(view.state.doc.toString());
  // },
  // onBlur: (state) => {
  //   console.log("blur ", state.doc.toString());
  // },
  // onFocus: (state) => {
  //   console.log("focus ", state.doc.toString());
  // },
  // onEnter: (view) => {
  //   console.log("enter ", view.state.doc.toString());
  // },
  vimMode: false,
  readonly: false,
});

let theme: "dark" | "light" = "light";
const themeButton = document.createElement("button");
themeButton.textContent = "Сменить тему";
document.body.appendChild(themeButton);
themeButton.addEventListener("click", () => {
  editor.setTheme(theme === "light" ? "dark" : "light");
  theme = theme === "light" ? "dark" : "light";
});

let readonly = false;
const readonlyButton = document.createElement("button");
readonlyButton.textContent = "Сменить режим";
document.body.appendChild(readonlyButton);
readonlyButton.addEventListener("click", () => {
  editor.setReadonly(!readonly);
  readonly = !readonly;
});

let vimMode = false;
const vimButton = document.createElement("button");
vimButton.textContent = "Сменить vim режим";
document.body.appendChild(vimButton);
vimButton.addEventListener("click", () => {
  editor.setVimMode(!vimMode);
  vimMode = !vimMode;
});
