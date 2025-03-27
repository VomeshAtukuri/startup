import { getProviders, signIn, getSession, getCsrfToken } from "next-auth/react";

type ProvidersType = Record<string, { id: string; name: string }>;

function signin({ providers }: { providers: ProvidersType }) {
  return (
    <div>
      {Object.values(providers).map((provider) => {
        return (
          <div key={provider.name}>
            <button onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default signin;


