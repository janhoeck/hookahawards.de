import { db } from '@/lib/db'
import { categorySchema, clipSchema, voteSchema } from '@/lib/db/schema'
import { MostVotedItem } from '@/lib/types'
import { count, gte, sql } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export const GET = async () => {
  const [categoriesCount, votesCount, clipsCount, votesPerDay, mostVotes] = await Promise.all([
    db.$count(categorySchema),
    db.$count(voteSchema),
    db.$count(clipSchema),
    db
      .select({ count: count(), createdAt: sql<string>`DATE(${voteSchema.createdAt})`.as('date') })
      .from(voteSchema)
      .where(gte(voteSchema.createdAt, sql`NOW() - INTERVAL '10 days'`))
      .groupBy(sql`DATE(${voteSchema.createdAt})`)
      .orderBy(sql`DATE(${voteSchema.createdAt})`),
    await db.execute<MostVotedItem>(sql`
    WITH vote_counts AS (
      SELECT
        category_id,
        reference_id,
        reference_type,
        COUNT(*)::int as vote_count,
        ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY COUNT(*) DESC) as rank
      FROM votes
      GROUP BY category_id, reference_id, reference_type
    ),
         top_items AS (
           SELECT * FROM vote_counts WHERE rank = 1
         )
    SELECT
      c.id as "categoryId",
      c.title as "categoryTitle",
      ti.reference_id as "itemId",
      CASE
        WHEN ti.reference_type = 'clip' THEN cl.title
        WHEN ti.reference_type = 'survey' THEN s.title
        END as "itemTitle",
      ti.vote_count::int as "voteCount"
    FROM categories c
           INNER JOIN top_items ti ON ti.category_id = c.id
           LEFT JOIN clips cl ON cl.id = ti.reference_id AND ti.reference_type = 'clip'
           LEFT JOIN surveys s ON s.id = ti.reference_id AND ti.reference_type = 'survey'
    ORDER BY c.position
  `),
  ])

  return NextResponse.json({
    mostVotes,
    categoriesCount,
    votesCount,
    clipsCount,
    votesPerDay,
  })
}
