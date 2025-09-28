import Link from "next/link";

export const LoginButton = () => {
  return (
    <Link
      href="/auth/login"
      className="flex items-center py-2 px-4 transition-all bg-gold-pastel text-primary font-body font-semibold rounded-lg"
    >
      Inicia sesión
    </Link>
  );
};
