import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { StudentProfile } from '@/components/students/StudentProfile'
import { Container } from '@/components/ui/Container'
import { routes } from '@/config/routes'
import { getStudentBySlug, getStudentSlugs } from '@/lib/cms/getStudentBySlug'
import { getSiteContent } from '@/lib/cms/getSiteContent'
import { buildStudentMetadata } from '@/lib/seo/metadata'

type StudentPageProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await getStudentSlugs()

  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: StudentPageProps): Promise<Metadata> {
  const { slug } = await params
  const [student, { site }] = await Promise.all([getStudentBySlug(slug), getSiteContent()])

  if (!student) {
    return { title: site.name }
  }

  const pathname = `${routes.students}/${slug}`
  const description =
    student.jobTitle ?
      `${student.name} — ${student.jobTitle}. Ancien élève de ${site.name}, école de batterie à ${site.address.city}.`
    : `${student.name}, ancien élève de ${site.name}, formation batterie à ${site.address.city}.`

  return buildStudentMetadata(site, pathname, student.name, description)
}

export default async function StudentPage({ params }: StudentPageProps) {
  const { slug } = await params
  const student = await getStudentBySlug(slug)

  if (!student) {
    notFound()
  }

  return (
    <section className="bg-surface py-(--spacing-section-mobile) pt-28 md:py-(--spacing-section)">
      <Container>
        <StudentProfile student={student} />
      </Container>
    </section>
  )
}
