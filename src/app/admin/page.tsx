import React from "react";
import AdminBooksPanel from "@/view/admin/bookmanage";
import AdminUserManagement from "@/view/admin/usermanage";

export default function AdminPage() {
  return (
    <div className="pt-24">
      <AdminBooksPanel />
      <AdminUserManagement />
    </div>
  );
}
