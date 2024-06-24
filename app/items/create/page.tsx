'use client';

import { pageTitleStyles } from '@/app/styles';
import { createItemAction } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { env } from '@/env';
import { DatePickerDemo } from '@/components/date-picker';
import { useState } from 'react';

export default function CreatePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <main className="space-y-8">
      <h1 className={pageTitleStyles}>Post an item</h1>
      <form
        className="flex flex-col border p-8 rounded-xl space-y-4 max-w-lg"
        onSubmit={async (e) => {
          e.preventDefault();

          if (!date) return;

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
            endDate: date,
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
        <Input className="max-w-lg" name="file" type="file" />
        <DatePickerDemo date={date} setDate={setDate} />
        <Button className="self-end" type="submit">
          Post Item
        </Button>
      </form>
    </main>
  );
}
