"use client";

import { useRouter } from "next/navigation";

export default  function Home() {
  const router = useRouter();

  return (
    <main>
      <div>
        <button
          onClick={() => {
            router.push("/singUp");
          }}
        >singUp</button>
      </div>
    </main>
  );
}
