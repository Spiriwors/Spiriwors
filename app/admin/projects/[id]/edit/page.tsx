'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getProjectById } from '@/lib/supabase/projects';
import { Project } from '@/types/project';
import ProjectForm from '@/components/admin/ProjectForm';

export default function EditProjectPage() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProject();
  }, [params.id]);

  const loadProject = async () => {
    try {
      const data = await getProjectById(params.id as string);
      setProject(data);
    } catch (error) {
      console.error('Error loading project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-gray-400">Cargando proyecto...</div>;
  }

  if (!project) {
    return <div className="text-red-400">Proyecto no encontrado</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-8">Editar Proyecto</h1>
      <ProjectForm project={project} mode="edit" />
    </div>
  );
}
