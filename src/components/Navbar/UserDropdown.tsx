import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import ProfileIcon from '@/assets/images/profile-icon.webp';
import Link from 'next/link';

interface UserDropdownProps {
    user: {
        email: string | null;
        name: string | null;
    };
    balances: {
        nugget: number;
        withdrawn: number;
        token: number;
    };
    onLogout: () => void;
    isLoading?: boolean;
}

const UserDropdown: React.FC<UserDropdownProps> = ({
    user,
    balances,
    onLogout,
    isLoading = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 200);
    };

    // Dummy data as requested
    const dummyName = "Shawn Mendes";
    const joinDate = "December 15, 2025";

    const formatBalance = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div
            className="relative z-50"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={dropdownRef}
        >
            {/* Trigger */}
            <div className="flex items-center gap-3 cursor-pointer py-2 px-4 rounded-full transition-colors">
                <div className="w-10 flex items-center justify-center">
                    <Image
                        src={ProfileIcon}
                        alt="Profile"
                        className="w-full h-full object-fit"
                    />
                </div>
                <span className="text-white font-medium text-base hidden md:block">
                    {user.name ?? dummyName}
                </span>
            </div>

            {/* Dropdown Content */}
            <div
                className={`absolute right-0 top-full mt-2 w-[340px] bg-[#1A1A1A] border border-primary/50 rounded-[20px] shadow-2xl overflow-hidden transition-all duration-300 transform origin-top-right ${isOpen ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'
                    }`}
            >
                <div className="p-6">
                    {/* Header Section */}
                    <div className="flex items-center text-center mb-8 gap-4">
                        <div className="w-20 h-20">
                            <div className="w-full h-full flex items-center justify-center">
                                <Image
                                    src={ProfileIcon}
                                    alt="Profile Large"
                                    className="w-full h-full object-fit"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col items-start">
                            <h3 className="text-xl font-bold text-[#E0E0E0] mb-1">{user.name ?? dummyName}</h3>
                            <p className="text-sm text-gray-400 mb-2 truncate w-full">{user.email}</p>
                        </div>

                    </div>

                    {/* Stats Section */}
                    <div className="space-y-4 mb-8">
                        <div className="flex items-center justify-between group">
                            <span className="text-sm font-bold text-gray-300 uppercase tracking-wider">BTCY NUGGET</span>
                            <span className={`text-2xl font-bold text-right ${isLoading ? 'opacity-50' : 'text-gray-100'}`}>
                                {isLoading ? '...' : formatBalance(balances.nugget)}
                            </span>
                        </div>

                        <div className="flex items-center justify-between group">
                            <span className="text-sm font-bold text-gray-300 uppercase tracking-wider">WITHDRAW</span>
                            <span className={`text-2xl font-bold text-right ${isLoading ? 'opacity-50' : 'text-gray-100'}`}>
                                {isLoading ? '...' : formatBalance(balances.withdrawn)}
                            </span>
                        </div>

                        <div className="flex items-center justify-between group">
                            <span className="text-sm font-bold text-gray-300 uppercase tracking-wider">BTCY TOKEN</span>
                            <span className={`text-2xl font-bold text-right ${isLoading ? 'opacity-50' : 'text-gray-100'}`}>
                                {isLoading ? '...' : formatBalance(balances.token)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer / Logout */}
                <div className="border-t border-gray-700/50 p-4 flex flex-col items-center justify-center gap-2">
                    <Link
                        href="/subscription"
                        className="w-full py-2 text-center text-gray-300 font-semibold hover:text-primary hover:cursor-pointer rounded-xl transition-all duration-200"
                    >
                        My Plan Detail
                    </Link>
                    <button
                        onClick={onLogout}
                        className="w-full py-2 text-center text-gray-300 font-semibold hover:text-primary hover:cursor-pointer rounded-xl transition-all duration-200"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDropdown;
