import './Button.css';

export default function Button({ type, form, onClick, text, variant = 'blue' }) {
  // variant: white/ blue/ gray
  return (
    <button type={type} form={form} onClick={onClick} className={`custom-btn ${variant}`}>
      {text}
    </button>
  );
}