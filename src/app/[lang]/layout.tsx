// File ini sekarang hanya bertugas sebagai wrapper untuk routing bahasa
export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "id" }];
}

export default function LangLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return <>{children}</>;
}
