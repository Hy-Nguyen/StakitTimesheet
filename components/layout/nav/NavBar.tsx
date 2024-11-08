import ThemeToggle from '@/features/darkmode/components/ThemeToggle';

export default function NavBar() {
  return (
    <nav className="dark:border-accent-ts flex w-screen items-center justify-center rounded-b-lg border-b border-main-600 py-2">
      <div className="container flex h-10 justify-end">
        <ThemeToggle />
      </div>
    </nav>
  );
}
