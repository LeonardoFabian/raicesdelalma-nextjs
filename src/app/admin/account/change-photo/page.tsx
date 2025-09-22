import { PageTitle } from "@/components";
import { ChangePhotoForm } from "./ui/ChangePhotoForm";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";

export default async function AdminChangePhotoPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <div className="pbb-admin-change-photo-page flex flex-col gap-4 w-full px-4 md:px-6">
      <PageTitle
        title="Upload New Picture"
        subtitle="Change your profile picture"
      />

      <div className="flex flex-col gap-4">
        <ChangePhotoForm
          userId={session.user.id}
          imageUrl={session.user.image ?? ""}
        />
      </div>
    </div>
  );
}
