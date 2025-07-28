import { Editor } from "@tinymce/tinymce-react";



function EditorElement({apiKey, initValue, handleChange}) {


    return (
    <Editor 
        apiKey={apiKey}
        initialValue={initValue}
        init={{
            plugins: [
                "preview", 
                "lists", 
                "code", 
                "link", 
                "autolink",
                "emoticons",
                "codesample",
                "image"
            ],
            toolbar: [
                { name: 'history', items: [ 'undo', 'redo' ] },
                { name: 'styles', items: [ 'styles' ] },
                { name: 'formatting', items: [ 'bold', 'italic' ] },
                { name: 'alignment', items: [ 'alignleft', 'aligncenter', 'alignright', 'alignjustify' ] },
                { name: 'indentation', items: [ 'outdent', 'indent' ] },
                { name: "elements", items: ["numlist", "bullist", "link", "image", "codesample"] },
                { name: "preview", items: ["preview", "code"] },
            ],
            link_assume_external_targets: "https",
            browser_spellcheck: true
        }}
        name="text"
        required
        onEditorChange={handleChange}
    />
    );
};



export default EditorElement;