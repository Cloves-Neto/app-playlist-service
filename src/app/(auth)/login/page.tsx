import { AuthCard } from "@/features/auth/components/AuthCard";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login — TrackNotes",
  description: "Acesse sua conta para gerenciar suas playlists e músicas favoritas.",
};

export default function LoginPage() {
  return (
    <AuthCard
      title="Acesse o TrackNotes"
      description="Entre com seu e-mail para acessar sua biblioteca de notas musicais."
    >
      <LoginForm />
    </AuthCard>
  );
}
