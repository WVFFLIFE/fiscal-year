import { useEffect, useRef, memo } from 'react';
import useStateSelector from 'hooks/useStateSelector';
import Scroller from './Scroller';
import _toLower from 'lodash/toLower';

interface HighlightProps {
  text: string | null;
}

const Highlight: React.FC<HighlightProps> = ({ text }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const searchTerm = useStateSelector(
    (state) => state.generalPage.filters.searchTerm
  );

  let content: any = text;
  let index = text ? _toLower(text).indexOf(_toLower(searchTerm)) : -1;

  useEffect(() => {
    if (ref.current && searchTerm && index !== 1) {
      Scroller.scrollTo(ref.current);
    }

    return () => {
      Scroller.clear();
    };
  }, [index, searchTerm]);

  if (text && searchTerm && index !== -1) {
    let substr = text.substr(index, searchTerm.length);
    content = (
      <>
        {text.slice(0, index)}
        <span style={{ background: 'rgba(219, 118, 0, 0.3)' }}>{substr}</span>
        {text.slice(index + substr.length)}
      </>
    );
  }

  return <span ref={ref}>{content}</span>;
};

export default memo(Highlight);
