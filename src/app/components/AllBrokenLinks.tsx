interface InputProps {
    brokenLinks: string[]
}

const AllBrokenLinks: React.FC<InputProps> = ({ brokenLinks }) => {
    return (
        <div>
      <h2>List of broken links</h2>
      <ul>
        <b>{brokenLinks.length == 0 ? "No broken links" : ""}</b>
        {brokenLinks.map((str, index) => (
          <li className="underline italic my-1" key={index}>{str}</li>
        ))}
      </ul>
    </div>
    );
}

export default AllBrokenLinks;