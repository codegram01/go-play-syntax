// ==UserScript==
// @name         Golang Play with Syntax Color
// @namespace    https://wingram.org
// @version      2024-09-19
// @description  Make Golang Play have Syntax Color
// @author       wingram.org
// @match        https://go.dev/play/
// @match        https://go.dev/tour/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=go.dev
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/ace/1.36.2/ace.min.js";

    document.head.appendChild(script);

    script.onload = function () {
        const pathName = location.pathname;

        if(pathName.startsWith("/play")) {
           const defaultEditor = document.getElementById("code"); // query textarea editor
           defaultEditor.style.display = "none" // hide default text editor

           defaultEditor.parentNode.style.position = "relative"; // make container relative for ace editor absolute

           const newEditor = document.createElement("div");

           defaultEditor.getValue = () => {
               return defaultEditor.value;
           }
           defaultEditor.setValue = (val) => {
               defaultEditor.value = val;
           }
           createEditor(defaultEditor, newEditor);
        } else {
           function callCreateEditor() {
               const editorCtn = document.getElementById("file-editor");
               editorCtn.parentNode.style.position = "relative";

               const defaultEditor = editorCtn.querySelector(".CodeMirror");
               defaultEditor.style.display = "none"

               const newEditor = document.createElement("div");

               defaultEditor.getValue = () => {
                   return defaultEditor.CodeMirror.getValue();
               }
               defaultEditor.setValue = (val) => {
                   defaultEditor.CodeMirror.setValue(val);
               }
               createEditor(defaultEditor, newEditor);
           }
           setTimeout ( callCreateEditor, 100 );

           window.navigation.addEventListener("navigate", (event) => {
               setTimeout ( callCreateEditor, 100 );
           })
        }
    };
})();

function createEditor(defaultEditor, newEditor) {
    newEditor.style.cssText = `
           position: absolute;
           width: 100%;
           height: 100%;
        `;

    defaultEditor.parentNode.insertBefore(newEditor, defaultEditor);

    const aceEditor = ace.edit(newEditor);

    aceEditor.session.setMode("ace/mode/golang");
    aceEditor.setFontSize(18);
    setTheme(aceEditor);

    aceEditor.setValue(defaultEditor.getValue());
    aceEditor.clearSelection();

    let timeoutSave;
    aceEditor.session.on('change', () => {
        clearTimeout(timeoutSave);
        timeoutSave = setTimeout(() => {
            defaultEditor.setValue(aceEditor.getValue());
        }, 500);
    });
}

function setTheme(aceEditor) {
   const themeSetting = document.documentElement.getAttribute('data-theme');
   switch(themeSetting) {
       case "dark":
           aceEditor.setTheme("ace/theme/github_dark");
           break;
       case "light":
           aceEditor.setTheme("ace/theme/github");
           break;
       case "auto":
           if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
               aceEditor.setTheme("ace/theme/github_dark");
           } else {
               aceEditor.setTheme("ace/theme/github");
           }
           break;
   }
}
