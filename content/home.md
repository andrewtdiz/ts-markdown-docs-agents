# TS Markdown

A type-safe, component-based markdown engine.

[Get Started](/get-started) | [Learn More](/learn-more)

## Example

**HelloWorld.tsmd**

```tsmd
import { List } from './List';

export function HelloWorld({features}: Props) {
  const greeting = "Hello";

  return (
    ## {{ greeting }} from TS Markdown!

    Render components with:
    <@List items={features} />
  )
}
```

**HelloWorld.md**

```markdown
Hello from TS Markdown!

Render components with:

- Type-safety
- Reusable components
- Fast development
```

## Why use TS Markdown?

Imagine if writing markdown felt more like **TypeScript**
Less like `f""`, `${}`, and `"\n\n"`?

### Dynamic Content
Create dynamic content with variable interpolation and conditional rendering.

### Markdown Made Better
Syntax highlighting for a premier development experience.

### Component-based
Import TS Markdown files as type-safe components.

### Accelerated Development
Built with Bun for blazingly fast iterative development and deployment.

## Get Started

Jump into TS Markdown with these essential guides and tutorials.

### [What is TS Markdown?](/overview)
Learn about the enhanced TS Markdown experience  

### [Quick Start](/quick-start)
Get up and running in minutes  

### [Create Your First File](/quick-start)
Build your first TS Markdown document  

### [Installation](/installation)
Install and configure TS Markdown  
