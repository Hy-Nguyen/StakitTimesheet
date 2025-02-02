import { AnimatePresence, motion } from 'framer-motion';

export default function ErrorMessage({ error }: { error: string[] | undefined }) {
  return (
    <AnimatePresence>
      {error && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          key={error[0] ?? 'error' + Math.random()}
          className="overflow-hidden text-red-500"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
