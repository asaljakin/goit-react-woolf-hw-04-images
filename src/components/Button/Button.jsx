export const Button = ({ onClick, children }) => (
  <button className="Button" onClick={onClick}>
    {children}
  </button>
);
