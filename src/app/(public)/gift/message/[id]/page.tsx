import { Title } from "@/components";
import Head from "next/head";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function GiftMessagePage({ params }: Props) {
  const { id } = await params;

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      {/* <Title title={`Message ID #${id.split("-").at(-1)}`} /> */}

      <div className="pbb-gift-message-page text-left w-full py-6 md:py-12 flex flex-col gap-16">
        <div className="container">
          <div className="bg-white shadow-2xl p-4 md:p-8 col-span-1 md:col-span-4 xl:col-span-9 flex flex-col  items-start justify-center rounded-sm">
            <h1 className="fond-heading text-text-primary text-2xl font-semibold">
              Gift Message
            </h1>
            <p className="font-heading text-text-primary">Dear John Doe</p>
            <p className="font-heading text-text-primary">
              This is a gift message from Purple Butterfly Bouquets. Thank you
              for your purchase!
            </p>
            <p className="fond-body text-text-secondary text-base">
              ID: #{id.split("-").at(-1)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
