'use client';

import React, { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    placeholder?: string;
}

export default function RichTextEditor({
    value,
    onChange,
    className = '',
    placeholder = "Enter your content here..."
}: RichTextEditorProps) {
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);

    useEffect(() => {
        if (editorRef.current && !quillRef.current) {
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
            });

            // Set initial content
            if (value) {
                quillRef.current.root.innerHTML = value;
            }

            // Listen for text changes
            quillRef.current.on('text-change', () => {
                if (quillRef.current) {
                    const html = quillRef.current.root.innerHTML;
                    onChange(html);
                }
            });
        }
    }); // Only run once when component mounts

    useEffect(() => {
        if (quillRef.current && value !== quillRef.current.root.innerHTML) {
            quillRef.current.root.innerHTML = value;
        }
    }, [value]);

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
