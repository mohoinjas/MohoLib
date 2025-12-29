import BooksList from "@/components/BooksList";
import { Metadata } from "next";


export const metadata : Metadata = {
  title:"کتابخانه موهو - لیست کتاب‌ها",
};

export default function BooksPage() {
  return (
    <div className="pt-8">
      <BooksList />
    </div>
  );
}
