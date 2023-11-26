interface InputProps {
    brokenLinks: string[]
}

const AllBrokenLinks: React.FC<InputProps> = ({ brokenLinks }) => {
    return (
        <div>
      <b>List of broken links</b>
      <ul>
        {brokenLinks.length == 0 ? "No broken links" : ""}
        {brokenLinks.map((str, index) => (
          <li className="underline italic my-1" key={index}>{str}</li>
        ))}
      </ul>
    </div>
    );
}

export default AllBrokenLinks;