---
title: What is TS Markdown?
description: Write markdown directly in TypeScript with type safety and dynamic content
date: 2024-01-15
author: TS Markdown Team
tags: [overview, introduction, typescript, markdown, beginner]
---

TS Markdown (TSM) lets you write **markdown directly in TypeScript** without complex template systems or string concatenation. It saves you time by allowing you to embed markdown blocks right in your TypeScript functions, with full type safety and dynamic content interpolation.

Instead of juggling template strings, JSX, or separate markdown files, write your documentation, emails, reports, and content directly in your TypeScript code using familiar markdown syntax with powerful dynamic features.

## Why TS Markdown?

- **Develop faster**: Write markdown content with TypeScript
- **Type Safe**: Full TypeScript integration with autocomplete
- **Dynamic Content**: Insert variables, conditionally render sections, and use components
- **No Build Step**: Works at runtime, perfect for dynamic content generation, APIs, and backend services.

## Basic Example

```tsmd
function Profile({ user }: { user: User }) {
  
  return (
    # {{ user.name }}'s Profile

    <@ProfileDetailView user={user} />

    Skills:
    {{ user.skills.map(skill => (
      - {{ skill }}
    ))}}
  )
}
```

This generates clean markdown like:

```markdown
# Alice's Profile

Role: Senior Engineer
Experience: 8 years
Status: Active ✅

Skills:
- React
- TypeScript
- Bun
```

## Key Features

- **Markdown Blocks**: Write multi-line markdown directly in TypeScript with `return ( ... )`
- **Dynamic Interpolation**: Use `{{ variable }}` for dynamic content
- **Conditional Rendering**: `{{ condition ? (content) : (alternative) }}`
- **Component Integration**: `<@ComponentName props={...} />` for reusable components
- **Type Safety**: Full TypeScript integration with autocomplete and error checking

## Use Cases

TS Markdown can be used for for:
- **LLM API calls** with dynamic content
- **MCP Servers** 
- **Tool call responses**
- **llms.txt** formatting

## Quick Start

Get up and running in minutes:

1. [Install TS Markdown](installation)
2. [Quick Start Guide](quick-start)
3. [Build your first component](markdown-blocks)

Start writing markdown in TypeScript today - it's faster, cleaner, and more maintainable than traditional approaches!
