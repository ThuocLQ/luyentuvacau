import type { DocMeta } from '../types/content'
import backendFinance from '../../docs/backend-finance.md?raw'
import oracle from '../../docs/oracle.md?raw'
import csharp from '../../docs/csharp.md?raw'
import systemDesign from '../../docs/system-design.md?raw'
import distributed from '../../docs/distributed-systems.md?raw'

export const docs: Array<DocMeta & { content: string }> = [
  {
    slug: 'backend-finance',
    title: 'Backend Finance & Securities',
    description: 'Từ đặt lệnh đến settlement, EOD và reconciliation.',
    category: 'Backend',
    icon: 'Landmark',
    readingMinutes: 85,
    tags: ['Finance', '.NET', 'Oracle', 'Interview'],
    featured: true,
    content: backendFinance
  },
  {
    slug: 'oracle',
    title: 'Oracle & SQL Performance',
    description: 'Index, transaction, locking, query plan và PL/SQL production.',
    category: 'Database',
    icon: 'Database',
    readingMinutes: 28,
    tags: ['Oracle', 'SQL', 'Performance'],
    content: oracle
  },
  {
    slug: 'csharp',
    title: 'C# & .NET Backend Core',
    description: 'Async/await, DI, API design, resilience và clean code.',
    category: 'Backend',
    icon: 'Code2',
    readingMinutes: 32,
    tags: ['C#', '.NET', 'ASP.NET Core'],
    content: csharp
  },
  {
    slug: 'system-design',
    title: 'System Design',
    description: 'Cách phân tích yêu cầu, capacity, data flow và trade-off.',
    category: 'Architecture',
    icon: 'Network',
    readingMinutes: 25,
    tags: ['Architecture', 'Scalability', 'Interview'],
    content: systemDesign
  },
  {
    slug: 'distributed-systems',
    title: 'Distributed Systems',
    description: 'Kafka, RabbitMQ, idempotency, Outbox, Saga và consistency.',
    category: 'Distributed',
    icon: 'Boxes',
    readingMinutes: 30,
    tags: ['Kafka', 'Outbox', 'Saga'],
    content: distributed
  }
]

export const findDoc = (slug?: string) => docs.find(doc => doc.slug === slug)
