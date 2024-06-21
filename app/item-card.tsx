import { Button } from '@/components/ui/button';
import { Item } from '@/db/schema';
import Image from 'next/image';
import Link from 'next/link';
import { formatToDollar } from './util/currency';

export function ItemCard({ item }: { item: Item }) {
  return (
    <div className="border p-8 rounded-xl space-y-2">
      <Image src={item.imageUrl} alt={item.name} width={200} height={200} />
      <h2 className="text-xl font-bold">{item.name}</h2>
      <p className="text-lg">
        starting price: ${formatToDollar(item.startingPrice)}
      </p>

      <Button asChild>
        <Link href={`/items/${item.id}`}>Place bid</Link>
      </Button>
    </div>
  );
}
