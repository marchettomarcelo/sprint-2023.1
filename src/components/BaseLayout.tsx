import Head from "next/head";

function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#ffffff] to-[#ff7700] pb-20">
        <div className="container flex w-11/12 flex-col items-center justify-center gap-6 px-4 py-2  lg:w-3/5">
          {children}
        </div>
      </main>
      <footer className="mt-auto flex h-20 bg-orange-600 w-full items-center justify-center ">
        <p className="font-bold">
          © 2023 Legião Pluviarcana. All rights reserved.
        </p>
      </footer>
    </>
  );
}

export default BaseLayout;
