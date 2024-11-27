import ThemeToggle from '@/features/darkmode/components/ThemeToggle';

export default function NavBar() {
  return (
    <nav className="flex w-screen items-center justify-center rounded-b-lg py-2">
      <div className="container flex h-10 justify-end">
        <ThemeToggle />
      </div>
    </nav>
  );
}
