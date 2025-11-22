export type ProjectCategory = '2d' | 'stop';

export interface Project {
  id: string;
  title: string;
  description: string;
  video_url: string;
  category: ProjectCategory;
  year?: number;

  // Imágenes del carrusel
  images: string[];

  // Proyectos destacados
  is_featured: boolean;
  featured_order?: number;
  featured_poster?: string;
  featured_description?: string;

  // Metadata
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectInput {
  title: string;
  description: string;
  video_url: string;
  category: ProjectCategory;
  year?: number;
  images?: string[];
  is_featured?: boolean;
  featured_order?: number;
  featured_poster?: string;
  featured_description?: string;
  display_order?: number;
}

export interface UpdateProjectInput extends Partial<CreateProjectInput> {
  id: string;
}
