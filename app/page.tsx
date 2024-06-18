import { bids as bidsSchema } from '@/db/schema';
import { database } from '@/db/database';
import { Button } from '@/components/ui/button';
import { revalidatePath } from 'next/cache';
import { Input } from '@/components/ui/input';

export default async function Home() {
  const bids = await database?.query.bids.findMany();

  return (
    <main className="container mx-auto py-12">
      <form
        action={async (formData: FormData) => {
          'use server';
          await database?.insert(bidsSchema).values({});
          revalidatePath('/');
        }}
      >
        <Input name="bid" placeholder="Bid" />
        <Button type="submit">Place bid</Button>
      </form>

      {bids?.map((bid) => (
        <div key={bid.id}>{bid.id}</div>
      ))}
    </main>
  );
}
