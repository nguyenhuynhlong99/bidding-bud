'use client';

import { createItemAction } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { env } from '@/env';

export default function CreatePage() {
  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-4xl font-bold">Post an item</h1>
      <form
        className="flex flex-col border p-8 rounded-xl space-y-4 max-w-lg"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget as HTMLFormElement;
          const formData = new FormData(form);
          const file = formData.get('file') as File;

          const uploadFormData = new FormData();
          uploadFormData.append('file', file);
          uploadFormData.append('upload_preset', env.NEXT_PUBLIC_UPLOAD_PRESET);

          const uploadResponse = await fetch(env.NEXT_PUBLIC_CLOUDINARY_URL, {
            method: 'POST',
            body: uploadFormData,
          });

          const uploadedData = await uploadResponse.json();
          const imageUrl = uploadedData.secure_url;

          const name = formData.get('name') as string;
          const startingPrice = parseInt(
            formData.get('startingPrice') as string
          );
          const startingPriceAsCents = Math.floor(startingPrice * 100);

          await createItemAction({
            name,
            startingPrice: startingPriceAsCents,
            imageUrl,
          });
        }}
      >
        <Input
          required
          className="max-w-lg"
          name="name"
          placeholder="Name your item"
        />
        <Input
          required
          className="max-w-lg"
          name="startingPrice"
          type="number"
          step="0.01"
          placeholder="What to start your auction at"
        />
        <Input
          className="max-w-lg"
          name="file"
          type="file"
          // placeholder="What to start your auction at"
        />
        <Button className="self-end" type="submit">
          Post Item
        </Button>
      </form>
    </main>
  );
}
