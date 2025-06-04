'use client';

import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import ArtImage1 from '@/assets/images/coming-soon/art-1.webp';

export default function ReferralPage() {
    const searchParams = useSearchParams();
    const [referralCode, setReferralCode] = useState('');
    useEffect(() => {
        // Try ?code=xyz format
        let code = searchParams.get('code');

        // Fallback to path format: /referral=xyz
        if (!code) {
            const raw = window.location.href;
            const match = raw.match(/referral=([^&]+)/);
            if (match?.[1]) code = match[1];
        }

        if (code) setReferralCode(code);
    }, [searchParams]);

    return (
        <div className="container mx-auto py-20 px-4 text-center">
            <h2 className="text-5xl md:text-6xl font-bold">You&#39;re Invited!</h2>


            <Image
                src={ArtImage1}
                alt="Coming Soon"
                className="mt-12 w-80 md:w-120 xl:w-200 mx-auto"
            />

            <div className="mt-12 max-w-md mx-auto">
                <input
                    type="text"
                    value={referralCode}
                    readOnly
                    onChange={(e) => setReferralCode(e.target.value)}
                    placeholder="Your Referral Code"
                    className="w-full px-4 py-3 border rounded-md shadow-sm text-lg"
                />
            </div>

            <p className="text-sm md:text-lg font-normal text-tertiary my-4">Use this code while signing up in the app</p>

            <div className="flex justify-center gap-6 mt-8 flex-wrap">
                <a
                    href="https://play.google.com/store/apps/details?id=com.bitcoin2"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[180px] h-[60px] relative"
                >
                    <Image
                        src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                        alt="Get it on Google Play"
                        fill
                        className="object-contain"
                    />

                </a>
                <a
                    href="https://apps.apple.com/us/app/bitcoin-yay/id6744868017"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[180px] h-[60px] relative"
                >
                    <Image
                        src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                        alt="Download on the App Store"
                        fill
                        className="object-contain"
                    />

                </a>
            </div>
        </div>
    );
}
