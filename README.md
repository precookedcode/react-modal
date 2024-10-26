
# @precooked/react-modal

![Precooked Logo](https://precookedcode.com/assets/logos/logo-horizontal-dark.svg)

`@precooked/react-modal` is a flexible modal component for React projects. It includes customizable options for styles, close button, and supports fullscreen mode.

## Installation

```bash
npm install @precooked/react-modal
```

## Props

| Prop               | Type                   | Default     | Description                                                                                     |
|--------------------|------------------------|-------------|-------------------------------------------------------------------------------------------------|
| `isOpen`           | `boolean`              | **required** | Controls the modal's visibility.                                                                |
| `onClose`          | `() => void`           | **required** | Callback function to close the modal.                                                           |
| `children`         | `React.ReactNode`      | **required** | Content to display within the modal.                                                            |
| `backdropStyles`   | `React.CSSProperties`  | `undefined`  | Custom styles for the modal's backdrop.                                                         |
| `windowStyles`     | `React.CSSProperties`  | `undefined`  | Custom styles for the modal window.                                                             |
| `closeButtonStyles`| `React.CSSProperties`  | `undefined`  | Custom styles for the close button.                                                             |
| `closeIcon`        | `string`               | `"close"`    | Icon for the close button.                                                                      |
| `closeIconPaths`   | `any[]`                | `undefined`  | Custom paths for `DynamicIcon` if needed for the close button.                                  |
| `closeIconSize`    | `number`               | `24`         | Size of the close button icon.                                                                  |
| `zIndex`           | `number`               | `999`        | The z-index of the modal.                                                                       |
| `id`               | `string`               | `undefined`  | Optional ID for the modal's root element.                                                       |
| `fullScreen`       | `boolean`              | `false`      | When true, the modal takes up the full screen width and height.                                 |

## Example Usage

```tsx
import React, { useState } from 'react';
import Modal from '@precooked/react-modal';

const MyComponent = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <button onClick={() => setIsOpen(true)}>Open Modal</button>
            <Modal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                fullScreen={true}
                backdropStyles={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
                windowStyles={{ borderRadius: "10px" }}
                closeIcon="times"
            >
                <h2>Modal Content</h2>
                <p>This is an example of content inside the modal.</p>
            </Modal>
        </div>
    );
};

export default MyComponent;
```

## License

MIT

---

For more information, visit [Precooked](https://precookedcode.com).
