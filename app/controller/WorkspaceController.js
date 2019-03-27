module.exports = {
  channels: [
    {
      name: 'WorkspaceController:CreateWorkspace',
      handler: async function () {
        const emoji = await getEmoji(emojiName);
        return emoji;
      }
    },
    {
      name: 'WorkspaceController:UpdateWorkspace',
      handler: async function () {
        const emoji = await getEmoji(emojiName);
        return emoji;
      }
    },
    {
      name: 'WorkspaceController:RemoveWorkspace',
      handler: async function () {
        const emoji = await getEmoji(emojiName);
        return emoji;
      }
    },
  ]
}
