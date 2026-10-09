import { AuthCard } from "@/features/auth/components/AuthCard";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cadastro — TrackNotes",
  description: "Crie sua conta para começar a organizar sua coleção musical.",
};

export default function RegisterPage() {
  return (
    <AuthCard
      title="Crie sua Conta"
      description="Cadastre-se gratuitamente para começar a catalogar suas músicas e playlists."
    >
      <RegisterForm />
    </AuthCard>
  );
}
