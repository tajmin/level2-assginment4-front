import { BookOpen } from "lucide-react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-black mt-4">
      <div className="container mx-auto px-4 py-3 text-center text-sm text-muted-foreground">
        <div className="flex justify-center">
          <Link to="/" className="flex gap-2 text-xl font-bold text-cyan-600">
            <BookOpen className="h-8 w-8 text-cyan-600" />
            My Library
          </Link>
        </div>
        &copy; {new Date().getFullYear()} Personal Library App. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;
