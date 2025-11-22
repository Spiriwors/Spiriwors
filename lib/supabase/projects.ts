import { supabase } from './client';
import { Project, CreateProjectInput, UpdateProjectInput } from '@/types/project';
import { FALLBACK_PROJECTS } from '@/lib/fallback/projects';

// Helper: detectar si Supabase está configurado
const hasSupabase = () => {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
};

// Obtener todos los proyectos
export async function getProjects() {
  if (!hasSupabase()) {
    console.log('📦 Usando datos fallback (Supabase no configurado)');
    return FALLBACK_PROJECTS;
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data as Project[];
  } catch (error) {
    console.error('❌ Error con Supabase, usando fallback:', error);
    return FALLBACK_PROJECTS;
  }
}

// Obtener proyectos por categoría
export async function getProjectsByCategory(category: '2d' | 'stop' | 'all') {
  if (category === 'all') {
    return getProjects();
  }

  if (!hasSupabase()) {
    return FALLBACK_PROJECTS.filter(p => p.category === category);
  }

  try {
    const { data, error} = await supabase
      .from('projects')
      .select('*')
      .eq('category', category)
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data as Project[];
  } catch (error) {
    console.error('❌ Error con Supabase, usando fallback');
    return FALLBACK_PROJECTS.filter(p => p.category === category);
  }
}

// Obtener proyectos destacados
export async function getFeaturedProjects() {
  if (!hasSupabase()) {
    return FALLBACK_PROJECTS.filter(p => p.is_featured);
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('is_featured', true)
      .order('featured_order', { ascending: true });

    if (error) throw error;
    return data as Project[];
  } catch (error) {
    console.error('❌ Error con Supabase, usando fallback');
    return FALLBACK_PROJECTS.filter(p => p.is_featured);
  }
}

// Obtener un proyecto por ID
export async function getProjectById(id: string) {
  if (!hasSupabase()) {
    const project = FALLBACK_PROJECTS.find(p => p.id === id);
    if (!project) throw new Error('Proyecto no encontrado');
    return project;
  }

  try {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Project;
  } catch (error) {
    const project = FALLBACK_PROJECTS.find(p => p.id === id);
    if (!project) throw new Error('Proyecto no encontrado');
    return project;
  }
}

// Crear proyecto
export async function createProject(input: CreateProjectInput) {
  if (!hasSupabase()) {
    throw new Error('⚠️ Supabase no configurado. Configura las credenciales para crear proyectos.');
  }

  const { data, error } = await supabase
    .from('projects')
    .insert([input])
    .select()
    .single();

  if (error) throw error;
  return data as Project;
}

// Actualizar proyecto
export async function updateProject({ id, ...input }: UpdateProjectInput) {
  if (!hasSupabase()) {
    throw new Error('⚠️ Supabase no configurado. Configura las credenciales para editar proyectos.');
  }

  const { data, error } = await supabase
    .from('projects')
    .update(input)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Project;
}

// Eliminar proyecto
export async function deleteProject(id: string) {
  if (!hasSupabase()) {
    throw new Error('⚠️ Supabase no configurado. Configura las credenciales para eliminar proyectos.');
  }

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

// Subir imagen a Supabase Storage
export async function uploadImage(file: File, path: string) {
  if (!hasSupabase()) {
    throw new Error('⚠️ Supabase no configurado. Configura las credenciales para subir imágenes.');
  }

  const { data, error } = await supabase.storage
    .from('project-images')
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) throw error;

  // Obtener URL pública
  const { data: { publicUrl } } = supabase.storage
    .from('project-images')
    .getPublicUrl(data.path);

  return publicUrl;
}

// Eliminar imagen de Supabase Storage
export async function deleteImage(path: string) {
  if (!hasSupabase()) {
    return; // No hacer nada si no hay Supabase
  }

  const { error } = await supabase.storage
    .from('project-images')
    .remove([path]);

  if (error) throw error;
}
