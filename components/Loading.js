import React from 'react';

const styles = {
  fontSize: '14px',
  position: 'absolute',
  left: '0',
  right: '0',
  marginTop: '20px',
  textAlign: 'center',
};
function Delayed({ wait = 2000 }) {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const timeout = window.setTimeout(() => {
      setShow(true);
    }, wait);
    return () => window.clearTimeout(timeout);
  }, [show]);
  return show === true ? props.children : null;
}

export default function Loading({ text = 'Loading', speed = 300 }) {
  const [content, setContent] = React.useState(text);

  React.useEffect(() => {
    const timer = window.setInterval(() => {
      setContent((content) => {
        return content === `${text}...` ? text : `${content}.`;
      });
    }, speed);

    return () => window.clearInterval(timer);
  }, [content]);

  return (
    //unable to get children to display when using Delayed
    //<Delayed>
    <p style={styles}>{content}</p>
    //</Delayed>
  );
}
