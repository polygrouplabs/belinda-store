import { PageBreadcrumb } from "@/components/app/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Tienda',
}

export default function StoreLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <PageBreadcrumb />
            {children}
        </div>
    );
}