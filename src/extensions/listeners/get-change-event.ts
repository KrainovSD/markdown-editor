import { EditorView, type ViewUpdate } from "@codemirror/view";

export type GetChangeEventOptions = {
  onChange?: (view: ViewUpdate) => void;
};

export function getChangeEvent({ onChange }: GetChangeEventOptions) {
  return onChange
    ? EditorView.updateListener.of((e) => {
        if (e.docChanged) {
          onChange(e);
        }
      })
    : [];
}