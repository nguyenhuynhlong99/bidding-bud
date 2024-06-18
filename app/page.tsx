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
    <main className="container mx-auto py-12">
      {session ? <SignOut /> : <SignIn />}

      {session?.user?.name}

      <form
        action={async (formData: FormData) => {
          'use server';
          await database.insert(items).values({
            name: formData.get('name') as string,
            userId: session?.user?.id!,
          });
          revalidatePath('/');
        }}
      >
        <Input name="name" placeholder="Name your item" />
        <Button type="submit">Post Item</Button>
      </form>

      {allItems?.map((b) => (
        <div key={b.id}>{b.name}</div>
      ))}
    </main>
  );
}
