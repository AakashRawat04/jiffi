// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Register command for moving cursor right
	let moveRightDisposable = vscode.commands.registerCommand(
		"jiffi.moveToNextCapital",
		() => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}

			const document = editor.document;
			const position = editor.selection.active;
			const line = document.lineAt(position.line);
			const text = line.text;
			const currentPos = position.character;

			// Determine search start position - skip current position if it's a capital
			const searchStartPos = text[currentPos]?.match(/[A-Z]/)
				? currentPos + 1
				: currentPos;

			// Skip current word if we're in whitespace
			let skipWhitespace = false;
			if (/\s/.test(text[currentPos])) {
				skipWhitespace = true;
			}

			// Find next capital letter or word boundary
			for (let i = searchStartPos; i < text.length; i++) {
				// Skip consecutive spaces
				if (skipWhitespace && /\s/.test(text[i])) {
					continue;
				}

				// If we were skipping spaces and found a non-space character
				if (skipWhitespace && !/\s/.test(text[i])) {
					const newPosition = new vscode.Position(position.line, i);
					editor.selection = new vscode.Selection(newPosition, newPosition);
					return;
				}

				// If we find a capital letter
				if (text[i]?.match(/[A-Z]/)) {
					const newPosition = new vscode.Position(position.line, i);
					editor.selection = new vscode.Selection(newPosition, newPosition);
					return;
				}

				// If we reach a space (word boundary)
				if (/\s/.test(text[i])) {
					skipWhitespace = true;
				}
			}

			// If we reach the end of the line, move cursor there
			if (text.length > currentPos) {
				const newPosition = new vscode.Position(position.line, text.length);
				editor.selection = new vscode.Selection(newPosition, newPosition);
			}
		}
	);

	// Register command for moving cursor left
	let moveLeftDisposable = vscode.commands.registerCommand(
		"jiffi.moveToPrevCapital",
		() => {
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}

			const document = editor.document;
			const position = editor.selection.active;
			const line = document.lineAt(position.line);
			const text = line.text;
			const currentPos = position.character;

			// Find previous capital letter or word boundary
			for (let i = currentPos - 1; i >= 0; i--) {
				// If we reach start of word
				if (i === 0 || /\s/.test(text[i - 1])) {
					const newPosition = new vscode.Position(position.line, i);
					editor.selection = new vscode.Selection(newPosition, newPosition);
					return;
				}
				// If we find a capital letter
				if (text[i].match(/[A-Z]/)) {
					const newPosition = new vscode.Position(position.line, i);
					editor.selection = new vscode.Selection(newPosition, newPosition);
					return;
				}
			}
		}
	);

	context.subscriptions.push(moveRightDisposable, moveLeftDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
