import * as vscode from 'vscode';

import {
  Executable,
  LanguageClient,
  LanguageClientOptions,
} from 'vscode-languageclient/node';

let client: LanguageClient;

function helloWorld() {
  vscode.window.showInformationMessage('Hello, world!')
}

function activateLspServer(context: vscode.ExtensionContext) {
  const serverOptions: Executable = {
    command: 'lsp-org-mode'
  };
  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: 'file', language: 'org-mode' }],
  };
  client = new LanguageClient(
    'org-mode',
    'Org Mode Language Server',
    serverOptions,
    clientOptions
  );

  client.start();
}

export function activate(context: vscode.ExtensionContext) {
  activateLspServer(context);
  context.subscriptions.push(vscode.commands.registerCommand('org-mode.hello', helloWorld));
}

export function deactivate(): Thenable<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
