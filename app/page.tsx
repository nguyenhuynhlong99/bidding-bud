import { bids as bidsSchema, items } from '@/db/schema';
import { database } from '@/db/database';
import { Button } from '@/components/ui/button';
import { revalidatePath } from 'next/cache';
import { Input } from '@/components/ui/input';
import { SignIn } from '@/components/sign-in';
import { SignOut } from '@/components/sign-out';
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();
  const allItems = await database.query.items?.findMany();

  {
    session?.user?.name;
  }

  return (
    <main className="container mx-auto py-12 space-y-8">
      <h1 className="text-2xl font-bold">Items for sale</h1>

      <div className="grid grid-cols-4 gap-8">
        {allItems?.map((b) => (
          <div key={b.id} className="border p-8 rounded-xl">
            {b.name}
            starting price: ${b.startingPrice / 100}
          </div>
        ))}
      </div>
    </main>
  );
}
