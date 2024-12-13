# Jiffi - Smart Cursor Movement

Jiffi is a VS Code extension that enhances cursor movement within text, making it easier to navigate through camelCase, PascalCase, and space-separated words.

## Features

Jiffi provides smart cursor movement commands that let you:

- Jump between capital letters in camelCase/PascalCase words (e.g., `myVariableName` -> m -> V -> N)
- Move to word boundaries intelligently
- Navigate through space-separated words

### Examples:

- In camelCase: `isHelloWorld` 
  - Pressing Ctrl+Right: i -> H -> W
  - Pressing Ctrl+Left: W -> H -> i

- In multi-word text: `isHelloWorld is hello world HelloWorld`
  - Moves through both word starts and capital letters
  - Handles spaces intelligently

## Key Bindings

- `Ctrl+Right` or `Cmd+Right` (Mac): Move to next capital letter or word start
- `Ctrl+Left` or `Cmd+Left` (Mac): Move to previous capital letter or word start

## Requirements

No special requirements or dependencies needed.

## Known Issues

None at the moment.

## Release Notes

### 0.0.1

Initial release of Jiffi:
- Smart cursor movement through camelCase/PascalCase words
- Intelligent word boundary detection
- Cross-word navigation

---

## Source Code

[GitHub Repository](https://github.com/yourusername/jiffi)

**Enjoy smarter cursor movement with Jiffi!**
