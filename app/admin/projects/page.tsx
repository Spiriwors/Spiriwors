'use client';

import { useEffect, useState } from 'react';
import { getProjects, deleteProject } from '@/lib/supabase/projects';
import { Project } from '@/types/project';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Configure Edge Runtime for Cloudflare Pages
export const runtime = 'edge';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    featured: 0,
    twoD: 0,
    stopMotion: 0,
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const data = await getProjects();
      setProjects(data);

      // Calcular estadísticas
      setStats({
        total: data.length,
        featured: data.filter(p => p.is_featured).length,
        twoD: data.filter(p => p.category === '2d').length,
        stopMotion: data.filter(p => p.category === 'stop').length,
      });
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`¿Eliminar proyecto "${title}"?`)) return;

    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (error) {
      alert('Error al eliminar proyecto');
      console.error(error);
    }
  };

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatCard title="Total Proyectos" value={stats.total} loading={loading} />
        <StatCard title="Destacados" value={stats.featured} loading={loading} />
        <StatCard title="Animación 2D" value={stats.twoD} loading={loading} />
        <StatCard title="Stop Motion" value={stats.stopMotion} loading={loading} />
      </div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Todos los Proyectos</h1>
          <p className="text-gray-400">Gestiona todos los proyectos de Spiriwors</p>
        </div>
        <Link href="/admin/projects/new">
          <Button className="bg-[#ffaf26] hover:bg-[#ff9500] text-gray-900 font-semibold">
            + Crear Proyecto
          </Button>
        </Link>
      </div>

      {loading ? (
        <div className="text-gray-400">Cargando proyectos...</div>
      ) : projects.length === 0 ? (
        <div className="bg-gray-800 rounded-lg p-8 text-center">
          <p className="text-gray-400 mb-4">No hay proyectos aún</p>
          <Link href="/admin/projects/new">
            <Button className="bg-[#ffaf26] hover:bg-[#ff9500] text-gray-900">
              Crear primer proyecto
            </Button>
          </Link>
        </div>
      ) : (
        <div className="bg-gray-800 rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Título
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Destacado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-700">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-white">{project.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-700 text-gray-300">
                      {project.category === '2d' ? 'Animación 2D' : 'Stop Motion'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {project.is_featured ? (
                      <span className="text-[#ffaf26]">⭐ Destacado</span>
                    ) : (
                      <span className="text-gray-500">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Link href={`/admin/projects/${project.id}/edit`}>
                      <Button variant="outline" size="sm" className="mr-2 bg-transparent border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500 hover:text-white">
                        Editar
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(project.id, project.title)}
                      className="bg-transparent border-red-600 text-red-400 hover:bg-red-900/30 hover:border-red-500 hover:text-red-300"
                    >
                      Eliminar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function StatCard({
  title,
  value,
  loading,
}: {
  title: string;
  value: number;
  loading: boolean;
}) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <p className="text-gray-400 text-sm mb-2">{title}</p>
      <p className="text-3xl font-bold text-white">
        {loading ? '...' : value}
      </p>
    </div>
  );
}
