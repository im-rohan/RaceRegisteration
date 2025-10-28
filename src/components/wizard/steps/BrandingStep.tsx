import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';

export type BrandingData = {
  logo: File | null;
  hero_image: File | null;
  instagram_url: string;
  tiktok_url: string;
  x_url: string;
  meta_url: string;
};

interface BrandingStepProps {
  data: BrandingData;
  onChange: (data: Partial<BrandingData>) => void;
  errors: Record<string, string>;
}

export default function BrandingStep({ data, onChange, errors }: BrandingStepProps) {
  const handleFileUpload = (field: 'logo' | 'hero_image', file: File | null) => {
    onChange({ [field]: file });
  };

  return (
    <div className="grid gap-6">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label>Race Logo</Label>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <label htmlFor="logo">
                <Upload className="h-4 w-4 mr-2" />
                Upload Logo
              </label>
            </Button>
            <input
              id="logo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload('logo', e.target.files?.[0] || null)}
            />
            {data.logo && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{data.logo.name}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleFileUpload('logo', null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Hero Image/Banner</Label>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" asChild>
              <label htmlFor="hero_image">
                <Upload className="h-4 w-4 mr-2" />
                Upload Hero Image
              </label>
            </Button>
            <input
              id="hero_image"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileUpload('hero_image', e.target.files?.[0] || null)}
            />
            {data.hero_image && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">{data.hero_image.name}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleFileUpload('hero_image', null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <Label>Social Media Links</Label>
        
        <div className="grid gap-3">
          <div className="grid gap-2">
            <Label htmlFor="instagram_url">Instagram</Label>
            <Input
              id="instagram_url"
              value={data.instagram_url}
              onChange={(e) => onChange({ instagram_url: e.target.value })}
              placeholder="https://instagram.com/yourrace"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="tiktok_url">TikTok</Label>
            <Input
              id="tiktok_url"
              value={data.tiktok_url}
              onChange={(e) => onChange({ tiktok_url: e.target.value })}
              placeholder="https://tiktok.com/@yourrace"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="x_url">X (Twitter)</Label>
            <Input
              id="x_url"
              value={data.x_url}
              onChange={(e) => onChange({ x_url: e.target.value })}
              placeholder="https://x.com/yourrace"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="meta_url">Meta (Facebook)</Label>
            <Input
              id="meta_url"
              value={data.meta_url}
              onChange={(e) => onChange({ meta_url: e.target.value })}
              placeholder="https://facebook.com/yourrace"
            />
          </div>
        </div>
      </div>
    </div>
  );
}