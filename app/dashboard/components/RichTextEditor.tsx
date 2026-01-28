"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import { Link as TiptapLink } from "@tiptap/extension-link";
import { Image as TiptapImage } from "@tiptap/extension-image";
import { Table } from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Highlight from "@tiptap/extension-highlight";
import TextAlign from "@tiptap/extension-text-align";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Image as LucideImage,
  List,
  Link as LucideLink,
  Table as LucideTable,
  PanelRightOpen,
  PanelRightClose,
  PanelTopClose,
  PanelTopOpen,
  TableCellsMerge,
  TableCellsSplit,
  TableRowsSplit,
  Grid2x2X,
  BetweenHorizontalStart,
  BetweenVerticalEnd,
} from "lucide-react";
import "./tiptap-styles.css";

type Props = {
  content?: string;
  onChange?: (html: string) => void;
  editable?: boolean;
};

export default function RichTextEditor({
  content = "",
  onChange,
  editable = true,
}: Props) {
  const editor = useEditor({
    editable,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3], // Enable headings (h1, h2, h3)
        },
      }),
      Underline, // Add underline support
      Placeholder.configure({
        placeholder: "Enter description...", // Placeholder text
      }),
      TiptapLink.configure({
        openOnClick: false, // Disable opening links on click
      }),
      TiptapImage, // Add image support
      Table.configure({
        resizable: true, // Enable resizable tables
      }),
      TableRow,
      TableCell,
      TableHeader,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Highlight,
    ],
    content: "", // Initial content
    immediatelyRender: false,
    onUpdate({ editor }) {
      const html = editor.getHTML();
      onChange?.(html);
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  // Add an image to the editor
  const addImage = () => {
    const url = window.prompt("Enter the image URL"); // Prompt for image URL
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  // Add a table to the editor
  const addTable = () => {
    editor
      ?.chain()
      .focus()
      .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
      .run();
  };

  if (!editor) return <p>Loading editor...</p>;

  return (
    <div className="border border-gray-300 rounded p-4">
      {/* Toolbar for the editor */}
      <div className="flex flex-wrap gap-2 p-2 border-b border-slate-500">
        {/* Text Formatting */}
        <div className="flex gap-2">
          <button
            type="button"
            title="Bold"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={`p-2 ${
              editor?.isActive("bold") ? "bg-green-100" : "bg-white"
            }`}
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            title="Italics"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={`p-2 ${
              editor?.isActive("italic") ? "bg-green-100" : "bg-white"
            }`}
          >
            <em>I</em>
          </button>
          <button
            type="button"
            title="Underline"
            onClick={() => editor?.chain().focus().toggleUnderline().run()}
            className={`p-2 ${
              editor?.isActive("underline") ? "bg-green-100" : "bg-white"
            }`}
          >
            <u>U</u>
          </button>
        </div>

        {/* Headings */}
        <div className="flex gap-2">
          <button
            type="button"
            title="Heading 1"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`p-2 ${
              editor?.isActive("heading", { level: 1 })
                ? "bg-green-100"
                : "bg-white"
            }`}
          >
            H1
          </button>
          <button
            type="button"
            title="Heading 2"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`p-2 ${
              editor?.isActive("heading", { level: 2 })
                ? "bg-green-100"
                : "bg-white"
            }`}
          >
            H2
          </button>
          <button
            type="button"
            title="Heading 3"
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 3 }).run()
            }
            className={`p-2 ${
              editor?.isActive("heading", { level: 3 })
                ? "bg-green-100"
                : "bg-white"
            }`}
          >
            H3
          </button>
        </div>

        {/* Lists */}
        <div className="flex gap-2">
          <button
            type="button"
            title="List"
            onClick={() => editor?.chain().focus().toggleBulletList().run()}
            className={`p-2 ${
              editor?.isActive("bulletList") ? "bg-green-100" : "bg-white"
            }`}
          >
            <List />
          </button>
        </div>

        {/* Links */}
        <div className="flex gap-2">
          <button
            type="button"
            title="Internet Link"
            onClick={() => {
              const url = window.prompt("Enter the URL");
              if (url) {
                editor?.chain().focus().setLink({ href: url }).run();
              }
            }}
            className={`p-2 ${
              editor?.isActive("link") ? "bg-green-100" : "bg-white"
            }`}
          >
            <LucideLink />
          </button>
        </div>

        {/* Paragraph */}
        <div className="flex gap-2">
          <button
            title="Paragraph"
            onClick={() => editor?.chain().focus().setParagraph().run()}
            className={editor?.isActive("paragraph") ? "is-active" : ""}
          >
            <strong>P</strong>
          </button>
        </div>

        {/* Images */}
        <div className="flex gap-2">
          <button
            type="button"
            title="Insert Image"
            onClick={addImage}
            className="p-2 bg-white"
          >
            <LucideImage />
          </button>
        </div>

        <button
          title="Align Left"
          onClick={() => editor?.chain().focus().setTextAlign("left").run()}
          className={editor?.isActive({ textAlign: "left" }) ? "is-active" : ""}
        >
          <AlignLeft />
        </button>
        <button
          title="Align Center"
          onClick={() => editor?.chain().focus().setTextAlign("center").run()}
          className={
            editor?.isActive({ textAlign: "center" }) ? "is-active" : ""
          }
        >
          <AlignCenter />
        </button>
        <button
          title="Align Right"
          onClick={() => editor?.chain().focus().setTextAlign("right").run()}
          className={
            editor?.isActive({ textAlign: "right" }) ? "is-active" : ""
          }
        >
          <AlignRight />
        </button>
        <button
          title="Align Justify"
          onClick={() => editor?.chain().focus().setTextAlign("justify").run()}
          className={
            editor?.isActive({ textAlign: "justify" }) ? "is-active" : ""
          }
        >
          <AlignJustify />
        </button>

        {/* Tables */}
        <div className="flex gap-2">
          <button
            type="button"
            title="Insert Table"
            onClick={addTable}
            className="p-2 bg-white"
          >
            <LucideTable />
          </button>
        </div>

        {/* Table Actions */}
        <div className="flex gap-2">
          <button
            title="Add Column Before"
            onClick={() => editor?.chain().focus().addColumnBefore().run()}
            disabled={!editor?.can().addColumnBefore()}
          >
            <PanelRightClose />
          </button>
          <button
            title="Add Column After"
            onClick={() => editor?.chain().focus().addColumnAfter().run()}
            disabled={!editor?.can().addColumnAfter()}
          >
            <PanelRightOpen />
          </button>
          <button
            title="Delete Column"
            onClick={() => editor?.chain().focus().deleteColumn().run()}
            disabled={!editor?.can().deleteColumn()}
          >
            <BetweenVerticalEnd />
          </button>
          <button
            title="Add Row Before"
            onClick={() => editor?.chain().focus().addRowBefore().run()}
            disabled={!editor?.can().addRowBefore()}
          >
            <PanelTopClose />
          </button>
          <button
            title="Add Row After"
            onClick={() => editor?.chain().focus().addRowAfter().run()}
            disabled={!editor?.can().addRowAfter()}
          >
            <PanelTopOpen />
          </button>
          <button
            title="Delete Row"
            onClick={() => editor?.chain().focus().deleteRow().run()}
            disabled={!editor?.can().deleteRow()}
          >
            <BetweenHorizontalStart />
          </button>
          <button
            title="Delete Table"
            onClick={() => editor?.chain().focus().deleteTable().run()}
            disabled={!editor?.can().deleteTable()}
          >
            <Grid2x2X />
          </button>
          <button
            title="Merge Cells"
            onClick={() => editor?.chain().focus().mergeCells().run()}
            disabled={!editor?.can().mergeCells()}
          >
            <TableCellsMerge />
          </button>
          <button
            title="Split Cell"
            onClick={() => editor?.chain().focus().splitCell().run()}
            disabled={!editor?.can().splitCell()}
          >
            <TableCellsSplit />
          </button>
          <button
            title="Merge Or Split"
            onClick={() => editor?.chain().focus().mergeOrSplit().run()}
            disabled={!editor?.can().mergeOrSplit()}
          >
            <TableRowsSplit />
          </button>
        </div>
      </div>
      <EditorContent editor={editor} className="p-4 min-h-[150px]" />
    </div>
  );
}
