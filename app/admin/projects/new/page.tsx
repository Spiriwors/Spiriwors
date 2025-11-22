'use client';

import ProjectForm from '@/components/admin/ProjectForm';

// Configure Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Crear Nuevo Proyecto</h1>
      <ProjectForm mode="create" />
    </div>
  );
}
