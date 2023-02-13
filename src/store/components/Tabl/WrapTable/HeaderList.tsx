import React from "react";

const HeaderList: React.FC<{ title: string }> = (props) => {
  return <li>{props.title}</li>;
};

export default HeaderList;
