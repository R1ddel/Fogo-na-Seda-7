import { notFound } from "next/navigation";
import { getDepartment } from "@/data/products";
import { CategoryView } from "./CategoryView";

export function generateStaticParams() {
  return [
    { slug: "tabacaria" },
    { slug: "eletronicos" },
    { slug: "perfumes" },
    { slug: "lazer" },
  ];
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const department = getDepartment(slug);
  if (!department) notFound();
  return <CategoryView department={department} />;
}
