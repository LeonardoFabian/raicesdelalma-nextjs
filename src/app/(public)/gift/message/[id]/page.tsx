import { getGiftMessageById } from "@/actions";
import { Title } from "@/components";
import Head from "next/head";
import { GiftMessage } from "../../../checkout/(checkout)/ui/GiftMessage";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function GiftMessagePage({ params }: Props) {
  const { id } = await params;

  const giftMessage = await getGiftMessageById(id);

  if (!giftMessage) return null;

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
            <p className="font-heading text-text-primary">
              Dear {giftMessage.recipient},
            </p>
            <p className="font-heading text-text-primary">
              {giftMessage.message}
            </p>
            <p className="font-heading text-text-primary">
              From: {giftMessage.sender}
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
