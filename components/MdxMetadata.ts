import { frontMatter as frontMatterList } from '../pages/blog/**/*.mdx'

type BaseFrontMatter = {
  layout: 'BlogPost'
  status: 'draft' | 'published'
  title: string
  excerpt: string
  date: string
  authors: string
  coverImage?: string
  tags?: string[]
}

type FileMetadata = {
  __resourcePath: string
  slug: string
  href: string
}

export type BlogPostFrontMatter = BaseFrontMatter & FileMetadata

function refine(data: unknown): Array<BlogPostFrontMatter> {
  // TODO: type check front matter
  return data as any
}

export function getBlogPostFrontMatterList(): BlogPostFrontMatter[] {
  return refine(frontMatterList)
    .filter(
      (data) => data.status === 'published' // hide unpublished posts from the feed
    )
    .sort((post1, post2) =>
      post1.date === post2.date
        ? post1.slug > post2.slug
          ? -1
          : 1
        : post1.date > post2.date
        ? -1
        : 1
    ) // sort by (date, slug) desc
}
