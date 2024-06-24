'use client';

import { Button } from '@/components/ui/button';
import {
  NotificationCell,
  NotificationFeedPopover,
  NotificationIconButton,
} from '@knocklabs/react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

export function Header() {
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);

  const session = useSession();
  // Somehow can not retrieve user id
  const userId = session?.data?.user?.id;

  return (
    <div className="bg-gray-200 py-2">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-1 hover:underline">
            <Image src="/logo.png" width="50" height="50" alt="logo" />
            Bidding Bud
          </Link>

          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-1 hover:underline">
              All auctions
            </Link>

            {userId && (
              <>
                <Link
                  href="/items/create"
                  className="flex items-center gap-1 hover:underline"
                >
                  Create Auction
                </Link>

                <Link
                  href="/auctions"
                  className="flex items-center gap-1 hover:underline"
                >
                  My auctions
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <NotificationIconButton
            ref={notifButtonRef}
            onClick={(e) => setIsVisible(!isVisible)}
          />
          <NotificationFeedPopover
            buttonRef={notifButtonRef}
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
            renderItem={({ item, ...props }) => (
              <NotificationCell {...props} item={item}>
                <div className="rounded-xl">
                  <Link
                    className="text-blue-500 hover:text-blue-600"
                    onClick={() => setIsVisible(false)}
                    href={`/items/${item.data?.itemId}`}
                  >
                    Someone outbid you on{' '}
                    <span className="font-bold">{item.data?.itemName}</span>
                  </Link>
                </div>
              </NotificationCell>
            )}
          />

          {session?.data?.user.image && (
            <Image
              src={session?.data?.user.image}
              width={40}
              height={40}
              className="rounded-full"
              alt="user avatar"
            />
          )}

          <div>{session?.data?.user?.name}</div>

          <div>
            {userId ? (
              <Button
                onClick={() =>
                  signOut({
                    callbackUrl: '/',
                  })
                }
              >
                Sign Out
              </Button>
            ) : (
              <Button onClick={() => signIn()}>Sign In</Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
