import { EditorView } from "@codemirror/view";
import { CLASSES } from "../theme.constants";
import type { ThemeConfig } from "../theme.types";

export function getThemeTemplate(dark: boolean, config: Required<ThemeConfig>) {
  return EditorView.theme(
    {
      "&": {
        color: config.color,
        backgroundColor: config.background,
      },
      ".cm-content": {
        fontFamily: config.fontFamily || "Montserrat",
      },
      "&.cm-editor.cm-focused": { outline: "none" },
      "&.cm-editor": {
        height: "100% !important",
      },
      [`.${CLASSES.listCommon}:after`]: {
        background: config.color,
      },
      [`.${CLASSES.code}`]: {
        background: config.codeBackground,
        color: config.codeColor,
      },
      [`.${CLASSES.horizontal}`]: {
        borderBottomColor: config.horizontalColor,
      },
      [`.${CLASSES.link}`]: {
        color: config.linkColor,
      },
      [`.${CLASSES.blockquote}`]: {
        borderLeftColor: config.blockquoteColor,
      },
      [`.${CLASSES.blockquoteInner}:before`]: {
        borderLeftColor: config.blockquoteColor,
      },
      [`.${CLASSES.codeButton}`]: {
        color: config.codeButtonColor,
      },
      [`.${CLASSES.codeButton}:hover`]: {
        background: config.codeButtonBackground,
      },
      [`.${CLASSES.codeButtonSuccess}:after`]: {
        borderColor: config.codeButtonColor,
      },
      [`.${CLASSES.codeButtonFail}:after`]: {
        background: config.codeButtonColor,
      },
      [`.${CLASSES.codeButtonFail}:before`]: {
        background: config.codeButtonColor,
      },
      [`.${CLASSES.codeButtonPending}:before`]: {
        borderColor: config.codeBackground,
        borderTopColor: config.codeButtonColor,
      },
    },
    { dark },
  );
}
