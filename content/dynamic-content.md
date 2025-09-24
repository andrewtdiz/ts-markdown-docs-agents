---
title: Dynamic Content
description: Insert variables, expressions, and dynamic values in your TS Markdown
date: 2024-01-15
author: TS Markdown Team
tags: [syntax, dynamic-content, variables, expressions]
---

TS Markdown makes it easy to insert **dynamic values** into your markdown using `{{ }}` interpolation. This allows you to display variables, call functions, and include any valid TypeScript expression directly in your content.

## Basic Interpolation

Insert variables directly into your markdown:

```typescript
function userGreeting(user: { name: string; title: string }) {
  return (
    # Welcome {{ user.name }}!

    You're logged in as a {{ user.title }}.
  )
}
```

### Variable Types

TS Markdown handles different variable types automatically:

```typescript
function mixedTypes(user: User) {
  return (
    # {{ user.name }}

    **Age:** {{ user.age }}
    **Active:** {{ user.isActive }}
    **Joined:** {{ user.joinedAt }}
    **Score:** {{ user.score.toFixed(2) }}
  )
}
```

## Expressions and Functions

Use any valid TypeScript expression within `{{ }}`:

```typescript
function withExpressions(data: Data) {
  return (
    # Report for {{ data.title.toUpperCase() }}

    **Total Items:** {{ data.items.length }}
    **Average:** {{ data.items.reduce((a, b) => a + b, 0) / data.items.length }}
    **Last Updated:** {{ new Date().toLocaleDateString() }}
  )
}
```

## String Formatting

Combine static text with dynamic content:

```typescript
function formattedContent(user: User, stats: Stats) {
  return (
    # Hello {{ user.name }}!

    You've completed {{ stats.completedTasks }} out of {{ stats.totalTasks }} tasks
    ({{ (stats.completedTasks / stats.totalTasks * 100).toFixed(1) }}% complete).

    Your current streak: {{ stats.streakDays }} days 🔥
  )
}
```

## Best Practices

### Keep It Readable

```typescript
// Good - clear and readable
function profile(user: User) {
  return (
    # {{ user.name }}

    **Email:** {{ user.email }}
    **Status:** {{ user.isActive ? 'Active' : 'Inactive' }}
    **Member since:** {{ new Date(user.joinedAt).getFullYear() }}
  )
}

// Avoid - hard to read
function messyProfile(user: User) {
  return (# {{user.name}} **Email:** {{user.email}} **Status:** {{user.isActive?'Active':'Inactive'}})
}
```

### Use Meaningful Variable Names

```typescript
// Good - clear purpose
function statusMessage(user: User, settings: Settings) {
  return (
    {{ user.isPremium ? 'Premium' : 'Free' }} account:
    {{ settings.theme === 'dark' ? '🌙 Dark mode' : '☀️ Light mode' }}
  )
}

// Avoid - unclear variables
function status(a: any, b: any) {
  return ({{a.x?'Premium':'Free'}} account: {{b.y==='dark'?'🌙':'☀️'}})
}
```

### Handle Edge Cases

```typescript
function safeContent(data: Data | null) {
  return (
    # Welcome!

    {{ data ? (
      Hello {{ data.user.name }}!
      You have {{ data.items?.length || 0 }} items.
    ) : (
      Please log in to view your content.
    ) }}
  )
}
```

## Advanced Examples

### Array Operations

```typescript
function listProcessor(items: Item[]) {
  return (
    ## Items ({{ items.length }} total)

    {{ items.filter(item => item.isActive).map(item => (
      - **{{ item.name }}**: {{ item.description }}
    )) }}

    {{ items.length > 0 ? (
      **Active items:** {{ items.filter(i => i.isActive).length }}
    ) : (
      No active items found.
    ) }}
  )
}
```

### Date Formatting

```typescript
function dateDisplay(user: User) {
  const joined = new Date(user.joinedAt)
  const now = new Date()

  return (
    # {{ user.name }}

    **Member since:** {{ joined.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }) }}

    **Account age:** {{ Math.floor((now.getTime() - joined.getTime()) / (1000 * 60 * 60 * 24)) }} days
  )
}
```

### Conditional Formatting

```typescript
function statusCard(user: User, metrics: Metrics) {
  const healthScore = (metrics.uptime / metrics.totalTime) * 100

  return (
    <div style="padding: 20px; background: {{ healthScore > 90 ? '#e8f5e8' : healthScore > 70 ? '#fff3e0' : '#ffebee' }};">
      **System Health:** {{ healthScore.toFixed(1) }}%

      {{ healthScore > 90 ? '🟢 Excellent' : healthScore > 70 ? '🟡 Good' : '🔴 Needs Attention' }}
    </div>
  )
}
```

## Performance Considerations

### Expensive Operations

```typescript
// Good - calculate once
function report(data: Data) {
  const totalValue = data.items.reduce((sum, item) => sum + item.value, 0)
  const averageValue = totalValue / data.items.length

  return (
    # Report Summary

    **Total Value:** {{ totalValue.toFixed(2) }}
    **Average:** {{ averageValue.toFixed(2) }}
    **Items:** {{ data.items.length }}
  )
}

// Avoid - calculating multiple times
function badReport(data: Data) {
  return (
    # Report Summary

    **Total:** {{ data.items.reduce((sum, item) => sum + item.value, 0).toFixed(2) }}
    **Average:** {{ (data.items.reduce((sum, item) => sum + item.value, 0) / data.items.length).toFixed(2) }}
  )
}
```

### Caching Results

```typescript
// Cache expensive operations
const cachedResults = new Map()

function getCachedData(key: string) {
  if (!cachedResults.has(key)) {
    cachedResults.set(key, expensiveCalculation(key))
  }
  return cachedResults.get(key)
}

function reportWithCache(key: string) {
  const data = getCachedData(key)

  return (
    # Cached Report

    **Result:** {{ data.value }}
    **Last Updated:** {{ data.timestamp }}
  )
}
```

## Common Patterns

### Dynamic URLs

```typescript
function linkGenerator(user: User, baseUrl: string) {
  return (
    # Hello {{ user.name }}!

    [View Profile]({{ baseUrl }}/users/{{ user.id }})
    [Settings]({{ baseUrl }}/settings?user={{ user.id }})

    {{ user.isAdmin ? (
      [Admin Panel]({{ baseUrl }}/admin)
    ) : null }}
  )
}
```

### Dynamic Styling

```typescript
function styledContent(user: User) {
  const bgColor = user.isActive ? '#e8f5e8' : '#ffebee'
  const textColor = user.isActive ? '#2e7d32' : '#c62828'

  return (
    <div style="background: {{ bgColor }}; color: {{ textColor }}; padding: 20px;">
      **Status:** {{ user.isActive ? 'Active' : 'Inactive' }}
      **Last Login:** {{ user.lastLogin }}
    </div>
  )
}
```

### Mathematical Operations

```typescript
function calculations(data: Data) {
  const percentage = (data.completed / data.total) * 100
  const remaining = data.total - data.completed
  const efficiency = data.completed / (data.total * 0.8) * 100

  return (
    # Progress Report

    **Completed:** {{ data.completed }} / {{ data.total }} ({{ percentage.toFixed(1) }}%)
    **Remaining:** {{ remaining }}
    **Efficiency:** {{ efficiency.toFixed(1) }}%

    {{ percentage > 90 ? '🎉 Excellent progress!' : percentage > 70 ? '👍 Good job!' : '💪 Keep going!' }}
  )
}
```

## Error Handling

### Safe Access

```typescript
function safeDataAccess(data: Data | null) {
  return (
    # Report

    {{ data?.title || 'Untitled' }}

    **Items:** {{ data?.items?.length || 0 }}

    {{ data?.items?.map(item => (
      - {{ item?.name || 'Unknown' }}: {{ item?.value || 0 }}
    )) || 'No items available' }}
  )
}
```

### Try-Catch Blocks

```typescript
function withErrorHandling(data: Data) {
  try {
    const result = riskyCalculation(data)

    return (
      # Result

      **Value:** {{ result }}
      **Status:** Success
    )
  } catch (error) {
    return (
      # Error

      **Status:** Failed to calculate
      **Error:** {{ error.message }}
    )
  }
}
```

## Next Steps

Now that you understand dynamic content, explore:

1. **[Conditional Rendering](conditional-rendering)** - Show/hide content based on conditions
2. **[Components](components)** - Create reusable components
3. **[Best Practices](best-practices)** - Optimize your TSM code

**Pro Tip**: Use dynamic content to make your markdown templates flexible and reusable. Start simple and add complexity as needed.
