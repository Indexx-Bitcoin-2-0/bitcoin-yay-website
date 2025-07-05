"use client";

import { useState } from "react";
import Link from "next/link";

export default function Settings() {
  const [isNotificationOn, setIsNotificationOn] = useState(true);
  return (
    <div className="mx-auto mt-60 px-4 md:px-20 xl:px-40">
      <div className="max-w-6xl mx-auto">
        <div>
          <h1 className="text-3xl md:text-7xl text-center md:text-left font-semibold">
            Settings & Legal
          </h1>
        </div>
        <div className="mt-20 mb-40">
          <div className="flex w-full justify-between items-center">
            <h2 className="text-2xl md:text-[40px] font-medium">
              Notifications
            </h2>

            <div className="flex items-center justify-center space-x-8">
              {/* On Option */}
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => setIsNotificationOn(true)}
              >
                <div
                  className={`w-10 h-10 rounded-br-4xl rounded-tl-4xl rounded-tr-xl rounded-bl-xl border-3 ${
                    isNotificationOn
                      ? "bg-primary border-primary"
                      : "bg-transparent border-tertiary"
                  }`}
                />
                <p
                  className={`text-xl ${
                    isNotificationOn ? "font-medium" : "font-light"
                  }`}
                >
                  On
                </p>
              </div>

              {/* Off Option */}
              <div
                className="flex items-center space-x-3 cursor-pointer"
                onClick={() => setIsNotificationOn(false)}
              >
                <div
                  className={`w-10 h-10 rounded-br-4xl rounded-tl-4xl rounded-tr-xl rounded-bl-xl border-3 ${
                    !isNotificationOn
                      ? "bg-primary border-primary"
                      : "bg-transparent border-tertiary"
                  }`}
                />
                <p
                  className={`text-xl ${
                    !isNotificationOn ? "font-medium" : "font-light"
                  }`}
                >
                  Off
                </p>
              </div>
            </div>
          </div>
          <div className="mt-20">
            <h2 className="text-2xl md:text-[40px] font-medium">
              Legal Documents
            </h2>
            <div className="mt-10 text-xl font-light flex flex-col space-y-4">
              <Link href="#" className="hover:text-primary">
                DAO Terms
              </Link>
              <Link href="#" className="hover:text-primary">
                End User License Agreement (EULA)
              </Link>
              <Link href="#" className="hover:text-primary">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
