// src/components/Navbar.tsx
import { Link } from "react-router";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { BookOpen, Menu } from "lucide-react";

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex gap-2 text-xl font-bold text-cyan-600">
          <BookOpen className="h-8 w-8 text-cyan-600" />
          My Library
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-primary">
            All Books
          </Link>
          <Link to="/borrow-summary" className="hover:text-primary">
            Borrow Summary
          </Link>
        </nav>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-6">
                <Link to="/" className="hover:text-primary">
                  All Books
                </Link>
                <Link to="/borrow-summary" className="hover:text-primary">
                  Borrow Summary
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
