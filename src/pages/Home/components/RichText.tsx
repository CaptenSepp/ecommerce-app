const RichText: React.FC<{ children: string }> = ({ children }) => {
  return (
    <div className="flex-column__grid">
      {/* NEW: Center section titles */}
      <h1 className="richtext-topic" style={{ textAlign: 'center' }}>{children}</h1>
    </div>
  );
};

export default RichText;
