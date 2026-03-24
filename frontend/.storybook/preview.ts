import type { Preview } from '@storybook/react-vite';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'muted', value: '#f8fafc' },
      ],
    },
  },
};

export default preview;
