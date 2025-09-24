---
title: Best Practices
description: Optimize your TS Markdown code for performance, maintainability, and readability
date: 2024-01-15
author: TS Markdown Team
tags: [best-practices, performance, optimization, maintainability]
---

Follow these best practices to write efficient, maintainable, and readable TS Markdown code.

## Performance

### Compile Once, Use Many Times

```typescript
// Good - compile once
const parser = new TSMParser()
const compiledTemplate = compileTSM(parser.parse(template.toString()))

function renderUsers(users: User[]) {
  return users.map(user => executeTSMTemplate(compiledTemplate, { user }))
}

// Avoid - compiling every time
function badRenderUsers(users: User[]) {
  return users.map(user => {
    const compiled = compileTSM(parser.parse(template.toString()))
    return executeTSMTemplate(compiled, { user })
  })
}
```

### Cache Expensive Operations

```typescript
const resultCache = new Map()

function getCachedResult(key: string, data: Data) {
  const cacheKey = `${key}-${JSON.stringify(data)}`

  if (!resultCache.has(cacheKey)) {
    resultCache.set(cacheKey, expensiveCalculation(data))
  }

  return resultCache.get(cacheKey)
}

function templateWithCache(data: Data) {
  const result = getCachedResult('template', data)

  return (
    # Result: {{ result }}
  )
}
```

### Use Efficient Data Structures

```typescript
// Good - pre-calculate values
function optimizedReport(data: Data) {
  const total = data.items.reduce((sum, item) => sum + item.value, 0)
  const average = total / data.items.length
  const topItems = data.items
    .sort((a, b) => b.value - a.value)
    .slice(0, 5)

  return (
    # Report

    **Total:** {{ total }}
    **Average:** {{ average.toFixed(2) }}
    **Top 5 Items:**
    {{ topItems.map(item => `- ${item.name}: ${item.value}`) }}
  )
}

// Avoid - calculating multiple times
function inefficientReport(data: Data) {
  return (
    # Report

    **Total:** {{ data.items.reduce((sum, item) => sum + item.value, 0) }}
    **Average:** {{ (data.items.reduce((sum, item) => sum + item.value, 0) / data.items.length).toFixed(2) }}
  )
}
```

## Readability

### Keep Functions Focused

```typescript
// Good - single responsibility
function userHeader(user: User) {
  return (
    # {{ user.name }}
    **Role:** {{ user.role }}
    **Status:** {{ user.isActive ? 'Active' : 'Inactive' }}
  )
}

function userDetails(user: User) {
  return (
    **Email:** {{ user.email }}
    **Joined:** {{ user.joinedAt }}
    **Last Login:** {{ user.lastLogin }}
  )
}

// Avoid - multiple responsibilities
function userProfile(user: User) {
  return (
    # {{ user.name }}
    **Role:** {{ user.role }}
    **Status:** {{ user.isActive ? 'Active' : 'Inactive' }}
    **Email:** {{ user.email }}
    **Joined:** {{ user.joinedAt }}
    **Last Login:** {{ user.lastLogin }}
    **Bio:** {{ user.bio }}
  )
}
```

### Use Descriptive Names

```typescript
// Good - clear purpose
function createUserWelcomeMessage(user: User) {
  return (
    # Welcome {{ user.name }}!
    Thanks for joining us.
  )
}

function generateInvoiceReport(invoice: Invoice) {
  return (
    # Invoice {{ invoice.id }}
    **Amount:** {{ invoice.amount }}
  )
}

// Avoid - unclear purpose
function render(data: any) {
  return (# Welcome {{ data.user }}!)
}

function process(obj: any) {
  return (# Invoice {{ obj.id }})
}
```

### Break Down Complex Logic

```typescript
// Good - modular approach
function createFullReport(user: User, sales: SalesData, metrics: Metrics) {
  return (
    {{ createHeader(user) }}

    {{ createSalesSection(sales) }}

    {{ createMetricsSection(metrics) }}

    {{ createFooter() }}
  )
}

// Avoid - one massive function
function createFullReport(user: User, sales: SalesData, metrics: Metrics) {
  return (
    # {{ user.name }}'s Report

    ## Sales
    **Total Sales:** {{ sales.total }}
    **Growth:** {{ sales.growth }}%

    ## Metrics
    **Users:** {{ metrics.users }}
    **Conversion:** {{ metrics.conversion }}%

    ## Details
    **Created:** {{ user.createdAt }}
    **Last Login:** {{ user.lastLogin }}

    ---
    Generated on {{ new Date().toISOString() }}
  )
}
```

## Maintainability

### Use TypeScript Interfaces

```typescript
interface User {
  id: string
  name: string
  email: string
  isActive: boolean
  preferences: {
    theme: 'light' | 'dark'
    notifications: boolean
  }
}

interface ReportData {
  title: string
  user: User
  metrics: Metrics
  charts: ChartData[]
}

function userReport(data: ReportData) {
  return (
    # {{ data.title }}

    **User:** {{ data.user.name }}
    **Theme:** {{ data.user.preferences.theme }}
  )
}
```

### Consistent Formatting

```typescript
// Good - consistent indentation and spacing
function wellFormatted(user: User) {
  return (
    # {{ user.name }}

    **Details:**
    - Email: {{ user.email }}
    - Status: {{ user.isActive ? 'Active' : 'Inactive' }}

    {{ user.isActive ? (
      Welcome back!
    ) : (
      Please activate your account.
    ) }}
  )
}

// Avoid - inconsistent formatting
function poorlyFormatted(user: User) {
  return (
    # {{user.name}}
    **Details:** - Email: {{user.email}} - Status: {{user.isActive?'Active':'Inactive'}}
    {{user.isActive?('Welcome back!'):('Please activate your account.')}}
  )
}
```

### Handle Edge Cases

```typescript
// Good - handles various scenarios
function robustTemplate(user: User | null, items: Item[] = []) {
  return (
    {{ user ? (
      # {{ user.name }}

      {{ items.length > 0 ? (
        ## Items ({{ items.length }})
        {{ items.map(item => `- ${item.name}`) }}
      ) : (
        ## No Items
        You don't have any items yet.
      ) }}
    ) : (
      # Guest View

      Please log in to view your content.
    ) }}
  )
}

// Avoid - doesn't handle edge cases
function fragileTemplate(user: User, items: Item[]) {
  return (
    # {{ user.name }}

    ## Items ({{ items.length }})
    {{ items.map(item => `- ${item.name}`) }}
  )
}
```

## Code Organization

### Group Related Functions

```typescript
// components.ts
export function Header({ title }: { title: string }) {
  return (<h1>{{ title }}</h1>)
}

export function Footer({ year }: { year: number }) {
  return (<p>© {{ year }} Company</p>)
}

// pages.ts
import { Header, Footer } from './components'

export function homePage(data: HomeData) {
  return (
    <@Header title={data.title} />

    # Welcome

    <@Footer year={new Date().getFullYear()} />
  )
}
```

### Use Template Factories

```typescript
function createTemplate(templateFn: any, defaultData: any = {}) {
  const parser = new TSMParser()
  const compiled = compileTSM(parser.parse(templateFn.toString()))

  return (data: any = {}) => {
    return executeTSMTemplate(compiled, { ...defaultData, ...data })
  }
}

// Usage
const welcomeTemplate = createTemplate(welcomeFunction, { siteName: 'MyApp' })

const result = welcomeTemplate({ user: { name: 'Alice' } })
```

### Separate Data and Presentation

```typescript
// data-layer.ts
export function getUserData(userId: string) {
  return fetchUser(userId)
}

export function processUserData(user: User) {
  return {
    ...user,
    displayName: user.name.toUpperCase(),
    isNew: Date.now() - new Date(user.createdAt).getTime() < 86400000,
    status: user.isActive ? 'Active' : 'Inactive'
  }
}

// presentation-layer.ts
export function userProfile(processedUser: ProcessedUser) {
  return (
    # {{ processedUser.displayName }}

    **Status:** {{ processedUser.status }}
    **Member since:** {{ processedUser.createdAt }}

    {{ processedUser.isNew && (
      🆕 Welcome new user!
    ) }}
  )
}

// Usage
const userData = await getUserData('user123')
const processed = processUserData(userData)
const profile = userProfile(processed)
```

## Error Handling

### Safe Data Access

```typescript
function safeTemplate(data: Data | null) {
  return (
    {{ data?.title || 'Untitled' }}

    **Items:** {{ data?.items?.length || 0 }}

    {{ data?.items?.map(item => (
      - {{ item?.name || 'Unknown' }}: {{ item?.value || 0 }}
    )) || 'No items available' }}
  )
}
```

### Error Boundaries

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

      Please try again later.
    )
  }
}
```

## Testing

### Unit Tests

```typescript
describe('User Profile Template', () => {
  it('renders active user correctly', () => {
    const user = {
      name: 'Alice',
      isActive: true,
      email: 'alice@example.com'
    }

    const result = userProfile(user)

    expect(result).toContain('Alice')
    expect(result).toContain('Active')
    expect(result).toContain('alice@example.com')
  })

  it('renders inactive user correctly', () => {
    const user = {
      name: 'Bob',
      isActive: false,
      email: 'bob@example.com'
    }

    const result = userProfile(user)

    expect(result).toContain('Bob')
    expect(result).toContain('Inactive')
  })
})
```

### Integration Tests

```typescript
describe('Full Page Template', () => {
  it('combines all components correctly', () => {
    const pageData = {
      user: { name: 'Alice', isActive: true },
      metrics: { users: 100, revenue: 10000 },
      content: 'Main content here'
    }

    const result = fullPageTemplate(pageData)

    expect(result).toContain('Alice')
    expect(result).toContain('100')
    expect(result).toContain('Main content here')
  })
})
```

## Performance Monitoring

### Benchmarking

```typescript
function benchmarkTemplate(templateFn: any, data: any, iterations: number = 1000) {
  const start = performance.now()

  for (let i = 0; i < iterations; i++) {
    executeTSMTemplate(templateFn, data)
  }

  const end = performance.now()
  const avgTime = (end - start) / iterations

  console.log(`Average execution time: ${avgTime.toFixed(2)}ms`)
}

// Usage
const compiled = compileTSM(parser.parse(myTemplate.toString()))
benchmarkTemplate(compiled, testData)
```

### Memory Usage

```typescript
function monitorMemory() {
  const initialMemory = process.memoryUsage()

  // Run your template
  const result = executeTSMTemplate(compiledTemplate, largeData)

  const finalMemory = process.memoryUsage()
  const memoryUsed = finalMemory.heapUsed - initialMemory.heapUsed

  console.log(`Memory used: ${memoryUsed} bytes`)
}
```

## Common Anti-Patterns

### Over-Engineering

```typescript
// Avoid - overly complex for simple needs
function overEngineered(user: User) {
  const template = createComplexTemplate()
  const processed = transformData(user)
  const result = executeTemplate(template, processed)

  return optimizeOutput(result)
}

// Better - keep it simple
function simple(user: User) {
  return (
    # {{ user.name }}

    **Email:** {{ user.email }}
  )
}
```

### Tight Coupling

```typescript
// Avoid - tightly coupled to specific data structure
function tightlyCoupled(user: User) {
  return (
    # {{ user.name }}

    **Department:** {{ user.company.department }}
    **Manager:** {{ user.company.manager.name }}
  )
}

// Better - use interfaces and safe access
function looselyCoupled(user: User) {
  return (
    # {{ user.name }}

    **Department:** {{ user.company?.department || 'N/A' }}
    **Manager:** {{ user.company?.manager?.name || 'N/A' }}
  )
}
```

### Hard to Debug

```typescript
// Avoid - hard to debug
function hardToDebug(data: Data) {
  return ({{data.items.filter(i=>i.value>10).map(i=>i.name).join(',')}})
}

// Better - break it down
function easyToDebug(data: Data) {
  const highValueItems = data.items.filter(i => i.value > 10)
  const itemNames = highValueItems.map(i => i.name)
  const result = itemNames.join(', ')

  return (
    {{ result }}
  )
}
```

## Summary

### Key Principles

1. **Performance**: Compile once, cache results, avoid redundant calculations
2. **Readability**: Use descriptive names, consistent formatting, focused functions
3. **Maintainability**: Type safety, error handling, modular design
4. **Testing**: Unit tests, integration tests, benchmarking

### Quick Checklist

- ✅ Templates compiled once and reused
- ✅ Data structures typed with interfaces
- ✅ Error cases handled gracefully
- ✅ Functions have single responsibility
- ✅ Code is readable and well-formatted
- ✅ Performance tested with real data
- ✅ Edge cases considered and tested

**Pro Tip**: Always prioritize readability and maintainability over clever optimizations. Simple, clear code is easier to debug and extend.
