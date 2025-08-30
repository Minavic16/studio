Usage: Global 6s Loader

This project includes a global loader context and helper button to trigger a full-screen loader overlay.

Files:
- `src/components/ui/loader-context.tsx` - Provider and `useLoader()` hook.
- `src/components/ui/page-loader.tsx` - Renders the full-screen overlay, shows on route change and when loader is manually triggered.
- `src/components/ui/loader-button.tsx` - A Button wrapper that calls `show(duration)` automatically on click.

How to use

1. Ensure the app is wrapped with `LoaderProvider` (already done in `src/app/layout.tsx`).

2. In a client component, import and use `LoaderButton`:

```tsx
import LoaderButton from "@/components/ui/loader-button";

export default function Demo() {
  return <LoaderButton duration={10000}>Save</LoaderButton>
}
```

3. Or call the hook directly:

```tsx
import { useLoader } from "@/components/ui/loader-context";

function SomeButton() {
  const { show } = useLoader();
  return <button onClick={() => show(10000)}>Click me</button>;
}
```

Behavior

- `show(ms)` displays the overlay immediately and hides it after `ms` milliseconds (defaults to 3000).
- The overlay also appears briefly on client route changes.

Notes

- This is a UI-only overlay. It doesn't block or track actual data fetches; you can wrap async actions and call `show()` while awaiting.
- If you want the loader to stay visible until an async action completes, call `show()` before the action and `hide()` after completion.
