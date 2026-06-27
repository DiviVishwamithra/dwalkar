class CodeCleaner {
  clean(code) {
    if (!code) return "";

    return (
      code
        // IMPORTANT: More specific patterns first
        .replace(/```json\s*/gi, "")
        .replace(/```javascript\s*/gi, "")
        .replace(/```typescript\s*/gi, "")
        .replace(/```jsx\s*/gi, "")
        .replace(/```tsx\s*/gi, "")
        .replace(/```css\s*/gi, "")
        .replace(/```html\s*/gi, "")
        .replace(/```js\s*/gi, "")
        .replace(/```ts\s*/gi, "")

        // Remove any remaining fences
        .replace(/```/g, "")

        .trim()
    );
  }
}

module.exports = new CodeCleaner();
