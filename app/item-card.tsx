import { Button } from '@/components/ui/button';
import { Item } from '@/db/schema';
import Image from 'next/image';
import Link from 'next/link';
import { formatToDollar } from './util/currency';
import { format } from 'date-fns/format';
import { isBidOver } from './util/bids';

export function ItemCard({ item }: { item: Item }) {
  return (
    <div className="border p-8 rounded-xl space-y-2">
      <Image src={item.imageUrl} alt={item.name} width={200} height={200} />
      <h2 className="text-xl font-bold">{item.name}</h2>
      <p className="text-lg">
        starting price: ${formatToDollar(item.startingPrice)}
      </p>

      {isBidOver(item) ? (
        <p className="text-lg">Auction is over</p>
      ) : (
        <p className="text-lg">
          Ends on: {format(item.endDate, 'eeee M/dd/yy')}
        </p>
      )}

      <Button asChild variant={isBidOver(item) ? 'outline' : 'default'}>
        <Link href={`/items/${item.id}`}>
          {isBidOver(item) ? 'View Bid' : 'Place bid'}
        </Link>
      </Button>
    </div>
  );
}
