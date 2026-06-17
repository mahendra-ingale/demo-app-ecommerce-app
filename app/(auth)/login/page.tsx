"use client";

import { useEffect, useMemo, useState } from "react";
import { getProviders, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [providers, setProviders] = useState<Record<string, any> | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    getProviders().then((data) => setProviders(data ?? null));
  }, []);

  useEffect(() => {
    const error = searchParams.get("error");
    if (error) {
      if (error === "CredentialsSignin") {
        setStatus("Invalid email or password. Use demo@example.com / password123.");
      } else {
        setStatus("Unable to sign in. Please try again.");
      }
    }
  }, [searchParams]);

  const oauthProviders = useMemo(
    () =>
      providers
        ? Object.values(providers).filter((provider) => provider.id !== "credentials")
        : [],
    [providers],
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus(null);

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/",
    });

    if (result?.error) {
      setStatus("Invalid email or password. Use demo@example.com / password123.");
      return;
    }

    router.push(result?.url ?? "/");
  };

  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-md items-center justify-center px-6 py-16">
      <section className="w-full rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm uppercase tracking-[0.35em] text-sky-600">Demo login</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Welcome back</h1>
        <p className="mt-3 text-slate-600">Sign in with credentials or your configured OAuth provider.</p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="mt-2 w-full rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
            />
          </div>

          {status ? <p className="text-sm text-red-600">{status}</p> : null}

          <button
            type="submit"
            className="w-full rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Sign in with email
          </button>
        </form>

        {oauthProviders.length > 0 ? (
          <div className="mt-8">
            <p className="text-sm font-medium uppercase tracking-[0.35em] text-slate-500">Or continue with</p>
            <div className="mt-4 grid gap-3">
              {oauthProviders.map((provider) => (
                <button
                  key={provider.id}
                  type="button"
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                  className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Continue with {provider.name}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-3xl bg-slate-50 p-4 text-sm text-slate-600">
            OAuth provider configuration is not detected. Add AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET to `.env.local`.
          </div>
        )}

        <div className="mt-8 rounded-3xl bg-slate-950 p-4 text-sm text-slate-200">
          <p className="font-medium">Demo credentials</p>
          <p className="mt-2">Email: demo@example.com</p>
          <p>Password: password123</p>
        </div>
      </section>
    </main>
  );
}
