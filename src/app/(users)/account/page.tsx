"use client"

import { UserProfile } from '@clerk/nextjs';

export default function AccountPage() {
  const handler = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/account", {
        method: 'GET',
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
      }
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <section className="flex flex-col w-full items-center py-16 px-8">
      <div className="">
        <UserProfile />
      </div>
    </section>
  )
}