import * as monaco from 'monaco-editor';
import * as pulsar from '../../src';
const container: HTMLElement = document.getElementById('container');
const code = 
`const { Vector } = pulsar;
const a = new Vector({ x: 3, y: 7 });
const b = new Vector({ x: 5, y: 1 });
const magnitude: number = a.add(b).magnitude();
console.log(a, b, magnitude);
`;

const editor = monaco.editor.create(container, {
  value: code,
  language: 'typescript',
  fontSize: 16,
});
monaco.editor.setTheme('vs-dark');
monaco.languages.typescript.typescriptDefaults.addExtraLib('declare var pulsar: any;');

const compile = async (editor: any, dependencies: any[]) => {
  const woker: any = await monaco.languages.typescript.getTypeScriptWorker();
  const proxy: any = await woker(editor.getModel().uri);
  const result: any = await proxy.getEmitOutput(editor.getModel().uri.toString());
  const text: string = result.outputFiles[0].text;
  const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
  const asyncText = `
    (async function(pulsar) {
      ${text}
    })(pulsar)
  `;
  const f = new AsyncFunction('pulsar', asyncText);
  f.apply(null, dependencies);
}

editor.onDidChangeModelContent(() => compile(editor, [pulsar]));

compile(editor, [pulsar]);
