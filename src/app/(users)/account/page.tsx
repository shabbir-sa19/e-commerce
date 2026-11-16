"use client"
import { Button } from '@/components/ui/button';
type Props = {}

export default function AccountPage({ }: Props) {
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
    <section>
      <h1 className="">Update Profile</h1>
      <Button onClick={handler}>
        handle
      </Button>
    </section>
  )
}