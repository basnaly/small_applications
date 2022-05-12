import React from "react";
import { useState } from "react";

import { InputGroup, FormControl, CloseButton } from 'react-bootstrap';
import { INPUT_CODE } from './Constant';
import ReactMarkdown from 'react-markdown';
import Markdown from 'marked-react';
import Lowlight from 'react-lowlight';
import javascript from 'highlight.js/lib/languages/javascript';
import hljs from 'highlight.js';
import 'highlight.js/styles/a11y-light.css';


Lowlight.registerLanguage('js', javascript);

const renderer = {
  code(snippet, lang) {
    return <Lowlight key={this.elementId} language={lang} value={snippet} />;
  },
};

const MarkdownPreviewerComponent = () => {

    const [code, setCode] = useState(INPUT_CODE);

    const codePieces = code.split(/\n```+```\n/);
    console.log(codePieces.length)

    return (
        <div className='d-flex flex-column vh-100 overflow-auto'>
            <div className='parent d-flex flex-column align-items-center'>
                <InputGroup className='d-flex justify-content-space-between flex-column '>
                    <InputGroup.Text className='d-flex align-items-center'>
                        Editor
                        <CloseButton />
                    </InputGroup.Text>
                    <FormControl className='w-auto'
                        id="editor"
                        as="textarea"
                        aria-label="With textarea" 
                        value={ code }
                        type='text'
                        onChange={e => setCode(e.target.value)}
                        />
                </InputGroup>
            </div>
            <div className='parent d-flex flex-column align-items-center overflow-auto'>
                <InputGroup className='d-flex justify-content-space-between overflow-auto flex-column flex-nowrap'>
                    <InputGroup.Text className='d-flex align-items-center'>
                        Previewer
                        <CloseButton />
                    </InputGroup.Text>
                    <div className="prev d-flex flex-column overflow-auto"
                        id="preview">
                        {codePieces.map((el, i) => <Markdown value={el } 
                                    renderer={renderer} />
                        )}
                    </div>
                </InputGroup>

            </div>
        </div>
        
    )
}

export default MarkdownPreviewerComponent;