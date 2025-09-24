---
title: Complete Syntax Guide
description: Comprehensive reference for all TS Markdown syntax and features
date: 2024-01-15
author: TS Markdown Team
tags: [syntax, reference, guide, complete]
---

This guide covers all TS Markdown syntax, from basic markdown blocks to advanced features.

## Basic Structure

### Markdown Blocks

TS Markdown content is written in **markdown blocks** using `return ( ... )`:

```typescript
function simpleContent() {
  return (
    # Hello World
    This is a simple markdown block.
  )
}
```

## Dynamic Content

### Variable Interpolation

Insert variables using `{{ variable }}`:

```typescript
function userProfile(user: User) {
  return (
    # {{ user.name }}

    **Email:** {{ user.email }}
    **Age:** {{ user.age }}
  )
}
```

### Expressions

Use any valid TypeScript expression:

```typescript
function calculations(data: Data) {
  return (
    # Results

    **Total:** {{ data.items.reduce((sum, item) => sum + item.value, 0) }}
    **Average:** {{ (data.total / data.count).toFixed(2) }}
    **Formatted:** {{ data.title.toUpperCase() }}
  )
}
```

### String Methods

```typescript
function stringOperations(text: string) {
  return (
    # String Operations

    **Original:** {{ text }}
    **Uppercase:** {{ text.toUpperCase() }}
    **Length:** {{ text.length }}
    **Substring:** {{ text.substring(0, 10) }}
  )
}
```

## Conditional Rendering

### Ternary Operator

```typescript
function conditionalContent(user: User) {
  return (
    # Status

    {{ user.isActive ? (
      You're active! ✅
    ) : (
      Account inactive.
    ) }}
  )
}
```

### Logical AND

```typescript
function optionalContent(user: User) {
  return (
    # Dashboard

    {{ user.hasNotifications && (
      You have {{ user.notificationCount }} notifications.
    ) }}
  )
}
```

### Nested Conditions

```typescript
function complexLogic(user: User, data: Data) {
  return (
    {{ user.isPremium ? (
      {{ data.items.length > 10 ? (
        Premium with many items
      ) : (
        Premium with few items
      ) }}
    ) : (
      Standard account
    ) }}
  )
}
```

## Components

### Basic Components

```typescript
function MyComponent({ title }: { title: string }) {
  return (
    <div style="padding: 20px;">
      ## {{ title }}
      Component content here.
    </div>
  )
}

function page() {
  return (
    # My Page

    <@MyComponent title="Getting Started" />
  )
}
```

### Components with Props

```typescript
function Card({ title, children }: { title: string; children: any }) {
  return (
    <div style="border: 1px solid #ddd; padding: 16px;">
      ## {{ title }}
      {{ children }}
    </div>
  )
}
```

### Self-Closing Components

```typescript
function Icon({ name }: { name: string }) {
  return (<span>{{ name }}</span>)
}
```

## Lists and Iteration

### Array Mapping

```typescript
function itemList(items: Item[]) {
  return (
    ## Items:
    {{ items.map(item => (
      - {{ item.name }}: {{ item.value }}
    )) }}
  )
}
```

### Filtered Lists

```typescript
function activeItems(items: Item[]) {
  return (
    ## Active Items:
    {{ items.filter(item => item.isActive).map(item => (
      - {{ item.name }}
    )) }}
  )
}
```

### Nested Lists

```typescript
function nestedList(data: Data) {
  return (
    {{ data.categories.map(category => (
      ### {{ category.name }}
      {{ category.items.map(item => (
        - {{ item.name }}
      )) }}
    )) }}
  )
}
```

## Tables

### Dynamic Tables

```typescript
function dataTable(data: Data[]) {
  return (
    | Name | Value | Status |
    |------|--------|--------|
    {{ data.map(row => (
      | {{ row.name }} | {{ row.value }} | {{ row.isActive ? 'Active' : 'Inactive' }} |
    )) }}
  )
}
```

### Conditional Table Rows

```typescript
function filteredTable(items: Item[]) {
  return (
    | Name | Value |
    |------|--------|
    {{ items.filter(item => item.value > 10).map(item => (
      | {{ item.name }} | {{ item.value }} |
    )) }}
  )
}
```

## Styling

### Inline Styles

```typescript
function styledContent(user: User) {
  return (
    <div style="background: {{ user.isActive ? '#e8f5e8' : '#ffebee' }}; padding: 20px;">
      **Status:** {{ user.isActive ? 'Active' : 'Inactive' }}
    </div>
  )
}
```

### Dynamic Styles

```typescript
function dynamicStyling(percentage: number) {
  const color = percentage > 80 ? '#4caf50' : percentage > 50 ? '#ff9800' : '#f44336'

  return (
    <div style="background: {{ color }}; color: white; padding: 10px;">
      Progress: {{ percentage }}%
    </div>
  )
}
```

## Code Blocks

### Dynamic Code

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

### Code with Variables

```typescript
function apiExample(endpoint: string, method: string) {
  return (
    ```javascript
    fetch('{{ endpoint }}', {
      method: '{{ method }}',
      headers: { 'Content-Type': 'application/json' }
    })
    ```
  )
}
```

## Links and URLs

### Dynamic Links

```typescript
function linkGenerator(user: User) {
  return (
    # Profile

    [View Profile]({{ `/users/${user.id}` }})
    [Settings]({{ `/settings?user=${user.id}` }})

    {{ user.isAdmin ? (
      [Admin Panel]({{ '/admin' }})
    ) : null }}
  )
}
```

### External Links

```typescript
function socialLinks(user: User) {
  return (
    [GitHub]({{ user.githubUrl }})
    [Twitter]({{ user.twitterUrl || 'https://twitter.com' }})
  )
}
```

## Comments and Whitespace

### Comments in Markdown

```typescript
function documentedContent() {
  return (
    # My Content

    <!-- This is a comment -->

    Regular content here.

    <!--
      Multi-line comment
      explaining this section
    -->
  )
}
```

### Line Breaks

```typescript
function formattedText() {
  return (
    Line 1
    Line 2
    Line 3
  )
}
```

## Advanced Patterns

### Higher-Order Components

```typescript
function withLayout(WrappedComponent: any) {
  return function LayoutComponent({ title, ...props }: { title: string; [key: string]: any }) {
    return (
      # {{ title }}

      <@WrappedComponent {...props} />

      ---
      Generated on {{ new Date().toISOString() }}
    )
  }
}
```

### Template Composition

```typescript
function composeTemplates(templates: any[], data: any) {
  return (
    # Composed Content

    {{ templates.map(template => (
      {{ executeTSMTemplate(template, data) }}
    )) }}
  )
}
```

### Recursive Components

```typescript
function TreeNode({ node, level = 0 }: { node: TreeNode; level?: number }) {
  return (
    {{ '#'.repeat(level + 1) }} {{ node.name }}

    {{ node.children?.map(child => (
      <@TreeNode node={child} level={level + 1} />
    )) }}
  )
}
```

## Error Handling

### Safe Access

```typescript
function safeTemplate(data: Data | null) {
  return (
    {{ data?.title || 'Untitled' }}

    **Items:** {{ data?.items?.length || 0 }}

    {{ data?.items?.map(item => (
      - {{ item?.name || 'Unknown' }}
    )) || 'No items' }}
  )
}
```

### Try-Catch in Templates

```typescript
function withErrorBoundary(data: Data) {
  try {
    const result = riskyCalculation(data)

    return (
      # Result: {{ result }}
    )
  } catch (error) {
    return (
      # Error
      Something went wrong: {{ error.message }}
    )
  }
}
```

## Performance Patterns

### Memoization

```typescript
const memoizedTemplates = new Map()

function getMemoizedTemplate(key: string) {
  if (!memoizedTemplates.has(key)) {
    memoizedTemplates.set(key, compileTSM(parser.parse(getTemplate(key))))
  }
  return memoizedTemplates.get(key)
}
```

### Lazy Loading

```typescript
function lazyComponent(name: string) {
  const component = loadComponent(name)

  return (
    <@DynamicComponent component={component} />
  )
}
```

## Real-World Examples

### Blog Post

```typescript
function blogPost(post: BlogPost) {
  return (
    ---
    title: {{ post.title }}
    author: {{ post.author }}
    date: {{ post.publishedAt }}
    tags: [{{ post.tags.join(', ') }}]
    ---

    # {{ post.title }}

    **By {{ post.author }}** • {{ post.publishedAt }} • {{ post.readTime }} min read

    {{ post.content }}

    ## Tags
    {{ post.tags.map(tag => (
      `{{ tag }}`
    )).join(' • ') }}

    ---
    Thanks for reading!
  )
}
```

### Dashboard

```typescript
function dashboard(user: User, metrics: Metrics) {
  return (
    # Dashboard - {{ user.name }}

    <@Grid columns={3}>
      <@MetricCard title="Users" value={metrics.users} change={metrics.userChange} />
      <@MetricCard title="Revenue" value={metrics.revenue} change={metrics.revenueChange} />
      <@MetricCard title="Orders" value={metrics.orders} change={metrics.orderChange} />
    </@Grid>

    {{ metrics.alerts.length > 0 && (
      ## Alerts
      {{ metrics.alerts.map(alert => (
        <@Alert type={alert.type} message={alert.message} />
      )) }}
    ) }}

    <@Chart data={metrics.chartData} />
  )
}
```

### Email Template

```typescript
function emailTemplate(user: User, content: EmailContent) {
  return (
    # {{ content.subject }}

    Hello {{ user.name }}!

    {{ content.body }}

    {{ content.callToAction && (
      <@Button href={content.callToAction.url}>
        {{ content.callToAction.text }}
      </@Button>
    ) }}

    Best regards,
    The Team
  )
}
```

## Best Practices

### Code Organization

```typescript
// Group related functions
const templates = {
  header: function(data: Data) { return (...) },
  footer: function(data: Data) { return (...) },
  sidebar: function(data: Data) { return (...) }
}

// Use in main template
function page(data: Data) {
  return (
    {{ templates.header(data) }}

    # Main Content

    {{ templates.sidebar(data) }}

    {{ templates.footer(data) }}
  )
}
```

### Type Safety

```typescript
interface User {
  name: string
  email: string
  isActive: boolean
  preferences: {
    theme: 'light' | 'dark'
    notifications: boolean
  }
}

function userProfile(user: User) {
  return (
    # {{ user.name }}

    **Email:** {{ user.email }}
    **Theme:** {{ user.preferences.theme }}
    **Notifications:** {{ user.preferences.notifications ? 'Enabled' : 'Disabled' }}
  )
}
```

### Testing

```typescript
function testTemplate(user: User) {
  const result = executeTSMTemplate(compiledTemplate, { user })

  // Test assertions
  expect(result).toContain(user.name)
  expect(result).toContain(user.email)

  return result
}
```

## Common Mistakes

### Unescaped Special Characters

```typescript
// Avoid - special chars not escaped
function badTemplate() {
  return (
    # Title with "quotes" and 'apostrophes'
  )
}

// Better - escape when needed
function goodTemplate(title: string) {
  return (
    # {{ title }}
  )
}
```

### Overly Complex Expressions

```typescript
// Avoid - hard to read
function complex() {
  return (
    {{ data.items.filter(i => i.value > 10).map(i => i.name).sort().join(', ') }}
  )
}

// Better - break it down
function readable() {
  const filtered = data.items.filter(i => i.value > 10)
  const names = filtered.map(i => i.name)
  const sorted = names.sort()
  const result = sorted.join(', ')

  return (
    {{ result }}
  )
}
```

### Missing Null Checks

```typescript
// Avoid - potential null errors
function risky(data: Data | null) {
  return (
    # {{ data.title }}
    **Items:** {{ data.items.length }}
  )
}

// Better - safe access
function safe(data: Data | null) {
  return (
    # {{ data?.title || 'Untitled' }}
    **Items:** {{ data?.items?.length || 0 }}
  )
}
```

## Next Steps

Now that you have the complete syntax reference:

1. **[Best Practices](best-practices)** - Learn optimization techniques
2. **Start Building** - Create your own templates and components
3. **Experiment** - Try combining different features

**Pro Tip**: Start with simple templates and gradually add complexity. The key is finding the right balance between functionality and readability.
