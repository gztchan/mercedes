const robot = window.require('robotjs');

export default function (snippet) {
  const { content } = snippet;
  robot.typeString(content);
}
