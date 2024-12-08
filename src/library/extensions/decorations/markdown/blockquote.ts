import { WidgetType } from "@codemirror/view";
import type {
  GetDecorationOptions,
  GetSelectionDecorationOptions,
} from "./decoration-markdown-types";
import { getHideDecoration, getLineDecoration, getReplaceDecoration, isInRange } from "./lib";
import styles from "./styles.module.scss";

const MARK = "QuoteMark";
const CODE_OF_SPACE = 32;
const CODE_OF_MARK = 62;

export function getBlockquoteDecorations({ decorations, node, view }: GetDecorationOptions) {
  if (node.name !== MARK) {
    return;
  }

  const line = view.lineBlockAt(node.from);
  let isInner = false;

  if (line.from !== node.from) {
    const content = view.state.doc.sliceString(line.from, node.to);
    let pos = content.length - 1;

    while (pos >= 0) {
      pos--;
      const currentCode = content.charCodeAt(pos);
      if (currentCode === CODE_OF_SPACE) continue;
      if (currentCode === CODE_OF_MARK) {
        isInner = true;
        break;
      }
      pos = -1;
    }
  }

  if (!isInner)
    decorations.push(
      getLineDecoration({
        style: styles.blockquote,
        range: [line.from],
      }),
    );
}

export function getBlockquoteSelectionDecorations({
  decorations,
  node,
  view,
  isReadonly,
}: GetSelectionDecorationOptions) {
  if (node.name !== MARK) {
    return;
  }

  const line = view.lineBlockAt(node.from);
  let isInner = false;

  if (line.from !== node.from) {
    const content = view.state.doc.sliceString(line.from, node.to);
    let pos = content.length - 1;

    while (pos >= 0) {
      pos--;
      const currentCode = content.charCodeAt(pos);
      if (currentCode === CODE_OF_SPACE) continue;
      if (currentCode === CODE_OF_MARK) {
        isInner = true;
        break;
      }
      pos = -1;
    }
  }

  if (
    isReadonly ||
    !view.hasFocus ||
    !isInRange(view.state.selection.ranges, [line.from, line.to])
  ) {
    if (!isInner) decorations.push(getHideDecoration({ range: [node.from, node.to] }));
    else
      decorations.push(
        getReplaceDecoration({ widget: new BlockquoteWidget(), range: [node.from, node.to] }),
      );
  }
}

class BlockquoteWidget extends WidgetType {
  toDOM(): HTMLElement {
    const span = document.createElement("span");
    span.classList.add(styles.blockquote__inner);

    return span;
  }
}
