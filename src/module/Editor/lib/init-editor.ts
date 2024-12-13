import { EditorView } from "@codemirror/view";
import { type WebsocketProvider } from "y-websocket";
import type { Text } from "yjs";
import type { EditorArguments } from "../Editor.types";
import { initEditorProvider } from "./init-editor-provider";
import { initEditorState } from "./init-editor-state";

export function initEditor({ multiCursor, root, initialText, ...rest }: EditorArguments) {
  let provider: WebsocketProvider | undefined;
  let multiCursorText: Text | undefined;

  if (multiCursor) {
    const editorProvider = initEditorProvider({ ...multiCursor, initialText });
    provider = editorProvider.provider;
    multiCursorText = editorProvider.multiCursorText;
  }

  const state = initEditorState({ ...rest, text: initialText || "", provider, multiCursorText });
  const view = new EditorView({
    state,
    parent: root,
  });

  return { view, provider };
}
