import imageCompression from 'browser-image-compression';
import { supabase } from '@/integrations/supabase/client';

const SKIP_THRESHOLD = 200 * 1024; // 200 KB
const MAX_DIMENSION = 1600;
const QUALITY = 0.8;

export interface OptimizeResult {
  file: File;
  originalSize: number;
  optimizedSize: number;
  skipped: boolean;
}

export function formatSize(bytes: number): string {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  return `${(bytes / 1024).toFixed(0)} KB`;
}

async function pngHasAlpha(file: File): Promise<boolean> {
  try {
    const bitmap = await createImageBitmap(file);
    const canvas = document.createElement('canvas');
    // Sample at smaller size for speed; alpha is preserved in scaling
    const w = Math.min(bitmap.width, 400);
    const h = Math.round((bitmap.height / bitmap.width) * w);
    canvas.width = w; canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) return false;
    ctx.drawImage(bitmap, 0, 0, w, h);
    const { data } = ctx.getImageData(0, 0, w, h);
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] < 255) return true;
    }
    return false;
  } catch {
    return false;
  }
}

export async function optimizeImage(file: File): Promise<OptimizeResult> {
  const originalSize = file.size;

  if (originalSize < SKIP_THRESHOLD) {
    return { file, originalSize, optimizedSize: originalSize, skipped: true };
  }

  const isPng = file.type === 'image/png';
  const keepPng = isPng && (await pngHasAlpha(file));
  const fileType = keepPng ? 'image/png' : 'image/jpeg';

  const compressed = await imageCompression(file, {
    maxWidthOrHeight: MAX_DIMENSION,
    initialQuality: QUALITY,
    fileType,
    useWebWorker: true,
    maxSizeMB: 10,
  });

  // Ensure proper extension on the resulting File
  const ext = keepPng ? 'png' : 'jpg';
  const base = file.name.replace(/\.[^.]+$/, '');
  const renamed = new File([compressed], `${base}.${ext}`, { type: fileType });

  return { file: renamed, originalSize, optimizedSize: renamed.size, skipped: false };
}

export interface UploadResult {
  publicUrl: string;
  stats: OptimizeResult;
}

export async function uploadToPostImages(file: File, folder: string): Promise<UploadResult> {
  const stats = await optimizeImage(file);
  const ext = stats.file.name.split('.').pop() || 'jpg';
  const path = `${folder}/${crypto.randomUUID()}.${ext}`;
  const { error } = await supabase.storage.from('post-images').upload(path, stats.file, {
    contentType: stats.file.type,
    cacheControl: '3600',
  });
  if (error) throw error;
  const { data } = supabase.storage.from('post-images').getPublicUrl(path);
  return { publicUrl: data.publicUrl, stats };
}

export function statsLine(stats: OptimizeResult): string | null {
  if (stats.skipped) return null;
  return `Original: ${formatSize(stats.originalSize)} → Optimized: ${formatSize(stats.optimizedSize)}`;
}
