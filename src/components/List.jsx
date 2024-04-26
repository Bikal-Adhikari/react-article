const List = ({ posts }) => {
  return (
    <ul id="postsList">
      {posts?.map((post) => {
        const { _id, title, content, author, date } = post; // Destructure post here
        return (
          <li key={_id}>
            <h2>{title}</h2>
            <p>{content}</p>
            <small>By: {author}</small>
            <small>{date}</small>
          </li>
        );
      })}
    </ul>
  );
};

export default List;
