import './SectionHeader.css';

export default function SectionHeader({ title, subtitle }) {
  return (
    <header className="section-header">
      <div className="section-header-decoration">
        <span className="decoration-line"></span>
        <span className="decoration-symbol">◇</span>
        <span className="decoration-line"></span>
      </div>

      <h2 className="section-title">{title}</h2>

      {subtitle && (
        <p className="section-subtitle">{subtitle}</p>
      )}
    </header>
  );
}
