import { Button } from "@/components";
import Link from "next/link";

export const AddNewProductButton = () => {
  return (
    <Link href="/admin/product/new">
      <Button className="primary">Add New</Button>
    </Link>
  );
};
