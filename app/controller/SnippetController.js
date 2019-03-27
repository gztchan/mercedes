module.exports = {
  channels: [
    {
      name: 'SnippetController:GetSnippets',
      handler: async function () {
        const emoji = await getEmoji(emojiName);
        return emoji;
      }
    },
    {
      name: 'SnippetController:CreateSnippet',
      handler: async function () {
        const emoji = await getEmoji(emojiName);
        return emoji;
      }
    },
    {
      name: 'SnippetController:UpdateSnippet',
      handler: async function () {
        const emoji = await getEmoji(emojiName);
        return emoji;
      }
    }
  ]
}
