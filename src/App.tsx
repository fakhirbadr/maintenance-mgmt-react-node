import { Button } from "./components/ui/button";
import ChevronRight from "@/assets/icons/chevron-right.svg?react";

export default function App() {
  return (
    <main className="p-20">
      <Button>
        <span>click me</span>
        <ChevronRight />
      </Button>
    </main>
  );
}
