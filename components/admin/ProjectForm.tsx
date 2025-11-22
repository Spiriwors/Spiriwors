'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { createProject, updateProject, uploadImage } from '@/lib/supabase/projects';
import { Project } from '@/types/project';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import imageCompression from 'browser-image-compression';

const projectSchema = z.object({
  title: z.string().min(1, 'Título es requerido'),
  description: z.string().min(1, 'Descripción es requerida'),
  video_url: z.string().url('URL de video inválida'),
  category: z.enum(['2d', 'stop']),
  year: z.number().optional(),
  is_featured: z.boolean(),
  featured_order: z.number().optional(),
  featured_description: z.string().optional(),
  display_order: z.number().optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface ProjectFormProps {
  project?: Project;
  mode: 'create' | 'edit';
}

export default function ProjectForm({ project, mode }: ProjectFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState<string[]>(project?.images || []);
  const [featuredPoster, setFeaturedPoster] = useState(project?.featured_poster || '');
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: project
      ? {
          title: project.title,
          description: project.description,
          video_url: project.video_url,
          category: project.category,
          year: project.year,
          is_featured: project.is_featured,
          featured_order: project.featured_order,
          featured_description: project.featured_description,
          display_order: project.display_order,
        }
      : {
          is_featured: false,
          category: '2d',
        },
  });

  const isFeatured = watch('is_featured');

  const convertToWebP = async (file: File): Promise<File> => {
    try {
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/webp' as const,
      };
      const compressedFile = await imageCompression(file, options);
      return compressedFile;
    } catch (error) {
      console.error('Error converting to WebP:', error);
      return file;
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const uploadedUrls: string[] = [];

      for (let i = 0; i < files.length; i++) {
        let file = files[i];

        // Convertir a WebP si no lo es
        if (!file.type.includes('webp')) {
          file = await convertToWebP(file);
        }

        // Generar nombre único
        const fileName = `${Date.now()}-${i}.webp`;
        const path = `projects/${fileName}`;

        // Subir a Supabase
        const url = await uploadImage(file, path);
        uploadedUrls.push(url);
      }

      setImages([...images, ...uploadedUrls]);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error al subir imágenes');
    } finally {
      setUploading(false);
    }
  };

  const handlePosterUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      let processedFile = file;

      // Convertir a WebP
      if (!file.type.includes('webp')) {
        processedFile = await convertToWebP(file);
      }

      const fileName = `poster-${Date.now()}.webp`;
      const path = `posters/${fileName}`;

      const url = await uploadImage(processedFile, path);
      setFeaturedPoster(url);
    } catch (error) {
      console.error('Error uploading poster:', error);
      alert('Error al subir poster');
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: ProjectFormData) => {
    setError('');
    setLoading(true);

    try {
      const projectData = {
        ...data,
        images,
        featured_poster: isFeatured ? featuredPoster : undefined,
      };

      if (mode === 'create') {
        await createProject(projectData);
      } else if (project) {
        await updateProject({ id: project.id, ...projectData });
      }

      router.push('/admin/projects');
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Error al guardar proyecto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="bg-gray-800 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold text-white mb-4">Información Básica</h2>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Título *
          </label>
          <Input
            {...register('title')}
            className="bg-gray-700 border-gray-600 text-white"
          />
          {errors.title && <p className="text-red-400 text-sm mt-1">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Descripción *
          </label>
          <Textarea
            {...register('description')}
            rows={3}
            className="bg-gray-700 border-gray-600 text-white"
          />
          {errors.description && <p className="text-red-400 text-sm mt-1">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            URL del Video *
          </label>
          <Input
            {...register('video_url')}
            placeholder="https://vimeo.com/..."
            className="bg-gray-700 border-gray-600 text-white"
          />
          {errors.video_url && <p className="text-red-400 text-sm mt-1">{errors.video_url.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Categoría *
            </label>
            <select
              {...register('category')}
              className="w-full bg-gray-700 border-gray-600 text-white rounded-md px-3 py-2"
            >
              <option value="2d">Animación 2D</option>
              <option value="stop">Stop Motion</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Año (opcional)
            </label>
            <Input
              type="number"
              {...register('year', { valueAsNumber: true })}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
        </div>
      </div>

      {/* Imágenes */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-white mb-4">Imágenes del Carrusel</h2>
        <p className="text-gray-400 text-sm mb-4">Se convertirán automáticamente a WebP</p>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageUpload}
          disabled={uploading}
          className="block w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#ffaf26] file:text-gray-900 hover:file:bg-[#ff9500] mb-4"
        />

        <div className="grid grid-cols-3 gap-4">
          {images.map((url, i) => (
            <div key={i} className="relative">
              <img src={url} alt={`Image ${i + 1}`} className="w-full h-32 object-cover rounded" />
              <button
                type="button"
                onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Destacado */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            {...register('is_featured')}
            className="w-4 h-4 text-[#ffaf26] bg-gray-700 border-gray-600 rounded"
          />
          <label className="ml-2 text-sm font-medium text-gray-300">
            ⭐ Mostrar en &quot;Trabajos Destacados&quot;
          </label>
        </div>

        {isFeatured && (
          <div className="space-y-4 pl-6 border-l-2 border-[#ffaf26]">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Orden (1, 2, 3...)
              </label>
              <Input
                type="number"
                {...register('featured_order', { valueAsNumber: true })}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Descripción Especial
              </label>
              <Textarea
                {...register('featured_description')}
                rows={2}
                className="bg-gray-700 border-gray-600 text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Poster Destacado (vertical 3:4.2)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePosterUpload}
                disabled={uploading}
                className="block w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#ffaf26] file:text-gray-900 hover:file:bg-[#ff9500]"
              />
              {featuredPoster && (
                <img src={featuredPoster} alt="Poster" className="mt-4 w-48 rounded" />
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <Button
          type="submit"
          disabled={loading || uploading}
          className="bg-[#ffaf26] hover:bg-[#ff9500] text-gray-900 font-semibold"
        >
          {loading ? 'Guardando...' : mode === 'create' ? 'Crear Proyecto' : 'Guardar Cambios'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          className="bg-transparent border-gray-600 text-white hover:bg-gray-700 hover:border-gray-500 hover:text-white"
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}
