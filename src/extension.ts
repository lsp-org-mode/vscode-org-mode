import * as vscode from 'vscode';

function helloWorld() {
    vscode.window.showInformationMessage('Hello, world!')
}

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(vscode.commands.registerCommand('org-mode.hello', helloWorld));
}

export function deactivate() {
    return undefined;
}
