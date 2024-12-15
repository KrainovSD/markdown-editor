import { type EditorView } from "@codemirror/view";
import type { SyntaxNodeRef } from "@lezer/common";
import { utils } from "@/lib";
import type {
  DecorationPlugin,
  GetSelectionDecorationOptions,
  SelectionDecorationMap,
} from "../markdown-types";
import {
  CODE_OF_END_IMAGE_TEXT,
  CODE_OF_END_IMAGE_URL,
  CODE_OF_START_IMAGE_TEXT,
  CODE_OF_START_IMAGE_URL,
  NAME_OF_IMAGE,
} from "./image-constants";
import { ImageWidget } from "./image-widget";

export function getImageSelectionDecorations({
  decorations,
  node,
  view,
  isReadonly,
}: GetSelectionDecorationOptions) {
  const { text, url } = parseInfo(view, node);
  const line = view.lineBlockAt(node.from);

  if (line.from === node.from && line.to === node.to) {
    if (
      isReadonly ||
      !view.hasFocus ||
      !utils.isInRange(view.state.selection.ranges, [line.from, line.to])
    ) {
      decorations.push(
        utils.getReplaceDecoration({
          range: [line.from, line.to],
          widget: new ImageWidget(text, url),
        }),
      );
    } else {
      decorations.push(
        utils.getWidgetDecorationOptions({
          range: [node.to + 1],
          widget: new ImageWidget(text, url),
        }),
      );
    }
  } else if (
    isReadonly ||
    !view.hasFocus ||
    !utils.isInRange(view.state.selection.ranges, [line.from, line.to])
  ) {
    decorations.push(
      utils.getReplaceDecoration({
        range: [node.from, node.to],
        widget: new ImageWidget(text, url),
      }),
    );
  } else {
    decorations.push(
      utils.getWidgetDecorationOptions({
        range: [node.to],
        widget: new ImageWidget(text, url),
      }),
    );
  }
}

function parseInfo(view: EditorView, node: SyntaxNodeRef) {
  const content = view.state.doc.sliceString(node.from, node.to);
  const textCoordinates = { from: -1, to: -1 };
  const urlCoordinates = { from: -1, to: -1 };
  let pos = -1;

  while (pos < content.length) {
    pos++;
    const code = content.charCodeAt(pos);

    if (textCoordinates.from === -1 && code === CODE_OF_START_IMAGE_TEXT)
      textCoordinates.from = pos + 1;
    else if (
      urlCoordinates.from === -1 &&
      textCoordinates.to !== -1 &&
      code === CODE_OF_START_IMAGE_URL
    )
      urlCoordinates.from = pos + 1;
    else if (
      textCoordinates.from !== -1 &&
      textCoordinates.to === -1 &&
      code === CODE_OF_END_IMAGE_TEXT
    )
      textCoordinates.to = pos;
    else if (
      urlCoordinates.from !== -1 &&
      urlCoordinates.to === -1 &&
      code === CODE_OF_END_IMAGE_URL
    )
      urlCoordinates.to = pos;
  }

  const text = content.substring(textCoordinates.from, textCoordinates.to);
  const url = content.substring(urlCoordinates.from, urlCoordinates.to);

  return { text, url };
}

const selectionDecorations: SelectionDecorationMap = {
  [NAME_OF_IMAGE]: getImageSelectionDecorations,
};
export const imageDecorationPlugin: DecorationPlugin = {
  selectionDecorations,
};
