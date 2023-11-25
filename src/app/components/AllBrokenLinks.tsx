interface InputProps {
    brokenLinks: string[]
}

const AllBrokenLinks: React.FC<InputProps> = ({ brokenLinks }) => {
    return (
        <div>
      <h2>List of broken links</h2>
      <ul>
        {brokenLinks.map((str, index) => (
          <li className="underline italic" key={index}>{str}</li>
        ))}
      </ul>
    </div>
    );
}

export default AllBrokenLinks;