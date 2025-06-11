import { useEffect, useState, useRef, type RefObject } from 'react';
import { useCopyToClipboard } from '@uidotdev/usehooks';

export const useAutoCopyOnSelect = <T extends HTMLElement>({ 
  containerRef,
  onCopy,
}: { 
  containerRef: RefObject<T | null>;
  onCopy?: () => void;
}) => {
  const [, copyToClipboard] = useCopyToClipboard();
  const [isSelecting, setIsSelecting] = useState(false);
  const lastSelectionRef = useRef<string>('');

  useEffect(() => {
    // Handler for when selection starts or changes
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      
      if (!selection || selection.isCollapsed) {
        // If selection is empty and we were selecting, it means selection ended
        if (isSelecting) {
          setIsSelecting(false);
        }
        return;
      }

      // Save current selection
      lastSelectionRef.current = selection.toString();
      
      // Mark that we are in selection mode
      setIsSelecting(true);
    };

    // Handler for when selection ends (mouseup or touchend)
    const handleSelectionEnd = () => {
      // Only process if we were selecting
      if (isSelecting) {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) return;

        if (containerRef.current && selection.anchorNode) {
          let node: Node | null = selection.anchorNode;
          let isWithinContainer = false;
          
          while (node) {
            if (node === containerRef.current) {
              isWithinContainer = true;
              break;
            }
            node = node.parentNode;
          }

          if (isWithinContainer) {
            const text = selection.toString();
            if (text) {
              copyToClipboard(text);
              onCopy?.();
            }
          }
        }
        
        setIsSelecting(false);
      }
    };

    // Mouse events for desktop
    document.addEventListener('selectionchange', handleSelectionChange);
    document.addEventListener('mouseup', handleSelectionEnd);
    
    // Touch events for mobile
    document.addEventListener('touchend', handleSelectionEnd);
    
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      document.removeEventListener('mouseup', handleSelectionEnd);
      document.removeEventListener('touchend', handleSelectionEnd);
    };
  }, [containerRef, copyToClipboard, onCopy, isSelecting]);
};
