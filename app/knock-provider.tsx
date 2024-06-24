'use client';

import { ReactNode } from 'react';
import { KnockProvider, KnockFeedProvider } from '@knocklabs/react';
import { env } from '@/env';
import { useSession } from 'next-auth/react';

// Required CSS import, unless you're overriding the styling

export function AppKnockProvider({ children }: { children: ReactNode }) {
  const session = useSession();

  return (
    <KnockProvider
      apiKey={env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY}
      userId={session?.data?.user?.id ?? ''}
    >
      <KnockFeedProvider feedId={env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID}>
        {children}
      </KnockFeedProvider>
    </KnockProvider>
  );
}
