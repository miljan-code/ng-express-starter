import type {
  BuiltInProviderType,
  ProviderType,
  RedirectableProviderType,
} from '@auth/core/providers';

export type LiteralUnion<T extends U, U = string> =
  | T
  | (U & Record<never, never>);

export interface ClientSafeProvider {
  id: LiteralUnion<BuiltInProviderType>;
  name: string;
  type: ProviderType;
  signinUrl: string;
  callbackUrl: string;
}

export interface SignInOptions extends Record<string, unknown> {
  callbackUrl?: string;
  redirect?: boolean;
}

export interface SignInResponse {
  error: string | null;
  status: number;
  ok: boolean;
  url: string | null;
}

export type SignInAuthorizationParams =
  | string
  | string[][]
  | Record<string, string>
  | URLSearchParams;

export interface SignOutResponse {
  url: string;
}

export interface SignOutParams<R extends boolean = true> {
  callbackUrl?: string;
  redirect?: R;
}

export type Session = {
  user: {
    email?: string;
  };
  expires: string;
} | null;

export type { BuiltInProviderType, RedirectableProviderType, ProviderType };
