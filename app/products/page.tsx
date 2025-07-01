// app/products/page.tsx
import { Suspense } from "react";
import ClientProductList from "@/components/ClientProductList";

export default function Page() {
    return (
        <Suspense fallback={<div className="p-6">Loading products...</div>}>
            <ClientProductList />
        </Suspense>
    );
}
