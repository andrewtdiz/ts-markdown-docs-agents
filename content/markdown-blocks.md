---
title: Markdown Blocks
description: Learn how to write multi-line markdown directly in TypeScript functions
date: 2024-01-15
author: TS Markdown Team
tags: [syntax, markdown-blocks, basics]
---

The core feature of TS Markdown is the ability to write **multi-line markdown directly in TypeScript functions**. This eliminates the need for template strings or separate markdown files while maintaining full type safety.

## Basic Structure

A markdown block is created using a `return` statement with parentheses containing your markdown:

```typescript
function simpleMessage() {
  return (
    # Hello World
    This is a simple markdown block.
  )
}
```

## Why Use Markdown Blocks?

**Saves Time**: No need to concatenate strings or manage complex template systems
**Readable**: Your content stays in your code, making it easy to maintain
**Type Safe**: Full TypeScript integration with autocomplete and error checking
**Flexible**: Mix static content with dynamic variables and logic

## Common Elements

### Headings

```typescript
function documentHeader(title: string, level: number) {
  return (
    {{ level === 1 ? '#' : level === 2 ? '##' : '###' }} {{ title }}

    Some introductory text here.
  )
}
```

### Lists

```typescript
function todoList(items: string[]) {
  return (
    ## Todo List
    {{ items.map(item => (
      - {{ item }}
    )) }}
  )
}
```

### Code Blocks

```typescript
function codeExample(language: string, code: string) {
  return (
    Here's some {{ language }} code:

    ```{{ language }}
    {{ code }}
    ```
  )
}
```

### Tables

```typescript
function dataTable(rows: Array<{ name: string; value: string }>) {
  return (
    | Name | Value |
    |------|--------|
    {{ rows.map(row => (
      | {{ row.name }} | {{ row.value }} |
    )) }}
  )
}
```

## Best Practices

### Keep It Readable

```typescript
// Good - readable and maintainable
function userProfile(user: User) {
  return (
    # {{ user.name }}'s Profile

    **Email:** {{ user.email }}
    **Role:** {{ user.role }}

    {{ user.bio ? (
      **Bio:**
      {{ user.bio }}
    ) : null }}
  )
}

// Avoid - hard to read and maintain
function messyProfile(user: User) {
  return (# {{ user.name }}'s Profile\n\n**Email:** {{ user.email }}\n**Role:** {{ user.role }})
}
```

### Use Meaningful Function Names

```typescript
// Good - clear purpose
function createUserWelcome(user: User) {
  return (
    # Welcome {{ user.name }}!
    Thanks for joining us.
  )
}

// Avoid - unclear purpose
function renderContent(data: any) {
  return ( # Welcome {{ data.user }}! )
}
```

### Break Down Complex Content

```typescript
// Good - modular approach
function createFullReport(user: User, stats: Stats) {
  return (
    {{ createHeader(user) }}
    {{ createStatsSection(stats) }}
    {{ createFooter() }}
  )
}

// Avoid - one massive function
function createFullReport(user: User, stats: Stats) {
  return (
    # Report for {{ user.name }}

    ## Stats
    - Total: {{ stats.total }}
    - Completed: {{ stats.completed }}

    ## Details
    - Created: {{ user.createdAt }}
    - Last Login: {{ user.lastLogin }}

    ---
    Generated on {{ new Date().toISOString() }}
  )
}
```

## Real-World Example

Here's a complete example of a markdown block in action:

```typescript
interface BlogPost {
  title: string
  author: string
  publishedAt: string
  tags: string[]
  content: string
  readTime: number
}

function createBlogPost(post: BlogPost) {
  return (
    ---
    title: {{ post.title }}
    author: {{ post.author }}
    date: {{ post.publishedAt }}
    tags: [{{ post.tags.join(', ') }}]
    ---

    # {{ post.title }}

    **By {{ post.author }}** • {{ post.publishedAt }} • {{ post.readTime }} min read

    {{ post.tags.map(tag => (
      <span style="background: #e1f5fe; padding: 2px 8px; border-radius: 12px; font-size: 12px;">
        {{ tag }}
      </span>
    )).join(' ') }}

    {{ post.content }}

    ---

    **Tags:** {{ post.tags.join(', ') }}
    **Read Time:** {{ post.readTime }} minutes
  )
}
```

## Common Patterns

### Dynamic Headers

```typescript
function dynamicHeader(user: User, type: 'welcome' | 'profile' | 'settings') {
  return (
    {{ type === 'welcome' ? '#' : type === 'profile' ? '##' : '###' }}
    {{ type === 'welcome' ? 'Welcome' : type === 'profile' ? 'Profile' : 'Settings' }}
    {{ type === 'welcome' ? `, ${user.name}!` : '' }}
  )
}
```

### Conditional Sections

```typescript
function featureList(features: Feature[], showAdvanced: boolean) {
  return (
    ## Features
    {{ features.filter(f => !f.advanced).map(f => (
      - {{ f.name }}: {{ f.description }}
    )) }}

    {{ showAdvanced ? (
      ## Advanced Features
      {{ features.filter(f => f.advanced).map(f => (
        - **{{ f.name }}**: {{ f.description }}
      )) }}
    ) : null }}
  )
}
```

### Nested Content

```typescript
function nestedExample(items: Item[]) {
  return (
    {{ items.map(item => (
      ### {{ item.title }}

      {{ item.description }}

      {{ item.details ? (
        **Details:**
        {{ item.details }}
      ) : null }}

      ---
    )) }}
  )
}
```

## Performance Tips

- **Compile Once**: Compile your markdown blocks once and reuse the compiled version
- **Cache Results**: For frequently used content, consider caching the generated markdown
- **Keep It Simple**: Avoid overly complex nested logic in a single block

## Next Steps

Now that you understand markdown blocks, learn about:

1. **[Dynamic Content](dynamic-content)** - Add variables and expressions
2. **[Conditional Rendering](conditional-rendering)** - Show/hide content based on conditions
3. **[Components](components)** - Create reusable components

**Pro Tip**: Start with simple markdown blocks and gradually add dynamic features as needed. This approach keeps your code maintainable and your content readable.
