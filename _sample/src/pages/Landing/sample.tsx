import React from 'react';
// import 'gutensight';
import 'gutensight/react';

const MyPage: React.FC = () => {
  return (
    <>
      <gutensight-title>My Page Title</gutensight-title>
      <gutensight-description>This is a description of my page.</gutensight-description>
      <gutensight-keywords>keyword1, keyword2, keyword3</gutensight-keywords>
      <gutensight-body>
        <h1>Welcome to My Page</h1>
        <p>This is the content of my page.</p>
      </gutensight-body>
    </>
  );
};

export default MyPage;