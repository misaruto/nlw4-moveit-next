import { signIn, signOut, useSession } from 'next-auth/client';
import { useRouter } from 'next/router';

export default function Page() {
  const [session, loading] = useSession();
  const router = useRouter();
  return (
    <>
      {!session && (
        <>
          Not signed in <br />
          <button onClick={() => signIn('github')}>Sign in</button>
        </>
      )}
      {session && router.push('home')}
    </>
  );
}
