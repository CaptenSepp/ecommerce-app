const RichText: React.FC<{ children: string }> = ({ children }) => {
  return (
    <div className="home-column__grid">
      <h1 className="richtext-topic">{children}</h1>
    </div>
  );
};

export default RichText;
