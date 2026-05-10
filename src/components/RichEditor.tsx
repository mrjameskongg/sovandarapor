import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import { Button } from '@/components/ui/button';
import { Bold, Italic, Heading2, Heading3, List, ListOrdered, Link as LinkIcon, Image as ImageIcon, Quote, Undo, Redo } from 'lucide-react';
import { useRef } from 'react';
import { uploadToPostImages } from '@/lib/imageUpload';
import { toast } from '@/hooks/use-toast';

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export const RichEditor = ({ value, onChange }: Props) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ HTMLAttributes: { class: 'rounded-sm my-6 max-w-full' } }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: 'text-gold underline underline-offset-4', rel: 'noopener noreferrer' },
        validate: (href) => /^(https?:\/\/|mailto:|\/|#)/i.test(href),
      }),
      Placeholder.configure({ placeholder: 'Start writing your story…' }),
    ],
    content: value || '',
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    editorProps: { attributes: { class: 'prose max-w-none focus:outline-none min-h-[400px] py-6' } },
  });

  if (!editor) return null;

  const insertImage = async (file: File) => {
    try {
      const { publicUrl } = await uploadToPostImages(file, 'inline');
      editor.chain().focus().setImage({ src: publicUrl }).run();
    } catch (e: any) {
      toast({ title: 'Upload failed', description: e.message, variant: 'destructive' });
    }
  };

  const addLink = () => {
    const url = window.prompt('Enter URL (https://...)');
    if (!url) return;
    if (!/^(https?:\/\/|mailto:|\/|#)/i.test(url)) {
      toast({ title: 'Invalid URL', description: 'Only http(s), mailto, or relative URLs are allowed.', variant: 'destructive' });
      return;
    }
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  };

  const Btn = ({ active, onClick, children, title }: any) => (
    <button type="button" onClick={onClick} title={title}
      className={`p-2 rounded hover:bg-accent transition-colors ${active ? 'bg-accent text-gold' : 'text-foreground'}`}>
      {children}
    </button>
  );

  return (
    <div className="border border-border rounded-sm">
      <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border bg-muted/30 sticky top-16 z-10">
        <Btn title="Bold" active={editor.isActive('bold')} onClick={() => editor.chain().focus().toggleBold().run()}><Bold className="w-4 h-4" /></Btn>
        <Btn title="Italic" active={editor.isActive('italic')} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic className="w-4 h-4" /></Btn>
        <div className="w-px h-5 bg-border mx-1" />
        <Btn title="Heading 2" active={editor.isActive('heading', { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 className="w-4 h-4" /></Btn>
        <Btn title="Heading 3" active={editor.isActive('heading', { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 className="w-4 h-4" /></Btn>
        <div className="w-px h-5 bg-border mx-1" />
        <Btn title="Bullet list" active={editor.isActive('bulletList')} onClick={() => editor.chain().focus().toggleBulletList().run()}><List className="w-4 h-4" /></Btn>
        <Btn title="Ordered list" active={editor.isActive('orderedList')} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered className="w-4 h-4" /></Btn>
        <Btn title="Quote" active={editor.isActive('blockquote')} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote className="w-4 h-4" /></Btn>
        <div className="w-px h-5 bg-border mx-1" />
        <Btn title="Link" active={editor.isActive('link')} onClick={addLink}><LinkIcon className="w-4 h-4" /></Btn>
        <Btn title="Image" onClick={() => fileRef.current?.click()}><ImageIcon className="w-4 h-4" /></Btn>
        <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && insertImage(e.target.files[0])} />
        <div className="ml-auto flex gap-1">
          <Btn title="Undo" onClick={() => editor.chain().focus().undo().run()}><Undo className="w-4 h-4" /></Btn>
          <Btn title="Redo" onClick={() => editor.chain().focus().redo().run()}><Redo className="w-4 h-4" /></Btn>
        </div>
      </div>
      <div className="px-6">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};
