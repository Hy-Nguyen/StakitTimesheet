'use client';

import { useState, useEffect, useRef } from 'react';
import { getCategories } from '../../hooks/getCategoriesClient';
import { AnimatePresence, motion } from 'framer-motion';
import { useTimesheet } from '../../providers/TimesheetContext';
import { useCloseDropdown } from '@/lib/utils';
import ErrorMessage from './ErrorMessage';
export default function CategoryDropdown({ error }: { error: string[] | undefined }) {
  const { categories, setCategories, category, setCategory } = useTimesheet();
  const [isOpen, setIsOpen] = useState(false);

  const categoryRef = useRef<HTMLDivElement>(null);
  useCloseDropdown(categoryRef, () => setIsOpen(false));

  useEffect(() => {
    async function fetchCat() {
      try {
        let categories = await getCategories();
        setCategories(categories);
      } catch (error) {
        console.error(error);
      }
    }
    if (categories.length === 0) {
      fetchCat();
    }
  }, [setCategories, categories]);

  function handleTrigger(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsOpen(!isOpen);
  }

  return (
    <div className="relative" ref={categoryRef}>
      <div className="flex flex-col gap-4">
        <label htmlFor="category">Category:</label>
        <button
          id="category"
          onClick={handleTrigger}
          className="h-10 w-full justify-center rounded-md border border-border bg-secondary px-2 text-left text-base font-normal text-secondary-foreground focus:outline-none"
        >
          {category ? categories?.find((cat) => cat.category_id === category)?.name : 'Choose a Category'}
        </button>
        <ErrorMessage error={error} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-[5.5rem] z-10 flex w-full flex-col gap-2 overflow-hidden rounded-md border border-border bg-secondary py-2"
          >
            {categories?.map((category) => (
              <button
                className={`w-full bg-inherit py-1.5 transition-colors duration-500 hover:bg-white/10`}
                key={category.category_id}
                onClick={(e) => {
                  e.preventDefault();
                  setCategory(category.category_id);
                  setIsOpen(false);
                }}
              >
                {category.name}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
