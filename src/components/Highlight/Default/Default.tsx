import { FC, useRef, useEffect } from 'react';

const DefaultHighlight: FC = (props) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ block: 'center' });
    }
  }, []);

  return (
    <span ref={ref} className="highlighted">
      {props.children}
    </span>
  );
};

export default DefaultHighlight;
