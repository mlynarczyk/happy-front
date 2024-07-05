import { create } from "zustand";

export type EditorState = {
  iframeRef: HTMLIFrameElement | null;
};

export type CanvasStore = {
  editorState: EditorState;
  setEditorState: (canvas: EditorState) => void;
};

export const useCanvasStore = create<CanvasStore>()((set) => ({
  editorState: null as unknown as EditorState,
  setEditorState: (editorState) => {
    set({ editorState });
  },
}));
