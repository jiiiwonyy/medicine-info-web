import { useEffect, useState } from 'react';

/**
 * Displays a floating "↑ Top" button that appears after the page is scrolled down and scrolls the window to the top when clicked.
 *
 * The button becomes visible when the document is scrolled more than 200 pixels and is removed from the DOM otherwise.
 *
 * @returns The button element when visible, `null` when hidden.
 */
export default function TopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-10 right-10 bg-primary text-white px-4 py-2 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
    >
      ↑ Top
    </button>
  );
}