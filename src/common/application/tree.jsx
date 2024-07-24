import React, { useState, useEffect } from 'react';


const Tree = (props) => {
  const { data } = props;
  const [treeData, setTreeData] = useState(data);
  useEffect(() => {
    console.log('**test**', 'props.data', props.data);
    setTreeData(props.data);
  }, [props.data]);
  return (<div>{treeData.test}</div>)
}

export default Tree;
