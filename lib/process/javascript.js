const robot = window.require('robotjs');

export default function (snippet) {
  const { content } = snippet;
  content.split('\n').forEach((op, index) => {
    robot.typeString(op);
    if (index + 1 < content.split('\n').length) {
      robot.keyTap('enter')
    }
  });

}
