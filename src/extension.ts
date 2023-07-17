import * as vscode from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;

function helloWorld() {
  vscode.window.showInformationMessage('Hello, world!')
}

function activateLspServer(context: vscode.ExtensionContext) {
  const serverModule = context.asAbsolutePath('lsp-org-mode');
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.stdio },
    debug: { module: serverModule, transport: TransportKind.stdio },
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
