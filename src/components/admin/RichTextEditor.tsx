'use client';

import React, { useEffect, useRef, useState } from 'react';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    placeholder?: string;
}

interface QuillInstance {
    root: { innerHTML: string };
    on: (event: string, callback: () => void) => void;
}

export default function RichTextEditor({
    value,
    onChange,
    className = '',
    placeholder = "Enter your content here..."
}: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<QuillInstance | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!isClient || !editorRef.current || quillRef.current) return;

        const loadQuill = async () => {
            try {
                const Quill = (await import('quill')).default;
                
                if (editorRef.current) {
                    quillRef.current = new Quill(editorRef.current, {
                        theme: 'snow',
                        placeholder,
                        modules: {
                            toolbar: [
                                [{ 'header': [1, 2, 3, false] }],
                                ['bold', 'italic', 'underline'],
                                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                [{ 'indent': '-1' }, { 'indent': '+1' }],
                                ['link'],
                                ['clean']
                            ]
                        },
                        formats: [
                            'header',
                            'bold', 'italic', 'underline',
                            'list', 'indent',
                            'link'
                        ]
                    }) as QuillInstance;

                    // Set initial content
                    if (value && quillRef.current) {
                        quillRef.current.root.innerHTML = value;
                    }

                    // Listen for text changes
                    if (quillRef.current) {
                        quillRef.current.on('text-change', () => {
                            if (quillRef.current) {
                                const html = quillRef.current.root.innerHTML;
                                onChange(html);
                            }
                        });
                    }
                }
            } catch (error) {
                console.error('Failed to load Quill editor:', error);
            }
        };

        loadQuill();
    }, [isClient, placeholder, onChange, value]);

    useEffect(() => {
        if (quillRef.current && value !== quillRef.current.root.innerHTML) {
            quillRef.current.root.innerHTML = value;
        }
    }, [value]);

    if (!isClient) {
        return (
            <div className={`${className} flex items-center justify-center`} style={{ height: '300px' }}>
                <div className="text-gray-500">Loading editor...</div>
            </div>
        );
    }

    return (
        <div className={`${className}`}>
            <div
                ref={editorRef}
                style={{
                    height: '300px',
                    marginBottom: '42px'
                }}
            />
        </div>
    );
}
