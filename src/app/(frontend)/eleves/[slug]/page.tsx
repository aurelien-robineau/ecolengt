import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { StudentProfile } from '@/components/students/StudentProfile'
import { Container } from '@/components/ui/Container'
import { getStudentBySlug, getStudentSlugs } from '@/lib/cms/getStudentBySlug'
import { getSiteContent } from '@/lib/cms/getSiteContent'

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

  return {
    title: `${student.name} — ${site.name} · ${site.address.city}`,
    description:
      student.jobTitle ?
        `${student.name} — ${student.jobTitle}. Ancien élève de ${site.name}.`
      : `${student.name}, ancien élève de ${site.name} à ${site.address.city}.`,
  }
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
