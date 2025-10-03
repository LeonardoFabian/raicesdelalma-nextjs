import fs from "fs";
import path from "path";

interface NewOrderEmailOptions {
  userId: string;
  orderId: string;
  totalAmount: string;
  itemsInOrder: string;
  date: string;
}

export const getNewOrderEmailHtml = (data: NewOrderEmailOptions): string => {
  const filePath = path.join(
    process.cwd(),
    "src/lib/templates/emails/new-order.html"
  );
  let html = fs.readFileSync(filePath, "utf-8");

  // replace values

  html = html
    .replace("{{userId}}", data.userId)
    .replace("{{orderId}}", data.orderId)
    .replace("{{totalAmount}}", data.totalAmount)
    .replace("{{itemsInOrder}}", data.itemsInOrder)
    .replace("{{date}}", data.date);

  return html;
};
