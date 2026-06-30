import { notFound } from "next/navigation";
import { mapToInvitationData } from "@/lib/mapInvitation";
import { buildSampleInvitation } from "@/lib/sampleInvitation";
import { TEMPLATE_REGISTRY } from "@/templates/registry";
import { AddToCalendar } from "@/components/AddToCalendar";

interface PreviewPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Full-page template PREVIEW. Renders the chosen template (`/preview/<slug>`)
 * with self-contained sample data so anyone can see the complete invitation
 * design — no real wedding, no package, no login required.
 */
export default async function PreviewPage({ params }: PreviewPageProps) {
  const { slug } = await params;
  const TemplateComponent = TEMPLATE_REGISTRY[slug];

  if (!TemplateComponent) {
    notFound();
  }

  const data = mapToInvitationData(buildSampleInvitation(slug));

  return (
    <>
      <TemplateComponent data={data} />
      {data.calendar ? <AddToCalendar event={data.calendar} slug={data.slug} /> : null}
    </>
  );
}
