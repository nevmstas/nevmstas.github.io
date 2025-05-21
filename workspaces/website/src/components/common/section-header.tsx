interface SectionHeaderProps {
  headerText: string;
  description: string;
  badge: React.JSX.Element;
}

const SectionHeader = ({
  headerText,
  description,
  badge,
}: SectionHeaderProps) => {
  return (
    <>
      {badge}
      <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 leading-tight">
        {headerText}
      </h2>
      <p className="text-gray-400 max-w-xl mb-12 hidden sm:block">{description}</p>
    </>
  );
};

export default SectionHeader;
