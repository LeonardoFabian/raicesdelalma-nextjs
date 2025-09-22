import { PageTitle } from "@/components";
import { auth } from "@/auth.config";
import { redirect } from "next/navigation";
import { ChangePhotoForm } from "@/app/admin/account/change-photo/ui/ChangePhotoForm";
import Head from "next/head";

export default async function ProfileAccountChangePhotoPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
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
    </>
  );
}
