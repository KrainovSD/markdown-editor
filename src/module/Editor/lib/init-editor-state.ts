import { EditorState } from "@codemirror/state";
import { type InitExtensionsOptions, initExtensions } from "../../../library";

type InitEditorStateOptions = {
  text: string;
} & InitExtensionsOptions;

export function initEditorState({ text, ...rest }: InitEditorStateOptions) {
  return EditorState.create({ doc: text, extensions: initExtensions(rest) });
}
